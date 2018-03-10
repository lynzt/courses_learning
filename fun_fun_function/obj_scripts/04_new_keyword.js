// function Person(saying) {
//   this.saying = saying;
// }
//
// Person.prototype.talk = function() {
//   console.log(`i say ${this.saying}`);
// }
//
// // new:
// // 1. creaets new object
// // 2. check what we call new on (person), set prototype of new object to be object
// // 3. call function (constructor) w/ this set to the new object just created
// // 4. return newly created object (edge case - return obj from constructor if contructor returns an obj)
// let harry = new Person('expelliarmus');
// harry.talk();





// create our own new function to show what new does...
function Person(saying) {
  this.saying = saying;
  // this would be returned vs obj created in spawn
  // return {
  //   randomObj: true
  // }
}

Person.prototype.talk = function() {
  console.log(`i say ${this.saying}`);
}

function spawn(constructor) {
  let obj = {}; // 1...
  Object.setPrototypeOf(obj, constructor.prototype); // set prototype
  // let argsArray = Array.prototype.slice(arguments) // < es6 (array.from added in es6)
  let argsArray = Array.from(arguments); // get args in array
  // # 3 call constructor w/ new obj
  return constructor.apply(obj, argsArray.slice(1)) || obj; // return the obj (ensure constructor doesn't return obj )
}

// new
let harry = spawn(Person, 'expelliarmus');
harry.talk();
