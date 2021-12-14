const fs = require('fs')
const data = fs.readFileSync('./4_data.txt', 'utf8').split('\r\n').filter(line => line != '')
const stream = data[0].split(',').map(s => Number(s))

let textBoards = data.slice(1)
let boards = []
for (let i = 0; i < textBoards.length / 5; i++) {
  boards.push(textBoards.slice(i * 5, (i + 1) * 5).map(s => s.trim().split(/\s+/).map(s => Number(s))))
}

// console.log(boards)

function denumBoard(board, num) {
  board.forEach((row, i) => {          //For each board
    row.forEach((place, j) => {        //For each row
      if (place === num) {
        board[i][j] = -1               //Replace called number with -1
        // console.log(board)
        return board
      }
    })
  })
  return board
}

function sumRow(row) {
  return row.reduce((accum, current) => {
    return accum + current
  }, 0)
}

function checkWinRows(board) {
  let val = false
  board.forEach(row => {
    // if (sumRow(row) == -row.length) return true
    val ||= (sumRow(row) == -row.length)
  })
  return val
}
// console.log(checkWinRows([[-1,-1,-1], [1,2,3], [1,2,3]]))

function getRotBoard(board){
  let rotBoard = []
  for (let i = 0; i < board[0].length; i++) {
    let col = []
    board.forEach(row => {
      col.push(row[i])
    })
    rotBoard.push(col)
  }
  return rotBoard
}
// console.log(getRotBoard([[1,2,3],[1,2,3],[1,2,3]]))
// console.log(getRotBoard([[ 14, 21, 17, 24, 4 ],[ 10, 16, 15, 9, 19 ],[ 18, 8, 23, 26, 20 ],[ 22, 11, 13, 6, 5 ],[ 2, 0, 12, 3, 7 ]]))

function checkWinCols(board) {
  let rotBoard = getRotBoard(board)
  if (checkWinRows(rotBoard)) return true
  return false
}

function checkWin(board) {
  return checkWinRows(board) || checkWinCols(board)
}

function sumNonNeg(board) {
  return board.flat().reduce((accum, current) => {
    return (current > 0 ? accum + current : accum)
  }, 0)
}
// console.log(sumNonNeg([[1,2,3,-6]]))

let winningBoards = []
winningBoards.length = boards.length
winningBoards.fill(false)

function findLastWinningScore() {
  for (const num of stream) {
    for (let [i, board] of boards.entries()) {
      board = denumBoard(board, num)
      if (checkWin(board)) {
        winningBoards[i] |= true
        if (winningBoards.reduce((accum, current) => accum &&= current))
          return sumNonNeg(board) * num
      }
    }
  }
  return -1
}

console.log(findLastWinningScore())

//lesson learned: no returning from forEach