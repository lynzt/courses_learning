// function talk(sound) {
//   console.log(this); // window obj (node => global obj)
// }
// talk(); // prints global obj (or window)



// function talk() {
//   console.log(this.sound);
// }
// let boromir = {
//   sound: 'one does not simply walk into mordor'
// }
// let speakBoromir = talk.bind(boromir); // explicit about meaning of this
// speakBoromir();


// let talk = function() {
//   console.log(this.sound);
// }
// let boromir = {
//   speak: talk, // ref to prop on obj
//   sound: 'one does not simply walk into mordor'
// }
// boromir.speak();




// let talk = function() {
//   console.log(this.sound);
// }
// let boromir = {
//   speak: talk, // ref to prop on obj
//   sound: 'one does not simply walk into mordor'
// }
// let blabber = boromir.speak;
// blabber(); // undef - lost this context




let talk = function() {
  console.log(this.sound);
}
let boromir = {
  blabber: talk, // ref to prop on obj
  sound: 'one does not simply walk into mordor'
}

let gollum = {
  jabber: boromir.blabber, // ref to prop on obj
  sound: 'my preciousssss...'
}
gollum.jabber(); // context aware
