const fs = require('fs')

function getPopBit(arr, i) {
  const testBit = 1 << i
  let count = arr.reduce((accum, current) => {
    if ((current & testBit) > 0) return accum + 1
    else return accum - 1
  }, 0)
  if (count >= 0) return testBit
  else return 0
}

fs.readFile('3_test_data.txt', 'utf8', (err, data) => {
  if (err) {console.error(err); return}
  const lines = data.replaceAll('\r','').split('\n')
  const bitWidth = lines[0].length
  let oxyData = lines.map(n => parseInt(n, 2))
  let oxyRating = 0
  for (let i = bitWidth - 1; i >= 0; i--){
    let popBit = getPopBit(oxyData, i)
    oxyRating += popBit
    oxyData = oxyData.filter(n => (n>>i) ^ (popBit>>i))
    console.log(oxyData)
  }
  console.log(Number(oxyRating).toString(2))
})