const fs = require("fs");
data = fs.readFileSync("7_data.txt", "utf8");
const crabArr = data.split(",").map(n => Number(n)).sort((a,b) => a-b);
console.log(crabArr)
const mean = crabArr.reduce((accum, current) => {return accum + current;}, 0)/crabArr.length;
const median = (crabArr[Math.floor(crabArr.length/2)] + crabArr[Math.ceil(crabArr.length/2)])/2
console.log(median)

let costCache = [0]; //memoization for this triangle function
function getThisCost(a, b) {
  let dist = Math.abs(a-b);
  if (!costCache[dist]){
    for (let i = costCache.length; i <= dist; i++){
      costCache.push(i+costCache[i-1])
    }
  }
  return costCache[dist];
}

function getFuelCost (arr, pointB) {
  return arr.reduce((accum, pointA) => accum + getThisCost(pointA, pointB), 0);
}

// console.log(mean);
let guesses = [];

for (let i = median - 1000; i < median + 1000; i++){ //TODO implemenent a binary search here instead of this dumb way
  guesses.push(getFuelCost(crabArr, i))
}
console.log(median)
console.log(Math.min(...guesses)) 