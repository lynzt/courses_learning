const lodash = require('lodash');

let wizards = [
  { name: 'Flitwick', element: 'Charms'},
  { name: 'McGonagall', element: 'Transfiguration'},
  { name: 'Burbage', element: 'Muggle Studies'},
  { name: 'Moody', element: 'Defence Against the Dark Arts'},
  { name: 'Sprout', element: 'Herbology'},
  { name: 'Trelawney', element: 'Divination'},
  { name: 'Lockhart', element: 'Defence Against the Dark Arts'},
  { name: 'Lupin', element: 'Defence Against the Dark Arts'}
]

// not curryied
// let hasElement = (element, obj) => obj.element === element;
// let dada = wizards.filter(x => hasElement('Defence Against the Dark Arts', x));


let hasElement = lodash.curry((element, obj) => obj.element === element);
let dada = wizards.filter(hasElement('Defence Against the Dark Arts')); // hasElement returns fcn that expects an element - which will be done by .filter 
console.log (dada);


let dragon =
  name =>
    size =>
      element =>
      name + ' is a ' +
      size + ' dragon that breathes ' +
      element + '!';

console.log(dragon('hp')('tiny')('fire'));

let hpDragon = dragon('hp');
let hpTinyDragon = hpDragon('tiny');
console.log (hpTinyDragon('fire'));





let dragonNoCurry = (name, size, element) =>
  name + ' is a ' +
  size + ' dragon that breathes ' +
  element + '!';

let dragon2 = lodash.curry(dragonNoCurry);

let hpDragon2 = dragon2('hp');
let hpTinyDragon2 = hpDragon2('tiny');
console.log (hpTinyDragon2('fire'));


// // non curry
// let dragon = (name, size, element) =>
//   name + ' is a ' +
//   size + ' dragon that breathes ' +
//   element + '!';
// console.log (dragon('hp', 'cat', 'fire'));
