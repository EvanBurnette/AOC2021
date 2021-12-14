const fs = require('fs')

function getPopBit(arr, i) {
  let count = arr.reduce((accum, current) => {
    return accum + current[i] //add up bits in this position for each subarray in the array
  }, 0)
  if (count >= (arr.length / 2)) return 1 //if the count is higher or equal to half 1 is most popular bit
  return 0
}

function getUnPopBit(arr, i) {
  let count = arr.reduce((accum, current) => {
    return accum + current[i]
  }, 0)
  if (count >= (arr.length/2)) return 0 //exactly the opposite of popular bit except biased for 0 in case of tie
  return 1
}

function getOxygenRating(arr) {
  const width = arr[0].length
  for (let i = 0; i < width; i++){        //for each bit
    const popBit = getPopBit(arr, i)      //find popular bit
    arr = arr.filter(n => n[i] == popBit) //keep arrays that contain popular bit
  }
  return arr[0]//return remaining number as oxygen rating
}

function getCO2Rating(arr){
  let width = arr[0].length
  for (let i = 0; i < width; i++){          //for each bit
    const unPopBit = getUnPopBit(arr, i)    //find least popular bit
    const lastArr = [...arr];               //copy array before destroying return value
    arr = arr.filter(n => n[i] == unPopBit) //keep arrays that contain least popular bit
    if (arr.length == 0) {
      return lastArr[0]//return last removed number as co2 rating
    }
  }
}

function binArrToNum(arr){
  //take an array of ones and zeroes and convert it into an integer
  return parseInt(arr.map(n => Number(n).toString()).join(''), 2)
}

function textToBinDigitArr (text) {
  return text.replaceAll('\r','').split('\n').map(line => line.split('').map(n => Number(n)));
}

fs.readFile('3_data.txt', 'utf8', (err, data) => {
  if (err) {console.error(err); return}
  const dataArr = textToBinDigitArr(data)
  const oxygenRating = binArrToNum(getOxygenRating(dataArr))
  const co2Rating = binArrToNum(getCO2Rating(dataArr))
  console.log(co2Rating * oxygenRating)
})

// I succeeded here after 4+ attempts because I created a good pseudocode skeleton once I understood the problem
// I am also breaking things into single purpose, well named functions and my main program is just a few very readable lines of code and I'm loving it!