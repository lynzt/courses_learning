const Dog = () => {
  const sound = 'wolf';
  return {
    talk: () => console.log (sound);
  }
}

const d = dog()
d.talk()

// this works
// $('button.myButton')
//   .click(d.talk)


// class Dog {
//   constructor() {
//     this.sound = 'woof';
//   }
//   talk() {
//     console.log (this.sound);
//   }
// }
// const d = new Dog();
// d.talk(); // output: woof
//
// // this doesn't work... this. => cause of the breaks...
// $('button.myButton')
//   .click(d.talk)
