const fs = require('fs')
const inputArr =
  fs.readFileSync("9_test_input.txt", "utf8")
    .trim().replaceAll("\r", "").split("\n")
    .map(line => line.split('')
      .map(n => Number(n)));

const weightedArr = inputArr.map(line => line.map(n => n + 1));

const lowPoints = weightedArr.map((row, y, arr) => {
  return row.map((n, x) => {
    let neighborArr = []
    for (let xp = x - 1; xp <= x + 1; xp += 2) {
      if (xp < 0 || xp >= row.length) neighborArr.push(42);
      else neighborArr.push(arr[y][xp]);
    }
    for (let yp = y - 1; yp <= y + 1; yp += 2) {
      if (yp < 0 || yp >= arr.length) neighborArr.push(42);
      else neighborArr.push(arr[yp][x]);
    }
    neighborArr.forEach(neighbor => {
      if (neighbor <= n) {
        n &= 0;
      }
    })
    return n;
  })
})

const lowPointCoords = []
lowPoints.forEach((row, y) => {
  row.forEach((n, x) => {
    if (n > 0) {
      lowPointCoords.push(
        { x: x, y: y }
      )
    }
  })
})
console.log(lowPointCoords);
function getBasinSize(start, graph) { 
  let yMax = graph.length;
  let xMax = graph[0].length;
  let q = [];
  let visited = [];
  q.push(start);
  while (q.length > 0) {
    let v = q.shift();
    visited.push(v);
    let nearPoints = [
      { x: start.x - 1, y: start.y },
      { x: start.x + 1, y: start.y },
      { x: start.x, y: start.y - 1 },
      { x: start.x, y: start.y + 1 },
    ]

    nearPoints.forEach(p => {
      if (p.y < 0 || p.y >= yMax || p.x < 0 || p.x >= xMax) {}
      else if (graph[p.y][p.x] > 8) {}
      else if (visited.includes(p) || q.includes(p)) {}
      else {
        console.log(p);
        q.push(p);
      }
    })
  }
  return visited.length
}

const basinArr = lowPointCoords.map(start => {
  return getBasinSize(start, inputArr)
})

const topBasins = basinArr.sort((a, b) => b - a);
console.log(topBasins);
const answer = topBasins[0] * topBasins[1] * topBasins[2]
console.log(answer);