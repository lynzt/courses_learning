// let countDownFrom = nbr => {
//   if (nbr == 0) return
//   console.log (nbr);
//   countDownFrom(nbr-1);
// }
// countDownFrom(10);


let categories = [
  { id: 'animals', parent: null },
  { id: 'mammals', parent: 'animals' },
  { id: 'cats', parent: 'mammals' },
  { id: 'dogs', parent: 'mammals' },
  { id: 'laborador', parent: 'dogs' },
  { id: 'golden', parent: 'dogs' },
  { id: 'persian', parent: 'cats' },
  { id: 'siamese', parent: 'cats' }
];

let makeTree = (categories, parent) => {
  let node = {};

  categories
    .filter(c => c.parent == parent)
    .forEach(c =>
      node[c.id] = makeTree(categories, c.id))

  return node
}

console.dir(makeTree(categories, null), {colors: true})


console.log (
  JSON.stringify(makeTree(categories, null), null, 2)
);
