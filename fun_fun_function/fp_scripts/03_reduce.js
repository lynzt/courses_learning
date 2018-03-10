let orders = [
  { amount: 250 },
  { amount: 400 },
  { amount: 100 },
  { amount: 325 }
]


let total = orders.reduce((sum,  order) => sum += order.amount, 0)

// needs starting value and 1st arg is things we're reducing
// let total = orders.reduce(function(sum,  order) {
//   return sum += order.amount;
// }, 0)
