"use strict";

// creation of the gameboard as a module
const gameBoard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];

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
      board[i] = "";
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
  const gameBoardSelector = document.getElementById("gameBoard");

  gameBoardSelector.addEventListener("click", (event) => {
    console.log(`clicked ${event.target.id}`);

    if (gameController.getGameStatus()) {
      gameBoardSelector.removeEventListener;
      console.log(`event listener removed`);
    } else if (event.target.textContent === "") {
      //play round
      gameController.playRound(event.target.id);
      drawGameBoard();
    }
  });

  console.log(`game board ${gameBoardSelector.children[0]}`);

  //draws the symbol of the player onto the board
  const drawGameBoard = () => {
    for (let i = 0; i < gameBoard.getBoard().length; i++) {
      gameBoardSelector.children[i].textContent = gameBoard.getBoardPos(i);
    }
  };
})();

const gameController = (() => {
  const userX = user("X");
  const userO = user("O");
  let round = 1;
  let gameOver = false;
  let winner = "";

  const getTurn = (round) => {
    return round % 2 === 0 ? userO.getSymbol() : userX.getSymbol();
  };

  const playRound = (boardPos) => {
    gameBoard.setBoardPos(boardPos, getTurn(round));
    checkWinner();
    round++;
    console.log(round);
  };

  const declareWin = (winnerArr) => {
    console.log(`player ${winnerArr[0]} Wins!!`);
    gameOver = true;
    winner = winnerArr[0];
  };

  const checkWinner = () => {
    // Following suggestion to determine winner based on https://codereview.stackexchange.com/questions/123279/tictactoe-win-checkin
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

      tempArr.includes("")
        ? console.log(`no win`)
        : allEqual(tempArr)
        ? declareWin(tempArr)
        : console.log("no winner");
      //console.log(allEqual(tempArr)); // true

      //console.log(winningCombo[i].every((val, i, arr) => val === arr[0]));
    }
  };

  const getWinner = () => {
    return winner;
  };

  const getGameStatus = () => {
    return gameOver;
  };

  return { playRound, getWinner, getGameStatus };
})();

//console.log(board);
console.log(gameBoard.getBoard());
console.log(gameBoard.getBoardPos(0));
//console.log(gameBoard.resetBoard());
console.log(gameBoard.getBoard());
