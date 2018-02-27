const sigmoid = (x) => 1 / (1 + Math.exp(-x));
const dsigmoid = (x) => x * (1 - x); // derivitive sigmoid === (sigmoid(x) * (1 - sigmoid(x)))
const canSetLearningRate = (state) => ({
  setLearningRate: (learningRate) => {
    state.learningRate = learningRate;
  }
});

const canQuery = (state) => ({
  query: (inputsArr) => {
    let inputs = createMatrixFromArray(inputsArr);

    // generate hidden outputs
    let hidden1 = state.weights_ih.multiply(inputs);  // dot
    let hidden1Bias = hidden1.add(state.bias_h1);
    let hidden1NodesGuess = hidden1Bias.map(sigmoid);

    // generate output outputs
    let outputs = state.weights_ho.multiply(hidden1NodesGuess);
    let outputsBias = outputs.add(state.bias_o);
    let outputsNodesGuess = outputsBias.map(sigmoid);

    return outputsNodesGuess.toArray();
  }
});

const canTrain = (state) => ({
  train: (inputsArr, targetsArr) => {
    let inputs = createMatrixFromArray(inputsArr);
    let targets = createMatrixFromArray(targetsArr);

    // generate hidden outputs
    let hidden1 = state.weights_ih.multiply(inputs);  // dot
    let hidden1Bias = hidden1.add(state.bias_h1);
    let hidden1NodesGuess = hidden1Bias.map(sigmoid);

    // generate output outputs
    let outputs = state.weights_ho.multiply(hidden1NodesGuess);
    let outputsBias = outputs.add(state.bias_o);
    let outputsNodesGuess = outputsBias.map(sigmoid);


    // STARTING BACKPROP
    let outputsErrors = targets.subtract(outputsNodesGuess); // get error... (guess - actual)

    // hidden errors is output error multiplied by weights
    let weights_ho_T = state.weights_ho.transpose();
    let hiddenErrors = outputsErrors.multiply(weights_ho_T);

    // calc gradient from h1 to output
    let outputsDerivitive = outputsNodesGuess.map(dsigmoid);
    let outputsDerivitiveError = outputsDerivitive.multiply(outputsErrors);
    let outputsGradient = outputsDerivitiveError.multiply(state.learningRate);


    // calc gradient from h1 to inputs
    let hidden1Derivitive = hidden1NodesGuess.map(dsigmoid);
    let hiddenDerivitiveError = hidden1Derivitive.multiply(hiddenErrors);
    let hidden1Gradient = hiddenDerivitiveError.multiply(state.learningRate);

    // adjust weights from hidden to output
    let hidden1NodesGuess_T = hidden1NodesGuess.transpose();
    let deltaW_output = outputsGradient.multiply(hidden1NodesGuess_T);
    state.weights_ho = state.weights_ho.add(deltaW_output);


    // adjust weights from input to hidden layer
    let inputs_T = inputs.transpose();
    let deltaW_hidden = hidden1Gradient.multiply(inputs_T);
    state.weights_ih = state.weights_ih.add(deltaW_hidden);


    // adjust bias
    state.bias_o = state.bias_o.add(outputsGradient);
    state.bias_h1 = state.bias_h1.add(hidden1Gradient);

  }
})

const NeuralNetwork = (input, hidden, output) => {
  let state = {
    input,
    hidden,
    output,

    learningRate: 0.1,
    weights_ih: Matrix(hidden, input, true),
    weights_ho: Matrix(output, hidden, true),

    bias_h1: Matrix(hidden, 1, true),
    bias_o: Matrix(output, 1, true),

  }

  return Object.assign(state, canQuery(state), canTrain(state), canSetLearningRate(state));
}
