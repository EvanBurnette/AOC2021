const fs = require('fs')
const input = fs.readFileSync("10_test_input.txt", "utf8")
  .replaceAll("\r", "")
  .split("\n").map((line) => {
    return line.split("");
  });

const table = {
  ")": 1,
  "]": 2,
  "}": 3,
  ">": 4,
  "(": 1,
  "[": 2,
  "{": 3,
  "<": 4,
  "": 0
};

const openers = ["(", "[", "{", "<"];

function findWrongBracket(line) {
  const list = [];
  for (const ch of line) {
    if (openers.includes(ch)) {
      list.push(ch);
    } else {
      switch (ch) {
        case ")":
          if (list.pop() != "(") {
            return ch;
          }
          break;
        case "]":
          if (list.pop() != "[") {
            return ch;
          }
          break;
        case "}":
          if (list.pop() != "{") {
            return ch;
          }
          break;
        case ">":
          if (list.pop() != "<") {
            return ch;
          }
          break;
        default:
          break;
      }
    }
  }
  return "";
}

const scores = input.map(line => {
    return table[findWrongBracket(line)]
})

const incompletes = input.filter((_, i) => {
  return (scores[i] === 0);
})

function findEnd(line) {
  const list = [];
  for (const ch of line) {
    if (openers.includes(ch)) {
      list.push(ch);
    } else {
      list.pop()
    }
  }
  return list.reverse()
}

const completes = incompletes.map(line => {
  return findEnd(line);
})

function getScore(line){
  let score = 0;
  line.forEach(ch => {
    score *= 5;
    score += table[ch]
  })
  return score;
}

const compScores = completes.map(line => {
  return getScore(line);
}).sort((a, d) => a - d)

console.log(compScores[Math.floor(compScores.length/2)])