const input = Deno.readTextFileSync("10_input.txt")
  .replaceAll("\r", "")
  .split("\n").map((line) => {
    return line.split("");
  });

const table = {
  ")": 3,
  "]": 57,
  "}": 1197,
  ">": 25137,
  "": 0
};

const openers = ["(", "[", "{", "<"];

function findWrongBracket(line: string[]) {
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

const sum = scores.reduce((accum, current) => {
    return current + accum
}, 0)

console.log(sum)