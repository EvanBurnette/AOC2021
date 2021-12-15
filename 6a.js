const fs = require('fs');
const data = fs.readFileSync('6_data.txt', 'utf8');
let jellies = data.split(",");

const days = 80;

console.log(jellies.length)

for (let i = 0; i < days; i++) {
  let newData = [];
  for (let [i, jelly] of jellies.entries()) {
    if (jelly == 0) {
      jellies[i] = 6;
      newData.push(8)
    }
    else {
      jellies[i]--;
    }
  }
  jellies.push(...newData)
}

console.log(jellies.length)