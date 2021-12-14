const fs = require('fs')

fs.readFile('./2_data.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  const lines = data.split('\n').map(line => {
    let value = line.split(' ').map((val, i) => {
      if (i == 1) return Number(val)
      return val
    })
    return value
  }).filter(line => line.length == 2)
  
  console.debug(lines)
  let depth = 0
  let travel = 0
  let aim = 0

  lines.forEach(line => {
    switch (line[0]){
      case 'forward':
        travel += line[1]
        depth += aim * line[1]
        break
      case 'back':
        travel -= line[1]
        depth -= aim * line[1]
        break
      case 'up':
        aim -= line[1]
        break
      case 'down':
        aim += line[1]
        break
      default:
        console.debug('encountered bad data in switch')
    }
    return
  })
  console.log(depth * travel)
})