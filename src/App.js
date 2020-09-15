import React from 'react';
import logo from './logo.svg';
import './App.css';
import Player from './components/Player'

window.playerPlayedCount = 0

function App() {
  return (
    <div className="App">
      <table>
        <tr style={{ height: "1000px", verticalAlign: "top" }}>
          <td style={{ width: "600px"}}>
            <Player playerName="Player1" />
          </td>
          <td style={{ width: "600px"}}>
            <Player playerName="Player2" />
          </td>
        </tr>
      </table>
    </div>
  );
}

export default App;
