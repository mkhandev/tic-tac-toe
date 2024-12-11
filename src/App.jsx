import { useState } from "react";
import "./App.css";
import GameBoard from "./components/GameBoard.jsx";

import Player from "./components/Player.jsx";
import Log from "./components/Log.jsx";
import GameOver from "./components/GameOver.jsx";
import { WINNING_COMBINATIONS } from "./winning-combinations.js";

const PLAYERS ={
  X: 'Player 1',
  O: 'Player 2',
}

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function driveActivePlayer(gameTurns) {
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }

  return currentPlayer;
}

function driveGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map((array) => [...array])];

  for (const trun of gameTurns) {
    const { square, player } = trun;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  return gameBoard;
}

function driveWinner(gameBoard, players) {
  let winner = null;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
    }
  }

  return winner;
}

function App() {
  const [players, setPlayers] = useState(PLAYERS);

  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = driveActivePlayer(gameTurns);
  const gameBoard = driveGameBoard(gameTurns);
  const winner = driveWinner(gameBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner;

  function handelSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevTruns) => {
      const currentPlayer = driveActivePlayer(prevTruns);

      const updatedTruns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTruns,
      ];

      return updatedTruns;
    });
  }

  function handelRestart() {
    setGameTurns([]);
  }

  function handelPlayerNameChange(symbol, newName) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName={handelPlayerNameChange}
          />
          <Player
            initialName={PLAYERS.O}
            symbol="O"
            isActive={activePlayer === "O"}
            onChangeName={handelPlayerNameChange}
          />
        </ol>

        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handelRestart} />
        )}
        <GameBoard onSelectSquare={handelSelectSquare} board={gameBoard} />
      </div>
      <Log truns={gameTurns} />
    </main>
  );
}

export default App;
