const fs = require('fs')

fs.readFile('./1_data.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  const lines = data.split('\n').filter(line => line).map(line => Number(line))
  // console.log(lines)
  let count = 0
  lines.reduce((last, current) => {
    if (last) {
      if (current > last) count++
    }
    return current
  }, null)
  console.log(count)
})