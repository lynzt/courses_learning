const lodash = require('lodash');
const compose = require('lodash/fp/compose'); // right to left (math)
const pipe = require('lodash/fp/pipe'); // left to right (coding)

const abs = x => Math.abs(x);
const sqrt = x => Math.sqrt(x);

const sqrtOfAbsCompose = compose(
  sqrt,
  abs
);

const sqrtOfAbsPipe = pipe(
  abs,
  sqrt
);

console.log (`sqrtOfAbs:`, sqrtOfAbsPipe(-4));



// function sqrtOfAbs(nbr) {
//   return Math.sqrt(Math.abs(nbr))
// }
// console.log (sqrtOfAbs(2));
