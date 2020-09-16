// Imports
import React, { useEffect, useState } from 'react'
import SearchUser from './SearchUser'
import UserDetails from './UserDetails'

// Player Component
function Player(props) {
    // Player name is the player 1 or player 2
    const { playerName, setPlayerCommitCount, isReset, resetComplete } = props

    // useEffect Hook
    useEffect(() => {
        if (isReset) {
            setIsPlayed(false)
            setStatus("")
            setCanPlay(false)
        }
    }, [isReset])

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

    // function to set commitCount that was fetched from API
    function playerCommitCount(commitCount) {
        setPlayerCommitCount(commitCount)
    }

    return (
        <div>
            <p>{playerName}</p>
            {/*Search user and display if the user is valid or not*/}
            <SearchUser isPlayed={isPlayed} searchUser={(searchedName) => {
                searchUser(searchedName)
            }} isReset={isReset} resetComplete={resetComplete} />
            <div style={{ display: status !== "" ? "block" : "none" }}>{status}</div>
            {/*Button to finalize the search and will be shown only when a valid user is selected*/}
            <button style={{ display: canPlay ? "inline-block" : "none" }} onClick={() => {
                setIsPlayed(true)
            }} disabled={isPlayed} >Play!</button>
            {/*Show User Details when player finalizes his move and clicks on play*/}
            <UserDetails userName={userName} isPlayed={isPlayed} playerCommitCount={(commitCount) => {
                playerCommitCount(commitCount)
            }} />
        </div>
    )
}

// Exported the created component
export default Player