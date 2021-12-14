const fs = require('fs')

function getPopBit(arr, i, bias) {
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
  else return bias
}

fs.readFile('3_test_data.txt', 'utf8', (err, data) => {
  if (err) {console.error(err); return}

  const lines = data.replaceAll('\r', '').split('\n')
  const digits = lines[0].length
  let oxyArr = [...lines]
  let numsLeft = oxyArr.length
  let oxygen
  for (let i = 0; i < digits; i++){
    let popBit = getPopBit(oxyArr, i, 1)
    oxyArr.forEach((num, index, arr) => {
      if (numsLeft <= 1) 
          oxygen = arr[index]
          break
      if (num.split('')[i] !== popBit){
        arr[index] = null
        numsLeft--
      }
    })
  }
  console.log(oxygen)
})