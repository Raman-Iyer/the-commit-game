// Imports
import React from 'react'
import './App.css'
import './index.css'
import Player from './components/Player'

// App Component
function App() {
  // Initialize 2 players each in one column of a table
  return (
    <div className="App">
      <table>
        <tbody>
          <tr className="player-holder">
            <td className="player-content">
              <Player playerName="Player1" />
            </td>
            <td className="player-content">
              <Player playerName="Player2" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

// Export the created component
export default App;
