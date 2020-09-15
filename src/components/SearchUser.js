import React, { useState } from 'react'

let typingTimer;
let typingInterval = 1000;

function onInputBoxTypingDone(searchUser, userName) {
    window.clearTimeout(typingTimer);
    typingTimer = window.setTimeout(() => {
        searchUser(userName)
    },typingInterval);
}

function onInputBoxTyping() {
    window.clearTimeout(typingTimer);
}

function SearchUser(props) {
    const [userName, setUserName] = useState("")
    const { searchUser, playTurn } = props
    return (
        <div>
            <input onKeyDown={onInputBoxTyping} onKeyUp={()=> {
                onInputBoxTypingDone(searchUser, userName)
            }} onChange={e => {
                setUserName(e.target.value)
            }} />
            
        </div>
    )
}

export default SearchUser