import React, { useState } from 'react'
import SearchUser from './SearchUser'
import UserDetails from './UserDetails'

function playTurn() {
    
}

function Player(props) {
    const { playerName } = props
    const [userName, setUserName] = useState("")
    const [status, setStatus] = useState("")
    const [canPlay, setCanPlay] = useState(false)
    const [isPlayed, setIsPlayed] = useState(false)

    return (
        <div>
            <p>{playerName}</p>
            <SearchUser searchUser={(searchedName) => {
                setUserName(searchedName)
                fetch(`https://api.github.com/users/${searchedName}`)
                    .then(res => res.json())
                    .then(result => {
                        if (result && result.message) {
                            setStatus("User Invalid!")
                            setCanPlay(false)
                        }
                        else {
                            setStatus("User Valid!")
                            setCanPlay(true)
                        }
                    })
            }} playTurn={playTurn} />
            <div style={{ display: status !== "" ? "block" : "none" }}>{status}</div>
            
            <button style={{ display: canPlay ? "inline-block" : "none" }} onClick={() => {
                playTurn()
                setIsPlayed(true)
            }} disabled={isPlayed} >Play!</button>
            <UserDetails userName={userName} isPlayed={isPlayed} />
        </div>
    )
}

export default Player