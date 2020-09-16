// Imports
import React, { useState } from 'react'

// UserDetails Component
function UserDetails(props) {
    // userName for API calls and isPlayed to show anything or not
    const { userName, isPlayed } = props

    // useState Hooks
    const [imageUrl, setImageUrl] = useState("")
    const [commitCount, setCommitCount] = useState(0)

    // API call to fetch and set the avatar url to the imageUrl state
    function fetchImage() {
        fetch(`https://api.github.com/users/${userName}`)
            .then(res => res.json())
            .then(result => {
                setImageUrl(result.avatar_url)
            })
    }

    // API call to fetch and set the commit count to the commitCount state
    function fetchCommitCount() {
        // Get a list of repos the user has so as to iterate over each repo to get the commit in them
        fetch(`https://api.github.com/users/${userName}/repos`)
            .then(res => res.json())
            .then(result => {
                // We only need the repo name and no other details from this API call
                // Map them to a new array with just the name
                let repos = result.map((repo) => {
                    return repo.name
                })
                // Initialize the count
                let commitCount = 0
                for (let repo of repos) {
                    // API call to get the commit counts on each repository by the user.
                    // Need to correct some logic and find a way to handle the errors as well.
                    fetch(`https://api.github.com/repos/${userName}/${repo}/commits`)
                        .then(res => res.json())
                        .then(result => {
                            setCommitCount(commitCount + result.length)
                            commitCount += result.length
                        })
                }
            })
    }

    // Show user details only if the user has been finalized else return a blank div
    if (isPlayed) {
        // function calls to set the state when the user plays
        fetchImage()
        fetchCommitCount()
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

// Export the created Component
export default UserDetails