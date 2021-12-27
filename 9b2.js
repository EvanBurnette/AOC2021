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
  let maxX = graph[0].length;
  let maxY = graph.length;
  let Q = [];
  Q.push(root)
  let explored = new Set(Q);
  let inBasin = new Set();
  console.log(Q);
  // while Q is not empty do
  while (Q.length > 0) {
    console.log(Q.length, Q);
    //   v := Q.dequeue()
    let v = Q.shift();
    explored.add(v);
    //   if v is the goal then
    if (v.x < 0 || v.y < 0 || v.x >= maxX || v.y >= maxY){
      //do nothing in our case
      //     return v in original algorithm
    }
    else if (graph[v.y][v.x] >= 9){}
    else {
      inBasin.add(v);
      //   for all edges from v to w in G.adjacentEdges(v) do
      let neighborArr = [
        {x: v.x - 1, y: v.y},
        {x: v.x + 1, y: v.y},
        {x: v.x, y: v.y - 1},
        {x: v.x, y: v.y + 1},
      ]
      for (let i = 0; i < neighborArr.length; i++) {
        const neighbor = neighborArr[i];
        if (explored.has(neighbor) || Q.includes(neighbor)) {
          //do nothing
        }
        else {
          Q.push(neighbor);
      //       Q.enqueue(w)
        }
      }
      //     if w is not labeled as explored then
      //       label w as explored
    }
  }
  return inBasin.size;
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