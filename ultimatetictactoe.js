"use strict";

const State = {
    NONE: 0,
    TIE: 1,
    X: "X",
    O: "0"
}

let side = 3;
const players = ['X', 'O'];
let currentPlayer = players[0];
let currentBoard = -1;

const superboard = document.getElementById('superboard');

const board = document.getElementsByClassName('board');
let boards = []
for (let i = 0; i < side * side; i++) {
    boards.push([board[i].getElementsByClassName('square'), State.NONE]);
}

const endMessage = document.createElement('h2');
endMessage.style.marginTop = '30px';
endMessage.style.textAlign='center';

superboard.after(endMessage);

endMessage.textContent= `${currentPlayer}'s turn!`;


function checkRowsSubBoard(currentPlayer, squares) {
    for (let i = 0; i < side; i++) {
        let j = 0;

        for (; j < side; j++) {
            if (squares[i * side + j].textContent !== currentPlayer) 
                break;
        }
        if (j === side)
            return true;
    }
    return false;
}

function checkColumnsSubBoard(currentPlayer, squares) {
    for (let j = 0; j < side; j++) {
        let i = 0;

        for (; i < side; i++) {
            if (squares[i * side + j].textContent !== currentPlayer)
                break;
        }
        if (i === side)
            return true;
    }
    return false;
}

function checkDiagonalsSubBoard(currentPlayer, squares) {
    let i = 0;
    for (; i < side; i++) {
        if (squares[i * side + i].textContent !== currentPlayer)
            break;
    }
    if (i === side)
        return true;

	i = 0;
    for (; i < side; i++) {
        if (squares[i * side + side - 1 - i].textContent !== currentPlayer)
            break;
    }
    return i === side;
}

function checkWinSubBoard(currentPlayer, squares) {
    return checkRowsSubBoard(currentPlayer, squares) || checkColumnsSubBoard(currentPlayer, squares) || checkDiagonalsSubBoard(currentPlayer, squares);
}

function checkTieSubBoard(squares) {
    for(let i = 0; i < squares.length; i++) {
        if(squares[i].textContent === '')
            return false;
    }
    return true;
}

function updateState(currentPlayer, board) {
    if (board[1] !== State.NONE)
        return;

    if (checkWinSubBoard(currentPlayer, board[0]))
        board[1] = currentPlayer;

    if (checkTieSubBoard(board[0])) {
        board[1] = State.TIE;
    }
}

function checkRows(currentPlayer) {
    for (let i = 0; i < side; i++) {
        let j = 0;

        for (; j < side; j++) {
            if (currentPlayer !== boards[i * side + j][1])
                break;
        }
        if (j === side)
            return true;
    }
    return false;
}

function checkColumns(currentPlayer) {
    for (let j = 0; j < side; j++) {
        let i = 0;

        for (; i < side; i++) {
            if (currentPlayer !== boards[i * side + j][1])
                break;
        }
        if (i === side)
            return true;
    }
    return false;
}

function checkDiagonals(currentPlayer) {
    let i = 0;
    for (; i < side; i++) {
        if (currentPlayer !== boards[i * side + i][1])
            break;
    }
    if (i === side)
        return true;

	i = 0;
    for (; i < side; i++) {
        if (currentPlayer !== boards[i * side + side - 1 - i][1])
            break;
    }
    return i === side;
}

function checkWin(currentPlayer) {
	return checkRows(currentPlayer) || checkColumns(currentPlayer) || checkDiagonals(currentPlayer);
}

function checkTie(){
    for (let i = 0; i < boards.length; i++) {
        if (boards[i][1] !== State.TIE)
            return false;
    }
    return true;
}

for(let i = 0; i < boards.length; i++){
    for (let j = 0; j < boards[i][0].length; j++) {
        boards[i][0][j].addEventListener('click', () => {
            if ((currentBoard !== -1 && i !== currentBoard) ||  boards[i][1] !== State.NONE || boards[i][0][j].textContent !== '')
                return;
    
            boards[i][0][j].textContent = currentPlayer;

            updateState(currentPlayer, boards[i]);
            currentBoard = (boards[j][1] !== State.NONE) ? -1 : j;
    
            if(checkWin(currentPlayer))
                endMessage.textContent=`Game over! ${currentPlayer} wins!`;
            else if(checkTie())
                endMessage.textContent= `Game is tied!`;
            else {
                currentPlayer = (currentPlayer === players[0]) ? players[1] : players[0];
                endMessage.textContent= `${currentPlayer}'s turn!`;
            }
        })   
    }
}

function restartBoard(squares) {
    for (let i = 0; i < squares.length; i++) {
        squares[i].textContent = '';
    }
}

function restartButton() {
	for(let i = 0; i < boards.length; i++) {
        restartBoard(boards[i][0]);
        boards[i][1] = State.NONE;
    }

    currentBoard = -1;
	currentPlayer = players[0];
	endMessage.textContent= `${currentPlayer}'s turn!`;
}