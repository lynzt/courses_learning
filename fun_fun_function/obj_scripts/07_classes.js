// class == syntactic sugar => there is no class
// class Mammal {
//   constructor(sound) {
//     this._sound = sound;
//   }
//
//   talk() {
//     return this._sound;
//   }
// }
//
// class Dog extends Mammal {
//   constructor() {
//     super('woof...');
//   }
// }
//
// let fluffy = new Dog();
// let fluffyTalk = fluffy.talk();
// fluffyTalk









class Mammal {
  constructor(sound) {
    this._sound = sound;
  }

  talk() {
    return this._sound;
  }
}

class Dog extends Mammal {
  constructor() {
    super('woof...');
  }
}

let fluffy = new Dog();
// new function talk and bind this to what we pass in, and call using ();
let x = Dog.prototype.talk.bind({
  _sound: 'roar'
})();
x
