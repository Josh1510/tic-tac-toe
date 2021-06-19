'use strict';

// creation of the gameboard as a module
const gameBoard = (() => {
    const board = ['x', 'o', 'x', '', '', '', '', '', ''];

    // returns the current state of the board
    const getBoard = () => board;

    // returns the current symbol located at a specific index
    const getBoardPos = (index) => board[index];

    // sets a specific board position to the users input
    const setBoardPos = (index, player) => (board[index] = player);

    // resets the board for a new game
    const resetBoard = () => {
        for (let i = 0; i < board.length; i++) {
            board[i] = '';
        }
    };

    return { getBoard, getBoardPos, setBoardPos, resetBoard };
})();

// creates a user object and returns their symbol
const user = (symbol) => {
    const getSymbol = () => symbol;

    return { getSymbol };
};

const displayController = (() => {
    const gameBoardSelector = document.getElementById('gameBoard');

    gameBoardSelector.addEventListener('click', (event) => {
        console.log(`clicked ${event.target.id}`);
        if (event.target.textContent === '') {
            //play round
            gameBoard.setBoardPos(event.target.id, 'X');
            drawGameBoard();
        }
    });

    console.log(`game board ${gameBoardSelector.children[0]}`);

    //draws the symbol of the player onto the board
    const drawGameBoard = () => {
        for (let i = 0; i < gameBoard.getBoard().length; i++) {
            gameBoardSelector.children[i].textContent =
                gameBoard.getBoardPos(i);
        }
    };
})();

//console.log(board);
console.log(gameBoard.getBoard());
console.log(gameBoard.getBoardPos(0));
console.log(gameBoard.resetBoard());
console.log(gameBoard.getBoard());
