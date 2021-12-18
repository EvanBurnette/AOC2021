//clue sample
//acedgfb (8) cdfbe gcdfa fbcad dab(7 d=>a ab=>cf) cefabd cdfgeb efab(4 ef=>bd) cagedb ab (1 ab=>cf)
//cdfeb fcadb cdfeb cdbaf
const lookup = {
  abcefg: '0',
  cf: '1',
  acdeg: '2',
  acdfg: '3',
  bcdf: '4',
  abdfg: '5',
  abdefg: '6',
  acf: '7',
  abcdefg: '8',
  abcdfg: '9'
}
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
const clueSample = "fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg".split(" | ")
// const clueSample = "acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf".split(" | ")
// const clueSample = "be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe".split(" | ")
const patternArr = sortEachWord(clueSample[0])
const output = clueSample[1]

//step 0: determine # of segments in each word
const patternCount = patternArr.map(pattern => pattern.length);
//step 1: find 4 easy digits
let patternMap = {}
patternCount.forEach((count, i) => {
  switch (count) {
    case 2:
      patternMap["1"] = patternArr[i];
      break;
    case 3:
      patternMap["7"] = patternArr[i];
      break;
    case 4:
      patternMap["4"] = patternArr[i];
      break;
    case 7:
      patternMap["8"] = patternArr[i];
      break;
    default:
      break;
  }
})
// console.log(patternMap)
//step 2: 7 and 1 share 2/3 segments so we find 'a' immediately
let cypher = {}
"abcdefg".split("").forEach(ch => {
  cypher[ch] = "abcdefg"
})
cypher[patternMap['7']
      .replace(patternMap['1'].split('')[0], '')
      .replace(patternMap['1'].split('')[1], '')
    ] = 'a'
//step 3: we can also reduce options for 'c','f', 'b', 'd'
//cf (i.e. 1 segments)
patternMap['1'].split('').forEach(ch => {
  cypher[ch] = 'cf'
})
//step 4: determine segment frequency
//a: 8, b: 6, c: 8, d: 7, e: 3, f: 9, g: 7
const ogSegFreqs = { a: 8, b: 6, c: 8, d: 7, e: 4, f: 9, g: 7 }
let thisSegFreqs = { a: 0, b: 0, c: 0, d: 0, e: 0, f: 0, g: 0 }

patternArr.forEach(pattern => {
  pattern.split('').forEach(ch => {
    thisSegFreqs[ch]++;
  })
})
// console.log(ogSegFreqs)
// console.log(thisSegFreqs)
//step 5: each 10 clue set will give me the cypher value of b, e, and f based solely on frequency
//        and reduce possibilities for g, d and a, c

for (const [key, value] of Object.entries(thisSegFreqs)){
  switch (value) {
    case 4:
      cypher[key] = 'e';
      break;
    case 6:
      cypher[key] = 'b';
      break
    case 9:
      cypher[key] = 'f';
      break;
    default:
      break;
  }
}

for (const [key, value] of Object.entries(thisSegFreqs)){
  if (value == 8) {
  //we already have 'a' so 'c' is solved (freq 8)
      if (cypher[key] != 'a'){
        cypher[key] = 'c';
      }
  }
}

//step 6: 'd' and 'g' remain so we eliminate all solved values from our display

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

//after eliminating segments that are solved and stored in the cypher
for (const [key, value] of Object.entries(thisSegFreqs)){
  if (value == 7) {
      if (patternMap['4'].split('').indexOf(key) != -1){
        cypher[key] = 'd';
        //4 has d but not g so we can check our patterns for a letter in 4's pattern that isn't solved yet
        //that letter is d
      }
      else {
        //if 4 doesn't have this letter than this letter is g
        cypher[key] = 'g';
      }
  }
}

function sortEachWord(text) {
  return text.split(" ").map(word => {
    return word.split("").sort((a, b) => a.charCodeAt(0) - b.charCodeAt(0)).join("");
  })
}

function textToNum(text){
  const keys = sortEachWord(text);
  numArr = keys.map(key => lookup[key])
  return Number(numArr.join(''));
}
//step 7: then we run the cypher on the answer
// console.log(output)
const unsorted = output.split('').map(ch => {
  if (cypher[ch]){
    return cypher[ch];
  }
  return ch;
}).join('');
// console.log(unsorted)
const decypheredOutput = sortEachWord(unsorted);
// console.log(decypheredOutput)
//step 8: pass the decyphered text through the converter
const answer = textToNum(decypheredOutput.join(" "));
console.log(answer);
//step 8.5 push the answer to an answer array
//step 9: sum all answers for ultimate answer