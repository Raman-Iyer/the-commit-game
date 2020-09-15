import React from 'react';
import logo from './logo.svg';
import './App.css';
import SearchUser from './components/SearchUser'

function searchUser(userName){
  console.log(userName)
}

function App() {
  return (
    <div className="App">
      <SearchUser searchUser={searchUser}/>
    </div>
  );
}

export default App;
