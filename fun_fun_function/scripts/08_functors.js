const Promise = require('bluebird');

// promise functor shields transformation callback(map) from reality there is no dragon obj (yet)
const fetchWizards = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve( [{ name: 'McGonagall', health: 100 },
        { name: 'Sprout', health: 90}
    ]);
  }, 1000)

});

const wizards = [
  { name: 'Flitwick', health: 70},
  { name: 'McGonagall', health: 100},
  { name: 'Burbage', health: 2},
  { name: 'Moody', health: 50},
  { name: 'Sprout', health: 90}
];

let getNames = x => x.name;


// array functor shields transformation from reality of multiple dragons
const names = wizards.map(getNames);
console.log(names);

let names2 =
  fetchWizards
    .map(getNames)
    .then(name => console.log (name))


/* old explination */
let plus1 = val => val + 1;
let minus1 = val => val - 1;

console.log ([3,4].map(plus1));
console.log ([13,14].map(plus1));


let stringFunctor = (val, fn) => {
  let chars = val.split('');
  return chars
  .map(char => String.fromCharCode(fn(char.charCodeAt(0))))
  .join('');

}

// console.log (['a', 'b', 'c'].map(stringFunctor));

console.log(stringFunctor('abc', plus1));
console.log(stringFunctor('xyz', minus1));
