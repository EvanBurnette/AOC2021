const _ = require("./lodash.min.js");
const fs = require("fs");

const inputArr = _.zip(
  ...fs.readFileSync("11_input.txt", "utf8")
    .trim()
    .replaceAll("\r", "")
    .split("\n")
    .map((line) =>
      line.split("")
        .map((n) => Number(n))
    )
);

let flashes = 0;
let grid = _.cloneDeep(inputArr)

function updateNeighbors(xs, ys){
  const limX = grid.length;
  const limY = grid[0].length;
  for (let x = xs - 1; x <= xs + 1; x += 1) {
    for (let y = ys - 1; y <= ys + 1; y += 1) {
      if (x >= 0 && y >= 0 && y < limY && x < limX) {
        if (grid[x][y] === 0) {}
        else {
          grid[x][y]++;
          if (grid[x][y] >= 10){
            flashes++;
            grid[x][y] = 0;
            updateNeighbors(x, y);
          }
        }
      }
    }
  }
}

function update() {
  grid = grid.map(col => {
    return col.map(n => n + 1);
  })
  grid.forEach((col, x) => {
    col.forEach((n, y) => {
      if (n >= 10) {
        flashes++;
        grid[x][y] = 0;
        updateNeighbors(x, y);
      }
    })
  })
}

function printGrid(){
  console.log(_.zip(...grid).map(row => {
    return row.map(n => String(n)).join("");
  }).join("\n")
  )
}

for (let i = 0; i < 100; i++){
  update();
  // printGrid();
}
printGrid();
console.log(flashes)