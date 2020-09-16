// Imports
import React, { useState } from 'react'
import './App.css'
import './index.css'
import Player from './components/Player'

// App Component
function App() {
  // useState Hooks
  const [player1CommitCount, setPlayer1CommitCount] = useState(-1)
  const [player2CommitCount, setPlayer2CommitCount] = useState(-1)
  const [isReset, setIsReset] = useState(false)

  // Function to set the reset back to false on Reset Complete
  function handleResetState(state) {
    setIsReset(state);
    if (!state){
      setPlayer1CommitCount(-1)
      setPlayer2CommitCount(-1)
    }
  }

  // Function to set the commitCount for the players and check if both of them are set and declare a winner
  function setPlayerCommitCount(playerName, commitCount) {
    playerName === "player1" ? setPlayer1CommitCount(commitCount) : setPlayer2CommitCount(commitCount)
  }

  // Initialize 2 players each in one column of a table
  return (
    <div className="App">
      <div>{player1CommitCount !== -1 && player2CommitCount !== -1 ? player1CommitCount > player2CommitCount ? "Player 1 Wins!" : "Player 2 wins" : ""}</div>
      <button onClick={() => {
        handleResetState (true)
        }} style={{ display: player1CommitCount !== -1 && player2CommitCount !== -1 ? "inline-block" : "none" }}>Reset Game!</button>
      <table>
        <tbody>
          <tr className="player-holder">
            <td className="player-content">
              <Player playerName="Player1" setPlayerCommitCount={(commitCount) => {
                setPlayerCommitCount("player1", commitCount)
              }} isReset={isReset} resetComplete={() => {
                handleResetState(false)
              }} />
            </td>
            <td className="player-content">
              <Player playerName="Player2" setPlayerCommitCount={(commitCount) => {
                setPlayerCommitCount("player2", commitCount)
              }} isReset={isReset} resetComplete={() => {
                handleResetState(false)
              }} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

// Export the created component
export default App;
