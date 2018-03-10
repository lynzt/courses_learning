// // static method on obj prototype creates a new obj w/ prototype set to certain obj
// // object.create more natural to prototype model than new
// const cat = {
//   makeSound: function() {
//     console.log (this.sound);
//   }
// }
//
// // Obj.create - create new obj and set prototype to cat
// const cat1 = Object.create(cat);
// cat1.sound = 'meowwwww';
// cat1.makeSound();
//
// const cat2 = Object.create(cat);
// cat2.sound = 'mmmmmeow';
// cat2.makeSound();






//
// const cat = {
//   makeSound: function() {
//     console.log (this.sound);
//   }
// }
//
// // function objectCreate(proto, props) { properities
// function objectCreate(proto) {
//   const obj = {};
//   Object.setPrototypeOf(obj, proto);
//   return obj;
// }
// // Obj.create - create new obj and set prototype to cat
// const cat1 = objectCreate(cat);
// cat1.sound = 'meowwwww';
// cat1.makeSound();
//
// const cat2 = objectCreate(cat);
// cat2.sound = 'mmmmmeow';
// cat2.makeSound();







// // constructor logic
// const cat = {
//   init: function(sound) {
//     this.sound = sound;
//   },
//   makeSound: function() {
//     console.log (this.sound);
//   }
// }
//
// // Obj.create - create new obj and set prototype to cat
// const cat1 = Object.create(cat);
// cat1.init('meowwwww');
// cat1.makeSound();
//
// const cat2 = Object.create(cat);
// cat2.init('mmmmmeow');
// cat2.makeSound();






const cat = {
  init: function(sound) {
    this.sound = sound;
    return this; // allows for chaining...
  },
  makeSound: function() {
    console.log (this.sound);
  }
}

// chain create and init
const cat1 = Object.create(cat).init('meowwwww');
cat1.makeSound();

const cat2 = Object.create(cat).init('mmmmmeow');
cat2.makeSound();
