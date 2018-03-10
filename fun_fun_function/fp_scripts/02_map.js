let animals = [
  {name: 'fluffy', species: 'rabbit'},
  {name: 'emma', species: 'dog'},
  {name: 'hudson', species: 'dog'},
  {name: 'charlie', species: 'cat'},
  {name: 'kahlyn', species: 'dog'},
  {name: 'blueberry', species: 'rabbit'},
  {name: 'molly', species: 'duck'}
];

let names = animals.map(x => x.name);

// let dogs = animals.map(function(animal) {
//   return animal.name;
// })
console.dir (names);
