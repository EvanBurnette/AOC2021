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

function getBasinSize(root, graph) {
  let q = []
  q.push(root)
  let marked = graph.map(row => {
    return row.map(_ => 0)
  });
  // console.log(marked);
  function valid(point) {
    let qset = q.map(point => {
      return String(point);
    })
    if (
      point.x >= 0 &&
      point.y >= 0 &&
      point.x < graph[0].length &&
      point.y < graph.length) {
        if (graph[point.y][point.x] >= 9){
          return false;
        }
        else if (marked[point.y][point.x] >= 9){
          return false;
        }
        else if (qset.has(JSON.stringify(point))){
          return false;
        }
        else {
          return true;
        }
      }
    return false;
  }
  while (q.length > 0) {
    let v = q.shift();
    marked[v.y][v.x] = 1

    let neighbors = [
      {x: v.x - 1, y: v.y},
      {x: v.x + 1, y: v.y},
      {x: v.x, y: v.y - 1},
      {x: v.x, y: v.y + 1},
    ]

    for (let i = 0; i < 4; i++) {
      if (valid(neighbors[i])){
        q.push(neighbors[i])
      }
    }
    console.log(q)
  }
  return marked.flat().reduce((accum, current) => {
    return accum + current;
  }, 0)
}

const basinArr = lowPointCoords.map(start => {
  return getBasinSize(start, inputArr);
})

const topBasins = basinArr.sort((a, b) => b - a);
console.log(topBasins);
const answer = topBasins[0] * topBasins[1] * topBasins[2]
console.log(answer);

// 2199943210
// 3987894921
// 9856789892
// 8767896789
// 9899965678