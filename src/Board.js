import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows, ncols, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];

    for (let i = 0; i < nrows; i++) {
      const row = [];
      for (let j = 0; j < ncols; j++) {
        const isON = Math.random() * 1 < chanceLightStartsOn;
        const cellValue = isON ? true : false;
        row.push(cellValue);
      }
      initialBoard.push(row);
    }

    return initialBoard;
  }

  function hasWon() {
    return board.every((row) => row.every((cell) => !cell));
  }

  function flipCellsAround(coord) {
    setBoard((oldBoard) => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        const directions = [
          [0, 1],
          [0, -1],
          [1, 0],
          [-1, 0],
          [0, 0],
        ];

        for (const [dx, dy] of directions) {
          const newRow = y + dy;
          const newCol = x + dx;

          if (newRow >= 0 && newRow < nrows && newCol >= 0 && newCol < ncols) {
            boardCopy[newRow][newCol] = !boardCopy[newRow][newCol];
          }
        }
      };

      // TODO: Make a (deep) copy of the oldBoard
      const boardCopy = JSON.parse(JSON.stringify(oldBoard));

      // TODO: in the copy, flip this cell and the cells around it
      flipCell(y, x, boardCopy);

      // TODO: return the copy
      return boardCopy;
    });
  }

  return (
    <>
      <h1 className="header">LIGHTS OUT</h1>
      <div className="header">{hasWon() ? "You Won" : ""}</div>
      <table className="board">
        <tbody>
          {board.map((row, rIdx) => (
            <tr key={`row-${rIdx}`} className={row}>
              {row.map((cell, cIdx) => (
                <Cell
                  key={`cell-${cIdx}`}
                  flipCellsAroundMe={() => flipCellsAround(`${rIdx}-${cIdx}`)}
                  isLit={cell}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Board;
