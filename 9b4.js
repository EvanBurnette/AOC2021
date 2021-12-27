const fs = require('fs')

function getRotatedArr(grid){
  let rotGrid = []
  for (let i = 0; i < grid[0].length; i++) {
    let col = [];
    grid.forEach(row => {
      col.push(row[i]);
    })
    rotGrid.push(col);
  }
  return rotGrid;
}

const inputArr =
  getRotatedArr(fs.readFileSync("9_test_input.txt", "utf8")
    .trim().replaceAll("\r", "").split("\n")
    .map(line => line.split('')
      .map(n => Number(n))));

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
});
const lowPointCoords = []
lowPoints.forEach((col, x) => {
  col.forEach((n, y) => {
    if (n > 0) {
      lowPointCoords.push([ x, y ]);
    }
  });
});
console.log(lowPointCoords);

function getBasinSize(root, graph) {
  let maxX = graph.length - 1;
  let maxY = graph[0].length - 1;

  function getNeighbors(p) {
    let neighborArr = [];
    const px = p[0];
    const py = p[1];
    for (let x = px - 1; x <= px + 1; x += 2) {
      if (x > 0 && x < maxX) {
        if (graph[x][py] != 9){
          neighborArr.push([x, py]);
        }
      }
    }
    for (let y = py - 1; y <= py + 1; y += 2) {
      if (y > 0 && y < maxY) {
        if (graph[px][y] != 9){
          neighborArr.push([px, y]);
        }
      }
    }
    return neighborArr;
  }
  let q = new Map();
  let explored = new Map();
  explored.set(String(root), root);

  q.set(String(root), root);
  // while Q is not empty do
  while (q.size > 0){
    //   v := Q.dequeue()
    let v = q.entries().next().value;
    q.delete(v[0]);

    let neighbors = getNeighbors(v[1]);
    
    //for all edges from v to w in G.adjacentEdges(v) do
    neighbors.forEach(neighbor => {
      if (!explored.has(String(neighbor))){
        q.set(String(neighbor), neighbor);
        explored.set(String(neighbor), neighbor);
      }
    })
    //  if w is not labeled as explored then
    //    label w as explored
    //    Q.enqueue(w)
  }

  return explored.size;
}

const basinArr = lowPointCoords.map(start => {
  return getBasinSize(start, inputArr);
});

console.log(basinArr);

const topBasins = basinArr.sort((a, b) => b - a);
console.log(topBasins);
const answer = topBasins[0] * topBasins[1] * topBasins[2]
console.log(answer);

// 2199943210
// 3987894921
// 9856789892
// 8767896789
// 9899965678