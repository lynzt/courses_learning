const fs = require('fs');
const highland = require('highland');

highland(fs.createReadStream('09_streams.csv', 'utf8'))
  .split()
  .map(line => line.split(','))
  .map(parts => ({
    name: parts[0],
    nbrPurchases: parts[1]
  }))
  .filter(x => x.nbrPurchases > 2)
  .map(x => x.name)
  .each(x => console.log(`each: `, x))


// const stupidNumberStream = {
//   each: (callback) => {
//     setTimeout(() => callback(1), 1000)
//     setTimeout(() => callback(2), 2000)
//     setTimeout(() => callback(3), 3000)
//   }
// }
// stupidNumberStream.each(console.log);
