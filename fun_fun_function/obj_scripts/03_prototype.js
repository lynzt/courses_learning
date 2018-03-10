
// // class - blueprint  - prototype - delegates (representitive)
// // if someone calls object w/ prop that doesn't exist, look at other object (yield)


// function talk(sound) {
//   console.log (`sound:`, this.sound);
// }
// // talk();  undefined
//
// let animal = {
//   // talk: talk // assigned as prop of obj
//   talk // es6 - if assign prop w/ same name as var - can omit...
// }
//
// animal.talk(); // js will assign this thing left of the dot (animal) when assign function as prop of obj





// function talk(sound) {
//   console.log (`sound:`, this.sound);
// }
// let animal = {
//   // talk: talk // assigned as prop of obj
//   talk, // es6 - if assign prop w/ same name as var - can omit...
//   sound: 'default'
// }
// let cat = {
//   sound: 'meow!',
//   color: 'blue'
// }
//
// Object.setPrototypeOf(cat, animal);
// cat.talk();




function talk(sound) {
  console.log (`sound:`, this.sound);
}
let animal = {
  talk,
  sound: 'default'
}
let cat = {
  sound: 'meow!',
  color: 'blue'
}

let dog = {
  sound: 'woof!',
  color: 'cream'
}

let prarieDog = {
  howl: function() {
    console.log (this.sound.toUpperCase());
  }
}

Object.setPrototypeOf(cat, animal);
Object.setPrototypeOf(dog, animal);
cat.talk();
dog.talk();
Object.setPrototypeOf(prarieDog, dog);
prarieDog.howl();
