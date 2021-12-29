const _ = require("./lodash.min.js");
const fs = require("fs");

const inputArr = _.zip(
  ...fs.readFileSync("11_test_input.txt", "utf8")
    .replaceAll("\r", "")
    .split("\n")
    .map((line) =>
      line.split("")
        .map((n) => Number(n))
    ),
);

console.log(inputArr);

let flashes = 0;

function updateNeighbors(grid, xs, ys){
  const limX = grid.length;
  const limY = grid[0].length;
  for (let x = xs - 1; x <= xs + 1; x += 2) {
    for (let y = ys - 1; y <= ys + 1; y += 2) {
      if (x >= 0 && y >= 0 && y < limY && x < limX) {
        grid[x][y]++;
      }
    }
  }
  return grid
}

function update(grid) {
  let next = grid.map((col, xs) => {
    return col.map((n, ys) => {
      let np = n + 1;
      if (np > 9) {
        next = updateNeighbors(grid, xs, ys)
      }
      return np;
    });
  });
  next = next.map((col) => {
    return col.map((n) => {
      if (n > 9) {
        flashes++;
        return 0;
      } else return n;
    });
  });
  return next;
}

let grid = _.cloneDeep(inputArr)
for (let i = 0; i < 100; i++){
  grid = update(grid);
}

console.log(flashes)
