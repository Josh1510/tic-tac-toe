"use strict";

const gameBoard = (() => {
  const board = ["x", "o", "x", "", "", "", "", "", ""];

  const getBoard = () => board;

  const getBoardPos = (index) => board[index];

  const setBoardPos = (index, player) => (board[index] = player);

  const resetBoard = () => {
    for (let i = 0; i < board.length; i++) {
      board[i] = "";
    }
  };

  return { getBoard, getBoardPos, setBoardPos, resetBoard };
})();

//console.log(board);
console.log(gameBoard.getBoard());
console.log(gameBoard.getBoardPos(0));
console.log(gameBoard.resetBoard());
console.log(gameBoard.getBoard());
