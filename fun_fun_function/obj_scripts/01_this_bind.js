let dog = {
  sound: 'woof',
  talk: function() {
    console.log(this.sound);
  }
}

dog.talk(); // woof

let talkFcn = dog.talk;
talkFcn() // undef - this refers to where fcn called -- this is not bound to dog

let talkFcn2 = talkFcn.bind(dog);
talkFcn2() // woof

let talkFcn3 = dog.talk.bind(dog); // bind dog to 'this'
talkFcn3() // woof
