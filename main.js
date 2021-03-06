'use strict';

// creation of the gameboard as a module
const gameBoard = (() => {
    const board = [-1, -1, -1, -1, -1, -1, -1, -1, -1];

    // returns the current state of the board
    const getBoard = () => board;

    // returns the current symbol located at a specific index
    const getBoardPos = (index) => board[index];

    // sets a specific board position to the users input
    const setBoardPos = (index, player) => (board[index] = player);

    // resets the board for a new game
    //TODO finish this reset method
    const resetBoard = () => {
        for (let i = 0; i < board.length; i++) {
            board[i] = -1;
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
    const gameInformation = document.getElementById('information');
    const restartBtn = document.getElementById(`restartBtn`);

    gameBoardSelector.addEventListener('click', (event) => {
        // removes the event listener to stop and more entrys if the game is over.

        console.log(event.target.firstElementChild.textContent);

        if (gameController.getGameStatus()) {
            gameBoardSelector.removeEventListener;
        } else if (event.target.firstElementChild.textContent === '') {
            // Play round
            gameController.playRound(event.target.id);
            drawGameBoard();
        }
    });

    //draws the symbol of the player onto the board
    const drawGameBoard = () => {
        for (let i = 0; i < gameBoard.getBoard().length; i++) {
            if (gameBoard.getBoardPos(i) != -1) {
                gameBoardSelector.children[
                    i
                ].firstElementChild.firstElementChild.textContent =
                    gameBoard.getBoardPos(i);
            } else {
                gameBoardSelector.children[
                    i
                ].firstElementChild.firstElementChild.textContent = '';
            }
        }
    };

    // Updates the information panel with with user who's turn it is or the winner.
    const updateInformation = (player, gameStatus, round) => {
        // Updates the H2 to keep players up to date
        if ((round === 10) & (gameController.getWinner() === '')) {
            gameInformation.firstElementChild.textContent = `Draw! Click Restart to play again`;
        } else {
            gameInformation.firstElementChild.textContent = gameStatus
                ? `Game Over, ${gameController.getWinner()} wins! Restart to play again`
                : `${player}'s turn!`;
        }
    };

    restartBtn.addEventListener('click', (event) => {
        gameInformation.children[0].textContent = `Player X starts!`;
        gameBoard.resetBoard();
        gameController.resetGame();
        drawGameBoard();
    });

    return { updateInformation };
})();

const gameController = (() => {
    const userX = user('X');
    const userO = user('O');
    let round = 1;
    let gameOver = false;
    let winner = '';

    // Get the current player
    const getTurn = (round) => {
        return round % 2 === 0 ? userO.getSymbol() : userX.getSymbol();
    };

    // Play a round of the game then check for a winner
    const playRound = (boardPos) => {
        gameBoard.setBoardPos(boardPos, getTurn(round));
        checkWinner();
        round++;
        if (round === 10) {
            gameOver = true;
        }
        displayController.updateInformation(
            getTurn(round),
            getGameStatus(),
            round
        );
    };

    // Sets the winner
    const declareWin = (winnerArr) => {
        gameOver = true;
        winner = winnerArr[0];
    };

    const checkWinner = () => {
        // Modified from a suggestion to determine winner based on https://codereview.stackexchange.com/questions/123279/tictactoe-win-checkin
        const winningCombo = [
            // Horizontals
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            // Verticals
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            // Horizontals
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (let i = 0; i < winningCombo.length; i++) {
            // AllEqual from suggestion on https://stackoverflow.com/questions/14832603/check-if-all-values-of-array-are-equal
            const allEqual = (arr) => arr.every((v) => v === arr[0]);
            let tempArr = [];
            for (let j = 0; j < winningCombo[i].length; j++) {
                tempArr.push(gameBoard.getBoardPos(winningCombo[i][j]));
            }

            // checks to see if the temp array contains any blank cells, if it doesn't then checks to see if any win conditions are met
            if (!tempArr.includes(-1)) {
                if (allEqual(tempArr)) {
                    declareWin(tempArr);
                }
            }
        }
    };

    // Returns the winner of the game
    const getWinner = () => {
        return winner;
    };

    // Returns if the game is over
    const getGameStatus = () => {
        return gameOver;
    };

    const resetGame = () => {
        round = 1;
        gameOver = false;
        winner = '';
    };

    return { playRound, getWinner, getGameStatus, getTurn, resetGame };
})();
