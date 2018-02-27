let nn;
let learningRateSlider;
let trainingData = [
   {
     inputs: [0,1],
     targets: [1]
   },
   {
     inputs: [1,0],
     targets: [1]
   },
   {
     inputs: [1,1],
     targets: [0]
   },
   {
     inputs: [0,0],
     targets: [0]
   }
];

function setup() {
  createCanvas(400, 400);
  nn = NeuralNetwork(2,10,1);

  learningRateSlider = createSlider(.1, .5, .1, .01); //min range // max range // start val // increment
  // nn = NeuralNetwork(2,2,1);
  // let data = random(trainingData);
  // // nn.train(data.inputs, data.targets);
  // for (var i = 0; i < 100000; i++) {
  //   let data = random(trainingData);
  //   nn.train(data.inputs, data.targets);
  // }
  //
  // console.log (`checking...`);
  // console.log(nn.feedforward([1,0]));
  // console.log(nn.feedforward([0,1]));
  // console.log(nn.feedforward([0,0]));
  // console.log(nn.feedforward([1,1]));
  //
  // createCanvas(400,400);


  // for testing matrix math
  // let m1 = Matrix(2,2, true);
  // console.table(m1.data);
  // let m2 = Matrix(2,2, true);
  // console.table(m2.data);
  // let result = m1.subtract(m2);
  // console.table(result.data);
}
function draw() {
  background(0);

  for (let i = 0; i < 1000; i++) {
    let data = random(trainingData);
    nn.train(data.inputs, data.targets);
  }
  nn.setLearningRate(learningRateSlider.value());
  // console.log (`******************`);
  // console.log(`[1,0]: ${nn.feedforward([1,0])}`);
  // console.log(`[0,1]: ${nn.feedforward([0,1])}`);
  // console.log(`[0,0]: ${nn.feedforward([0,0])}`);
  // console.log(`[1,1]: ${nn.feedforward([1,1])}`);

  let res = 10;
  let cols = width / res;
  let rows = height / res;
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x1 = i / cols;
      let x2 = j / rows;
      let inputs = [x1, x2];

      let y = nn.query(inputs);

      fill (y * 255);
      noStroke();
      rect(i*res, j*res, res,res);
    }
  }
}
