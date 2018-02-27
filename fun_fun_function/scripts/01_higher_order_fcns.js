let animals = [
  {name: 'fluffy', species: 'rabbit'},
  {name: 'emma', species: 'dog'},
  {name: 'hudson', species: 'dog'},
  {name: 'charlie', species: 'cat'},
  {name: 'kahlyn', species: 'dog'},
  {name: 'blueberry', species: 'rabbit'},
  {name: 'molly', species: 'duck'}
];

let isDog = animal => animal.species == 'dog';
let dogs = animals.filter(isDog);

// let dogs = animals.filter(function(animal) {
//   return animal.species == 'dog';
// })
console.dir (dogs);
