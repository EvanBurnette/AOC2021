//clue sample
//acedgfb (8) cdfbe gcdfa fbcad dab(7 d=>a ab=>cf) cefabd cdfgeb efab(4 ef=>bd) cagedb ab (1 ab=>cf)
//cdfeb fcadb cdfeb cdbaf

//  0:6s     1:2s   2:5s    3:5s    4:4s
//  aaaa    ....    aaaa    aaaa    ....
// b    c  .    c  .    c  .    c  b    c
// b    c  .    c  .    c  .    c  b    c
// ....    ....    dddd    dddd    dddd
// e    f  .    f  e    .  .    f  .    f
// e    f  .    f  e    .  .    f  .    f
//  gggg    ....    gggg    gggg    ....

//  5:5s    6:6s    7:3s    8:7s    9:6s
//  aaaa    aaaa    aaaa    aaaa    aaaa
// b    .  b    .  .    c  b    c  b    c
// b    .  b    .  .    c  b    c  b    c
//  dddd    dddd    ....    dddd    dddd
// .    f  e    f  .    f  e    f  .    f
// .    f  e    f  .    f  e    f  .    f
//  gggg    gggg    ....    gggg    gggg

const clueSample = "acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf".split(" | ")
const pattern = clueSample[0]
const output = clueSample[1]

//step 0: determine # of segments in each word
//step 1: find 4 easy digits
//step 2: 7 and 1 share 2/3 segments so we find 'a' immediately
//step 3: we can also reduce options for 'c','f', 'b', 'd' 
//step 4: determing segment frequency
//a: 8, b: 6, c: 8, d: 7, e: 3, f: 9, g: 7
//step 5: each 10 clue set will give me the cypher value of b, e, and f based solely on frequency
//        and reduce possibilities for g, d and a, c
//we already have 'a' so 'c' is solved (freq 8)
//step 6: 'd' and 'g' remain so we eliminate them from our display

//  0:6s     1:2s   2:5s    3:5s    4:4s
//  ....    ....    ....    ....    ....
// .    .  .    .  .    .  .    .  .    .
// .    .  .    .  .    .  .    .  .    .
//  ....    ....    dddd    dddd    dddd
// .    .  .    .  .    .  .    .  .    .
// .    .  .    .  .    .  .    .  .    .
//  gggg    ....    gggg    gggg    ....

//  5:5s    6:6s    7:3s    8:7s    9:6s
//  ....    ....    ....    ....    ....
// .    .  .    .  .    .  .    .  .    .
// .    .  .    .  .    .  .    .  .    .
//  dddd    dddd    ....    dddd    dddd
// .    .  .    .  .    .  .    .  .    .
// .    .  .    .  .    .  .    .  .    .
//  gggg    gggg    ....    gggg    gggg

//after eliminating segments that are solved
//and stored in the cypher
//we have 0 being the only one without 'd'
//so we can solve for 'd'
//only g remains so g is solved

//step 7: then we run the cypher on the answer
//step 8: pass the decyphered text through the converter and push the answer to an answer array
//step 9: sum all answers for ultimate answer

function textToKeys(text) {
  return text.split(" ").map(word => {
    return word.split("").sort((a, b) => a.charCodeAt(0) - b.charCodeAt(0)).join("");
  })
}
const lookup = {
  abcefg: '0',
  cf: '1',
  acdeg: '2',
  acdfg: '3',
  abfg: '4',
  abdfg: '5',
  abdefg: '6',
  abd: '7',
  abcdefg: '8',
  abcdfg: '9'
}
function textToNum(text){
  const keys = textToKeys(text);
  numArr = keys.map(key => lookup[key])
  return Number(numArr.join(""));
}
let cypher = {}
"abcdefg".split("").forEach(ch => {
  cypher[ch] = "abcdefg"
})
console.log(cypher)
// console.log(textToNum("cf acdeg acdfg bdcf abdfg abedfg acf abcdefg abcdfg abcefg"))