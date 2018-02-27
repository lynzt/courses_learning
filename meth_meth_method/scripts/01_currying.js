const people = [
  { mother: { name: 'lilly'}, age: 20, name: 'harry'},
  { mother: { name: 'molly'}, age: 35, name: 'ron'},
  { mother: { name: 'monica'}, age: 18, name: 'hermione'},
  { mother: { name: 'aa'}, age: 105, name: '11'}
];

function combine(...fcns) {
  return value => fcns.reduce((prev, curr) => curr(prev), value);
}

function propExtractor(key) {
  return obj => obj[key];
}

function createSort(fcn) {
  return (a, b) => fcn(a) > fcn(b);
}

function stringLength(str) {
  return str.length;
}
// stringLength(str) => str.length;

const getAge = propExtractor('age');
const sortByAge = createSort(getAge);

const getName = propExtractor('name');
const sortByName = createSort(getName);

const getMother = propExtractor('mother');
const getMotherName = combine(getMother, getName, stringLength);

const sortByMotherName = createSort(getMotherName);

const sorted = people.sort(sortByAge);

console.log (people);
console.log (sorted);











// const people = [
//   { age: 20, name: 'harry'},
//   { age: 35, name: 'ron'},
//   { age: 18, name: 'hermione'},
//   { age: 105, name: '11'}
// ];
//
// function propExtractor(key) {
//   return obj => obj[key];
// }
//
// function createSort(treat) {
//   return function compareStrings(a, b) {
//     return treat(a) > treat(b);
//   }
// }
//
// const getAge = propExtractor('age');
// const sortByAge = createSort(getAge);
//
// // people.sort(sortByName);
// people.sort(sortByAge);
//
// console.log (people);




// function createSort(prop) {
//   return function compareStrings(s1, s2) {
//     return s1[prop] > s2[prop];
//   }
// }
//
// const sortByName = createSort('name');
// const sortByAge = createSort('age');
//
// // function compareStrings(s1, s2) {
// //   return s1.name > s2.name;
// // }
//
// // people.sort(sortByName);
// people.sort(sortByAge);
//
// console.log (people);
