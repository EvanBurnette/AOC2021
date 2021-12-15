const fs = require("fs");
data = fs.readFileSync("7_data.txt", "utf8");
const crabArr = data.split(",").map(n => Number(n)).sort((a,b) => a-b);
console.log(crabArr)
const mean = crabArr.reduce((accum, current) => {return accum + current;}, 0)/crabArr.length;
const median = (crabArr[Math.floor(crabArr.length/2)] + crabArr[Math.ceil(crabArr.length/2)])/2
console.log(median)
function getFuelCost (arr, pointB) {
  return arr.reduce((accum, pointA) => accum + Math.abs(pointA-pointB), 0);
}

// console.log(mean);
let guesses = [];

for (let i = median - 500; i < median + 500; i++){
  guesses.push(getFuelCost(crabArr, i))
}
console.log(median)
console.log(Math.min(...guesses))