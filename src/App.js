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

  // Function to set the commitCount for the players and check if both of them are set and declare a winner
  function setPlayerCommitCount(playerName, commitCount){
    playerName === "player1" ? setPlayer1CommitCount(commitCount) : setPlayer2CommitCount(commitCount)

    if (player1CommitCount !== -1 && player2CommitCount !== -1){
      alert(player1CommitCount > player2CommitCount ? "Player 1 wins!" : "Player 2 wins!")
    }
  }

  // Initialize 2 players each in one column of a table
  return (
    <div className="App">
      <table>
        <tbody>
          <tr className="player-holder">
            <td className="player-content">
              <Player playerName="Player1" setPlayerCommitCount={(commitCount) => {
                setPlayerCommitCount("player1", commitCount)
              }} />
            </td>
            <td className="player-content">
              <Player playerName="Player2" setPlayerCommitCount={(commitCount) => {
                setPlayerCommitCount("player2", commitCount)
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
