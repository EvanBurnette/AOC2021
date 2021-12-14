const fs = require('fs')

function getPopBit(arr, i) {
  const count = arr.reduce((accum, current) => {
    if (current){
      if (current.split('')[i] === '1') return accum + 1
      else if (current.split('')[i] === '0') return accum - 1
      else return accum
    }
    else return accum
  }, 0)
  if (count > 0) return '1'
  else if (count < 0) return '0'
  else return '1'
}

fs.readFile('3_test_data.txt', 'utf8', (err, data) => {
  if (err) {console.error(err); return}
  const lines = data.replaceAll('\r','').split('\n').map(line => line.split(''))
  console.debug(lines)
  const bitWidth = lines[0].length
  let oxyData = [...lines]
  let oxygenRating = 0;
  for (let i = 0; i < bitWidth; i++){
    let popBit = getPopBit(oxyData, i)
    oxygenRating |= popBit << (bitWidth - 1 - i)
    oxyData = oxyData.filter(line => line.split('')[i] != popBit)
  }
  console.log(oxygenRating)

  let co2Data = [...lines]
  let co2Rating = 0;
  for (let i = 0; i < bitWidth; i++){
    let popBit = 1 ^ getPopBit(co2Data, i)
    co2Rating |= popBit << (bitWidth - 1 - i)
    if (i == bitWidth - 1) {
      if (co2Rating in co2Data){
        break
      }
      else co2Rating = parseInt(co2Data[0], 2)
    }
    co2Data = co2Data.filter(line => line.split('')[i] != popBit)
  }
  console.log(co2Rating)
  console.log(co2Rating * oxygenRating)
})