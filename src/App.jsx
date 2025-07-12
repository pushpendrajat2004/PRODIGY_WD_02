import React, { useState } from 'react'
import './App.css'

function App() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [isXNext, setIsXNext] = useState(true)

  const winner = calculateWinner(board)

  const handleClick = (index) => {
    if (board[index] || winner) return

    const newBoard = [...board]
    newBoard[index] = isXNext ? 'X' : 'O'
    setBoard(newBoard)
    setIsXNext(!isXNext)
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setIsXNext(true)
  }

  const renderCell = (cell, index) => {
    const cellClass =
      cell === 'X' ? 'cell x-cell' : cell === 'O' ? 'cell o-cell' : 'cell'
    return (
      <div key={index} className={cellClass} onClick={() => handleClick(index)}>
        {cell}
      </div>
    )
  }

  return (
    <div className="container">
      <h1>Tic Tac Toe</h1>
      {!winner ? (
        <>
          <div className="board">{board.map(renderCell)}</div>
          <div className="status">
            {board.every(Boolean)
              ? 'Draw!'
              : `Next Player: ${isXNext ? 'X' : 'O'}`}
          </div>
        </>
      ) : (
        <div className="winner-text">The Winner is: {winner}</div>
      )}
      <button onClick={resetGame} className="reset">
        Restart
      </button>
    </div>
  )
}

// Winner logic
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

export default App
