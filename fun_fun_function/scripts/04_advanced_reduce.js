const fs = require('fs');
// import fs from 'fs';

let output = fs.readFileSync('04_advanced_reduce.txt', 'utf8')
  .trim()
  .split('\n')
  .map(line => line.split('|'))
  .reduce((wizards, line) => {
    wizards[line[0]] = wizards[line[0]] || [];
    wizards[line[0]].push({
      name: line[1],
      price: line[2],
      quanity: line[3]
    });
    return wizards;
  }, {})

console.log (`output`, JSON.stringify(output, null, 2));


// {
//   'harry potter': [
//     { name: 'broomstick', price 200, quanity: 1},
//     { name: 'owl', price 50, quanity: 1},
//     { name: 'wand', price 50, quanity: 4},
//   ],
//   'ron weesley': [
//     { name: 'broomstick', price 50, quanity: 1},
//     { name: 'owl', price 80, quanity: 2},
//     { name: 'wand', price 30, quanity: 2},
//   ]
// }
