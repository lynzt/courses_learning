const food = {
  init: function (type) {
    this.type = type;
  },
  eat: function() {
    console.log(`you ate the ${this.type}`);
  }
}


const pizza = Object.create(food);
pizza.init('pizza');
pizza.eat();

const carrot = Object.create(food);
carrot.init('carrot');
carrot.eat();

// type checking
console.log ('pizza is food', food.isProtypeOf(waffle));
console.log ('int is food', food.isProtypeOf(123123));
console.log ('carrot is food', food.isProtypeOf(carrot));

// const pizza = Object.create(food);
// // remove init - causes pizza to not have eat... then after food.type set, eat will fall back to food for type
// pizza.eat();
// food.type = 'a;dfjks'
// pizza.eat();


// works as expected
// const pizza = Object.create(food);
// pizza.init('pizza');
// pizza.eat();
// food.type = 'a;dfjks'
// pizza.eat();
