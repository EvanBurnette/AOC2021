const fs = require('fs')
const inputArr =
fs.readFileSync("9_input.txt", "utf8")
  .trim().replaceAll("\r", "").split("\n")
  .map(line => line.split('')
  .map(n => Number(n)));

const riskMatrix = inputArr.map(row => row.map(n => n + 1))

const lowPoints = riskMatrix.map((row, y, arr) => {
  return row.map((n, x) => {
    let neighborArr = []
    for (let xp = x - 1; xp <= x + 1; xp += 2){
      if (xp < 0 || xp >= row.length) neighborArr.push(42);
      else neighborArr.push(arr[y][xp]);
    }
    //copy paste strikes again! was checking against row.length for yp instead of arr.length
    //This would be avoidable if I created named values for ylength and xlength
    for (let yp = y - 1; yp <= y + 1; yp += 2) {
      if (yp < 0 || yp >= arr.length) neighborArr.push(42);
      else neighborArr.push(arr[yp][x]);
    }
    neighborArr.forEach(neighbor => {
      // console.log(neighborArr)
      if (neighbor <= n) {
        //less than worked for the sample but not for the real data
        //another off by one error!
        //I originally had this correct but changed it when the program wasn't working while I was trying to track down the problem
        n &= 0;
      }
    })
    return n;
  })
})

// console.log(lowPoints.map(row => row.map(n => String(n)).join(' ')).join('\n'))

console.log(lowPoints.flat().reduce((accum, current) => accum + current))
// 2199943210
// 3987894921
// 9856789892
// 8767896789
// 9899965678