const fs = require('fs')
const data = fs.readFileSync('5_data.txt', 'utf8').split('\r\n')

function createCoord(xy_string) {
  const xy = xy_string.split(',')
  const xyArr = xy.map(n => Number(n))
  return {x: xyArr[0], y: xyArr[1]}
}

const vectors = data.map((datum, i) => {
  const coords = datum.split(' -> ')
  // console.log(coords)
  let begin = createCoord(coords[0])
  let end = createCoord(coords[1])
  let obj = {begin: begin, end: end}
  return obj
})

const mapSize = vectors.reduce((runningSize, vector) => {
  runningSize.min.x = Math.min(runningSize.min.x, vector.begin.x, vector.end.x)
  runningSize.min.y = Math.min(runningSize.min.y, vector.begin.y, vector.end.y)
  runningSize.max.x = Math.max(runningSize.max.x, vector.begin.x, vector.end.x)
  runningSize.max.y = Math.max(runningSize.max.y, vector.begin.y, vector.end.y)
  return runningSize
}, {min: {x: Infinity, y: Infinity}, max: {x: null, y: null}})

let map = []
let tempRow = []
tempRow.length = mapSize.max.x + 1
tempRow.fill(0)
for (let i = 0; i <= mapSize.max.y; i++)
  map.push([...tempRow])

for (const vector of vectors) {
  if (vector.begin.x == vector.end.x) {
    const x = vector.begin.x
    //TODO inc y along vertical y line
    const begin = Math.min(vector.begin.y, vector.end.y)
    const end = Math.max(vector.begin.y, vector.end.y)
    for (let y = begin; y <= end; y++){
      map[y][x]++
    }
  } else if (vector.begin.y == vector.end.y) {
    const y = vector.begin.y
    //TODO inc x along horizontal x line
    const begin = Math.min(vector.begin.x, vector.end.x)
    const end = Math.max(vector.begin.x, vector.end.x)
    for (let x = begin; x <= end; x++){
      map[y][x]++
    }
  } else {
    const xsign = Math.sign(vector.end.x - vector.begin.x)
    const ysign = Math.sign(vector.end.y - vector.begin.y)
    for (let x = vector.begin.x, y = vector.begin.y; ; x += xsign, y += ysign){
      map[y][x]++
      if (x == vector.end.x) break
    }
  }
}

function getCount(map) {
  let count = map.flat().reduce((accum, current) => {
    if (current > 1) return accum + 1
    return accum
  }, 0)
  return count
}

function printMap(map) {
  let mapString = ''
  for (const row of map) {
    let rowString = ''
    for (const n of row) {
      if (n > 0) rowString += String(n)
      else rowString += '.'
    }
    mapString += rowString + '\n'
  }
  console.log(mapString)
}

// printMap(map)
console.log(getCount(map))


//lesson learned: off by one errors when making map created a problem later when mutating map members
//each map dimension was 9x9 with test data when it should have been 10x10
//error message was:
// map[y][x]++
// ^
// TypeError: Cannot read properties of undefined (reading '787')
//error message manifested downstream from actual error which cost me some time
//test data failed with the vertical lines but not horizontal because horizontal test data didn't go up to the edge