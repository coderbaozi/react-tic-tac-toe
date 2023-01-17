import { useState } from "react";
export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setHistory([...history, nextSquares]);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  // map method params callbackFucction list include value,index,itself
  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = `Go to move # ${move}`;
    } else {
      description = `Go to game start`;
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Border
          xIsNext={xIsNext}
          squares={currentSquares}
          onPlay={handlePlay}
        />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
export function Border({ xIsNext, squares, onPlay }) {
  function handleClick(index) {
    // current square position is occupied or a player is successed
    if (squares[index] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[index] = "x";
    } else {
      nextSquares[index] = "o";
    }
    onPlay(nextSquares);
  }
  // tips: a player have successed or turns next player
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = `winner: ${winner}`;
  } else {
    status = `next Player: ${xIsNext ? "x" : "o"}`;
  }
  return (
    <>
      <div className="status">{status}</div>
      <div className="border-row">
        <Square
          value={squares[0]}
          onSquaresClick={() => {
            handleClick(0);
          }}
        />
        <Square
          value={squares[1]}
          onSquaresClick={() => {
            handleClick(1);
          }}
        />
        <Square
          value={squares[2]}
          onSquaresClick={() => {
            handleClick(2);
          }}
        />
      </div>
      <div className="border-row">
        <Square
          value={squares[3]}
          onSquaresClick={() => {
            handleClick(3);
          }}
        />
        <Square
          value={squares[4]}
          onSquaresClick={() => {
            handleClick(4);
          }}
        />
        <Square
          value={squares[5]}
          onSquaresClick={() => {
            handleClick(5);
          }}
        />
      </div>
      <div className="border-row">
        <Square
          value={squares[6]}
          onSquaresClick={() => {
            handleClick(6);
          }}
        />
        <Square
          value={squares[7]}
          onSquaresClick={() => {
            handleClick(7);
          }}
        />
        <Square
          value={squares[8]}
          onSquaresClick={() => {
            handleClick(8);
          }}
        />
      </div>
    </>
  );
}
function Square({ value, onSquaresClick }) {
  return (
    <button onClick={onSquaresClick} className="square">
      {value}
    </button>
  );
}

function calculateWinner(squares) {
  // all possible success results
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
