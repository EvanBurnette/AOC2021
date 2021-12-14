const fs = require('fs')

fs.readFile('3_data.txt', 'utf8', (err, data) => {
  if (err) {console.error(err); return}
  // else console.debug(data)

  let gammaArr = new Array();
  let length
  gammaArr.fill(0)
  data.split('\n').forEach((datum, index) => {
    if (index === 0) {
      length = datum.length;
      gammaArr.length = length
      gammaArr.fill(0)
    }
    datum.split('').forEach((ch, i) => {
      if (ch === '1') gammaArr[i]++
      else if (ch === '0') gammaArr[i]--
    })
  })
  console.debug(gammaArr)
  const gammaStr =
    gammaArr.map(num => num >= 0 ? '1': '0')
      .join('')
  console.debug('length', length)
  const gamma = Number.parseInt(gammaStr, 2)
  const mask = ~(~0 << length) //ones shifted left and bitwise notted example: 0b00011111
  console.debug('mask', mask)
  console.debug('gamma', gamma)
  const epsilon = mask ^ gamma
  console.debug('epsilon', epsilon)
  console.log(epsilon * gamma)
})