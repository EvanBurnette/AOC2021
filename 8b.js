const fs = require("fs");
const data = fs.readFileSync("8_test_data.txt", "utf8").replaceAll("\r", "").trim();
const lineArr = data.split("\r\n")
const clueArr = lineArr.map(line => {
  let tempArr = line.split(" | ");
  return {
    stream: tempArr[0].split(" "),
    output: tempArr[1].split(" ")
  }
})

//                   0, 1, 2, 3, 4, 5, 6, 7, 8, 9
const segmentsArr = [6, 2, 5, 5, 4, 5, 6, 3, 7, 6];
const ogSegs = "abcefg cf acdeg acdfg bcdf abdfg abdefg acf abcdefg abcdfg".split(" ")

let cypher = {}
"abcdefg".split("").forEach(ch => {
  cypher[ch] = null
})
console.log(cypher)

function findCommons(segs, ogSegs){
  let commonsArr = []
  segs.split("").forEach(seg => {
    let commons = ""
    ogSegs.forEach(ogSeg => {
      if (ogSeg.indexOf(seg) != -1) commons += seg
    })
    commonsArr.push(commons)
  })
  return commonsArr;
}

let compArr = []

ogSegs.forEach((segs, i) => {
  compArr[i] = findCommons(segs, ogSegs);
})

console.log(compArr)
//    0:      1:      2:      3:      4:
//  aaaa    ....    aaaa    aaaa    ....
// b    c  .    c  .    c  .    c  b    c
// b    c  .    c  .    c  .    c  b    c
// ....    ....    dddd    dddd    dddd
// e    f  .    f  e    .  .    f  .    f
// e    f  .    f  e    .  .    f  .    f
//  gggg    ....    gggg    gggg    ....

//  5:      6:      7:      8:      9:
//  aaaa    aaaa    aaaa    aaaa    aaaa
// b    .  b    .  .    c  b    c  b    c
// b    .  b    .  .    c  b    c  b    c
//  dddd    dddd    ....    dddd    dddd
// .    f  e    f  .    f  e    f  .    f
// .    f  e    f  .    f  e    f  .    f
//  gggg    gggg    ....    gggg    gggg