const fs = require("fs");
const data = fs.readFileSync("8_test_data.txt", "utf8");

const lineArr = data.split("\r\n")
console.log(lineArr.length)
const clueArr = lineArr.map(line => {
  let tempArr = line.split(" | ");
  return {
    stream: tempArr[0].split(" "),
    output: tempArr[1].split(" ")
  }
})

// console.log(clueArr)

const uniques = [2, 4, 3, 7];

let uniqueCount = clueArr.reduce((accum, clue) => {
  let count = clue.output.reduce((ct, wd) => {
    if (uniques.indexOf(wd.length) != -1) {
      return ct + 1;
    }
    return ct;
  }, 0);
  return count + accum;
}, 0);

console.log(uniqueCount);

class Digit {
  constructor(num, segments){
    this.segments = segments
    this.num = num
    this.commonSegments = {
      "0": [], "1": [], "2": [], "3": [],
      "4": [], "5": [], "6": [], "7": [],
      "8": [], "9": []
    }
  }
  addCommonSegment(letter, segment){
    this.commonSegments[letter].push(segment)
  }
}

const segmentsArr = [6, 2, 5, 5, 4, 5, 6, 3, 7, 6];
let digitArr = [];
for (let i = 0; i < 10; i++){
  digitArr.push(new Digit(i, segmentsArr[i]))
}

//lesson:
//Creating this class was not necessary for this part of the problem
//It was actually a distraction
//Doing the most simple version of the problem really helps
//when starting to understand the more complex one
//I also had saved the data file whereas I copied the sample data from the webpage
//The data file contained '\n' breaks and the copy pasted data contained '\r\n'
//It would be better to .trim() then remove '\r' then split along '\n' rather than splitting on '\r\n'