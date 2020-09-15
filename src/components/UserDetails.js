import React, { useState } from 'react'

function fetchImage(userName, setImageUrl) {
    fetch(`https://api.github.com/users/${userName}`)
        .then(res => res.json())
        .then(result => {
            setImageUrl(result.avatar_url)
        })
}

function fetchCommitCount(userName, setCommitCount) {
    fetch(`https://api.github.com/users/${userName}/repos`)
        .then(res => res.json())
        .then(result => {
            let repos = result.map((repo) => {
                return repo.name
            })
            let commitCount = 0
            for (let repo of repos) {
                fetch(`https://api.github.com/repos/${userName}/${repo}/commits`)
                    .then(res => res.json())
                    .then(result => {
                        setCommitCount(commitCount + result.length)
                        commitCount += result.length
                    })
            }
        })
}

function UserDetails(props) {
    const { userName, isPlayed } = props
    const [imageUrl, setImageUrl] = useState("")
    const [commitCount, setCommitCount] = useState(0)

    if (isPlayed) {
        fetchImage(userName, setImageUrl)
        fetchCommitCount(userName, setCommitCount)
        return (
            <div>
                <div>
                    <img src={imageUrl} />
                </div>
                <div>{userName}</div>
                <div>{commitCount}</div>
            </div>
        )
    }
    else {
        return <div></div>
    }
}

export default UserDetails