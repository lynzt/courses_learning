const fetch = require('node-fetch');
// const co = require('co');
//
// fetch('http://jsonplaceholder.typicode.com/posts/1')
//   .then(response => response.json())
//   .then(post => post.title)
//   .then(title => console.log (`title:`, title))
//   .then( x => console.log (x))
//
// co(function *() {
//   const uri = 'http://jsonplaceholder.typicode.com/posts/1'
//   const response = yield fetch(uri)
//   const post = yield response.json()
//   const title = post.title
//   console.log (`title:`, title)
// })




runMagic(function *() {
  const uri = 'http://jsonplaceholder.typicode.com/posts/1'
  const response = yield fetch(uri)
  const post = yield response.json()
  console.log (`post:`, post)
  const title = post.title
  console.log (`title:`, title)
})

function runMagic(generator) {
  const iterator = generator()

  function iterate(iteration) {
    if (iteration.done) return iteration.value;

    const promise = iteration.value;
    return promise.then( x => iterate(iterator.next(x)))
  }
  return iterate(iterator.next())
}
