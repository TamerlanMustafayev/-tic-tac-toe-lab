/*-------------------------------- Constants --------------------------------*/


const squareEls = document.querySelectorAll('.sqr')
const messageEl = document.querySelector('#message')
const resetBtnEL = document.querySelector('#reset')

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6]
];


/*---------------------------- Variables (state) ----------------------------*/
let turn
let winner
let tie 

let board = [
    '', '', '',
    '', '', '',
    '', '', '',
]




/*------------------------ Cached Element References ------------------------*/

squareEls.forEach((squareEl ) => {
    squareEl.addEventListener('click', handleClick)
})

resetBtnEL.addEventListener('click', init)


/*-------------------------------- Functions --------------------------------*/




function updateBoard() {
    board.forEach((square, index) => {
        const currentCell = document.getElementById(index)
        if (square === 'X') {
            currentCell.style.backgroundColor = '#EB3678'
            currentCell.innerHTML = square
        } else if (square === 'O') {
            currentCell.style.backgroundColor = '#FB773C'
            currentCell.innerHTML = square
        } else  {
            currentCell.style.backgroundColor = '#39b6e0'  
            currentCell.innerText = ''
        }
    })
}


/// HANDLE CLICK

function handleClick(event) {
    const squareIndex = event.target.id

    if (board[squareIndex] !== '' || winner) {
        return
    }
    placePiece(squareIndex)
    checkForWinner()
    checkForTie() 
    switchPlayerTurn()
    updateBoard()
    updateMessage()
}




function placePiece(index) {
    board[index] = turn
}

function checkForWinner() {
    winningCombos.forEach(winningCombo => {
        
        if (
            board[winningCombo[0]] !== '' &&
            board[winningCombo[0]] === board[winningCombo[1]] &&
            board[winningCombo[1]] === board[winningCombo[2]] 
        )

        {
            winner = true

        }
    })
}

function checkForTie() {
    tie = board.every(square => square !== '') && !winner;
} 

function switchPlayerTurn() {
    if (!winner) {
        if (turn === 'X') {
            turn = 'O'
        } else if (turn === 'O') {
            turn = 'X'
        }
    }
}

function updateMessage() {
    if (!winner && !tie) {
        messageEl.innerText = `Game in progress... Turn: ${turn} `
    } else if (!winner && tie) {
        messageEl.innerHTML = 'It is a Tie'
    } else {
        messageEl.innerHTML = `Congratulations! ${turn} won!`
    }
}

function render() {
    updateBoard()
    updateMessage()
}

function init() {
    board = [
        '', '', '',
        '', '', '',
        '', '', '',
    ]
    turn = 'X'
    winner = false
    tie = false
    render()
}



init()
/*----------------------------- Event Listeners -----------------------------*/



