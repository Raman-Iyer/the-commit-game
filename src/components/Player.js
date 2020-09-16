// Imports
import React, { useState } from 'react'
import SearchUser from './SearchUser'
import UserDetails from './UserDetails'

// Player Component
function Player(props) {
    // Player name is the player 1 or player 2
    const { playerName } = props

    // useState Hooks
    const [userName, setUserName] = useState("")
    const [status, setStatus] = useState("")
    const [canPlay, setCanPlay] = useState(false)
    const [isPlayed, setIsPlayed] = useState(false)

    // Function to fetch the user
    function searchUser(userName) {
        setUserName(userName)
        // fetch the github API to check for the username and set the status likewise
        fetch(`https://api.github.com/users/${userName}`)
            .then(res => res.json())
            .then(result => {
                // The API returns a message only when there is a error and the user is not valid
                if (result && result.message) {
                    setStatus("User Invalid!")
                    setCanPlay(false)
                }
                else {
                    setStatus("User Valid!")
                    setCanPlay(true)
                }
            })
    }

    return (
        <div>
            <p>{playerName}</p>
            {/*Search user and display if the user is valid or not*/}
            <SearchUser searchUser={(searchedName) => {
                searchUser(searchedName)
            }}/>
            <div style={{ display: status !== "" ? "block" : "none" }}>{status}</div>
            {/*Button to finalize the search and will be shown only when a valid user is selected*/}
            <button style={{ display: canPlay ? "inline-block" : "none" }} onClick={() => {
                setIsPlayed(true)
            }} disabled={isPlayed} >Play!</button>
            {/*Show User Details when player finalizes his move and clicks on play*/}
            <UserDetails userName={userName} isPlayed={isPlayed} />
        </div>
    )
}

// Exported the created component
export default Player