const scalarSum = (state, n, i, j) => state.data[i][j] + n;
const elementSum = (state, n, i, j) => state.data[i][j] + n.data[i][j];
const scalarDifference = (state, n, i, j) => state.data[i][j] - n;
const elementDifference = (state, n, i, j) => state.data[i][j] - n.data[i][j];
const scalarProduct = (state, n, i, j) => state.data[i][j] * n;
const elementProduct = (state, n, i, j) => state.data[i][j] * n.data[i][j];
const matrixProduct = (state, n, i, j) => {
  let a = state.data;
  let b = n.data;
  let sum = 0;
  for (let k = 0; k < state.cols; k++) {
    sum += a[i][k] * b[k][j];
  }
  return sum;
}

const isNumeric = (n) => {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

const calcProduct = (state, n) => {
  if (state.data.cols === n.data.rows) {
    return calculate(state, n, matrixProduct);
  } else {
    return calculate(state, n, elementMult); // assume same size matrix
  }
}

const calculate = (state, n, fcn) => {
  let result = fcn.name === 'matrixProduct' ? Matrix(state.rows, n.cols, false) : Matrix(state.rows, state.cols, false);
  let maxCols = fcn.name === 'matrixProduct' ? n.cols : state.cols;
  for (var i = 0; i < state.rows; i++) {
    for (var j = 0; j < maxCols; j++) {
      result.data[i][j] = fcn(state, n, i, j);
    }
  }
  return result;
}

const canMap = (state) => ({
  map: (fcn) => {

    let result = Matrix(state.rows, state.cols, false);
    for (let i = 0; i < state.rows; i++) {
      for (let j = 0; j < state.cols; j++) {
        result.data[i][j] = fcn(state.data[i][j]);
      }
    }
    return result;
  }
});

const canCalculate = (state) => ({
    add: (n) => {
      let result = isNumeric(n) ? calculate(state, n, scalarSum) : calculate(state, n, elementSum);
      return result;
    },
    subtract: (n) => {
      let result = isNumeric(n) ? calculate(state, n, scalarDifference) : calculate(state, n, elementDifference);
      return result;
    },
    multiply: (n) => {
      let result = isNumeric(n) ? calculate(state, n, scalarProduct) : calcProduct(state, n);
      return result;
    }
});

const canManulipulateMatrix = (state) => ({
    transpose: (n) => {
      let result = Matrix(state.cols, state.rows, false);
      for (var i = 0; i < state.rows; i++) {
        for (var j = 0; j < state.cols; j++) {
          result.data[j][i] = state.data[i][j];
        }
      }
      return result;
    },
    toArray: () => {
      let arr = [];
      for (var i = 0; i < state.rows; i++) {
        for (var j = 0; j < state.cols; j++) {
          arr.push(state.data[i][j])
        }
      }
      return arr;
    }
});

const canPrint = (state) => ({
  print: () => {
    console.table(state.data);
  }
});

const Matrix = (rows, cols, random) => {
  let state = {
    rows,
    cols,
    data: createMatrix(rows, cols, random)
  }
  return Object.assign(state
    , canCalculate(state)
    , canManulipulateMatrix(state)
    , canPrint(state)
    , canMap(state)
  );
}

function createMatrix(rows, cols, random) {
  random = random ? random : false;
  let data = [];
  for (var i = 0; i < rows; i++) {
    data[i] = [];
    for (var j = 0; j < cols; j++) {
      if (random) {
        data[i][j] =  randomGaussian();
        // data[i][j] = Math.random() * 2 - 1;
        // data[i][j] = Math.floor(Math.random() * 10);
      } else {
        data[i][j] = 0;
      }
    }
  }
  return data;
}

function createMatrixFromArray(arr) {
  let m = Matrix(arr.length, 1, false);
  for (let i = 0; i < arr.length; i++) {
    m.data[i][0] = arr[i];
  }
  return m;

}
