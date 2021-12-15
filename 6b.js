const fs = require('fs');
const data = fs.readFileSync('6_data.txt', 'utf8');
const initialJellies = data.split(",");

let jellies = [];
jellies.length = 9;
jellies.fill(0);

initialJellies.forEach(jelly => {
  jellies[jelly]++;
})

const days = 256;
for (let i = 0; i < days; i++) {
  let zeroes = jellies.shift(); //take jellies off the front of the array
  jellies[6] += zeroes;         //move them to day 6 jelly bucket
  jellies.push(zeroes);         //push their offspring to day 8 jelly bucket
}

let total = jellies.reduce((accum, current) => {
  return accum + current;
}, 0);
// console.log(jellies);
console.log(total);
// console.log(26984457539);