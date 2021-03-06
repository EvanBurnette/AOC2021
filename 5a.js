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

const filteredVectors = vectors.filter(vector => {
  return (vector.begin.x == vector.end.x) || (vector.begin.y == vector.end.y)
})

const mapSize = filteredVectors.reduce((runningSize, vector) => {
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

for (const vector of filteredVectors) {
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
    let begin = Math.min(vector.begin.x, vector.end.x)
    let end = Math.max(vector.begin.x, vector.end.x)
    for (let x = begin; x <= end; x++){
      map[y][x]++
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
console.log(getCount(map))


//lesson learned: off by one errors when making map created a problem later when mutating map members
//each map dimension was 9x9 with test data when it should have been 10x10
//test data failed with the vertical lines but not horizontal