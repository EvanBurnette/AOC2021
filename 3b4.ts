#!deno run --allow-read

function getPopBit(arr: number[][], i: number): 1 | 0 {
  const count = arr.reduce((accum, current) => {
    return accum + current[i] //add up bits in this position for each subarray in the array
  }, 0)
  if (count >= (arr.length / 2)) return 1 //if the count is higher or equal to half 1 is most popular bit
  return 0
}

function getUnPopBit(arr: number[][], i: number): 1 | 0 {
  const count = arr.reduce((accum, current) => {
    return accum + current[i]
  }, 0)
  if (count >= (arr.length/2)) return 0 //exactly the opposite of popular bit except biased for 0 in case of tie
  return 1
}

function getOxygenRating(arr: number[][]): number[] {
  const width = arr[0].length
  for (let i = 0; i < width; i++){        //for each bit
    const popBit = getPopBit(arr, i)      //find popular bit
    arr = arr.filter(n => n[i] == popBit) //keep arrays that contain popular bit
  }
  return arr[0]//return remaining number as oxygen rating
}

function getCO2Rating(arr: number[][]): number[]{
  const width = arr[0].length
  let lastArr = [...arr]
  for (let i = 0; i < width; i++){          //for each bit
    const unPopBit = getUnPopBit(arr, i)    //find least popular bit
    lastArr = [...arr];               //copy array before destroying return value
    arr = arr.filter(n => n[i] == unPopBit) //keep arrays that contain least popular bit
    if (arr.length == 0) {
      break
    }
  }
  return lastArr[0]//return last removed number as co2 rating
}

function binArrToNum(arr: number[]): number{
  //take an array of ones and zeroes and convert it into an integer
  return parseInt(arr.map(n => Number(n).toString()).join(''), 2)
}

function textToBinDigitArr (text: string): number[][] {
  return text.replaceAll('\r','').split('\n').map((line: string) => line.split('').map(n => Number(n)));
}

const data = Deno.readTextFileSync('3_test_data.txt')
// const fs = require('fs')
// const data = fs.readFileSync('3_test_data.txt', 'utf8')
const dataArr = textToBinDigitArr(data)
const oxygenRating = binArrToNum(getOxygenRating(dataArr))
const co2Rating = binArrToNum(getCO2Rating(dataArr))
console.log(co2Rating * oxygenRating)