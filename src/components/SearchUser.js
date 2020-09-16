// Imports
import React, { useEffect, useState } from 'react'

// SearchUser component
function SearchUser(props) {
    // searchUser is a function in the Player component to do the API call.
    const { isPlayed, searchUser, isReset, resetComplete } = props

    // useEffect Hook
    useEffect(() => {
        if (isReset) {
            setUserName("")
            resetComplete()
        }
    }, [isReset])

    // useState Hooks
    const [userName, setUserName] = useState("")

    // variables to keep track of timers and intervals
    let typingTimer
    let typingInterval = 1000

    // OnKeyUp we set a timeout after 1 second delay to fetch the user from API
    function onInputBoxTypingDone(e) {
        setUserName(e.target.value)
        window.clearTimeout(typingTimer)
        typingTimer = window.setTimeout(() => {
            searchUser(userName)
        }, typingInterval)
    }

    // OnKeyDown the player is typing so we clear the timeout
    // We do not want the existing timeout function to fire when we are typing
    function onInputBoxTyping() {
        window.clearTimeout(typingTimer)
    }

    // Set the userName onchange of text box
    function onChangeHandler(e) {
        setUserName(e.target.value)
    }

    return (
        <div>
            <input onKeyDown={onInputBoxTyping} onKeyUp={onInputBoxTypingDone} onChange={onChangeHandler} disabled={isPlayed ? true : false} />
        </div>
    )
}

// Export the created component
export default SearchUser