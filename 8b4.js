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

function decypherLine(inputLine) {
  const clueSample = inputLine.split("|")
  const patternArr = sortEachWord(clueSample[0].trim())
  const output = clueSample[1].trim()

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

  let cypher = {}
  "abcdefg".split("").forEach(ch => {
    cypher[ch] = "abcdefg"
  })
  cypher[patternMap['7']
        .replace(patternMap['1'].split('')[0], '')
        .replace(patternMap['1'].split('')[1], '')
      ] = 'a'

  patternMap['1'].split('').forEach(ch => {
    cypher[ch] = 'cf'
  })

  const ogSegFreqs = { a: 8, b: 6, c: 8, d: 7, e: 4, f: 9, g: 7 }
  let thisSegFreqs = { a: 0, b: 0, c: 0, d: 0, e: 0, f: 0, g: 0 }

  patternArr.forEach(pattern => {
    pattern.split('').forEach(ch => {
      thisSegFreqs[ch]++;
    })
  })

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
  return answer;
}

const fs = require('fs');
const inputArr = fs.readFileSync("8_data.txt", "utf8").trim().replace('\r', '').split('\n');
const answerArr = inputArr.map(input => decypherLine(input));
console.log(answerArr)
const sum = answerArr.reduce((accum, current) => {
  return accum + current
}, 0);
console.log("Sum: ", sum)
//step 8.5 push the answer to an answer array
//step 9: sum all answers for ultimate answer