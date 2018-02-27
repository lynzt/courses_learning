const sayHi = (greet, firstName, lastName) => {
  console.log (`${greet} ${firstName} ${lastName}`);
}

function makeGreeter(lang) {
  return (firstName, lastName) => {
    if (lang == 'en') sayHi('hi', firstName, lastName);
    if (lang == 'es') sayHi('hola', firstName, lastName);
    if (lang == 'ch') sayHi('ni hao', firstName, lastName);
    if (lang == 'vn') sayHi('chao', firstName, lastName);
  }

}

let greetEng = makeGreeter('en');
let greetSpa = makeGreeter('es');
let greetChi = makeGreeter('ch');
let greetVei = makeGreeter('vn');

console.dir (greetEng);

greetEng('harry', 'potter');
greetSpa('harry', 'potter');
greetChi('harry', 'potter');
greetVei('harry', 'potter');
