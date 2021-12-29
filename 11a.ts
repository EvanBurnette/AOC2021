import * as _ from "./node_modules/@types/lodash"
console.log(_)

const inputArr = _.zip(...Deno.readTextFileSync("11_test_input.txt")
.replaceAll('\r', '')
.split('\n')
.map(line => line.split('')))

console.log(inputArr)