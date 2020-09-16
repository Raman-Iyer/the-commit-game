// Imports
import React, { useState, useEffect } from 'react'

// UserDetails Component
function UserDetails(props) {
    // userName for API calls and isPlayed to show anything or not
    const { userName, isPlayed } = props

    // useState Hooks
    const [imageUrl, setImageUrl] = useState("")
    const [commitCount, setCommitCount] = useState(0)

    // useEffect Hook
    useEffect(() => {
        // function calls to set the state when the user plays
        if (isPlayed) {
            fetchImage()
            fetchCommitCount()
        }
    }, [isPlayed])

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
        // Initialize the count
        let commitCount = 0
        // Get a list of repos the user has so as to iterate over each repo to get the commit in them
        fetch(`https://api.github.com/users/${userName}/repos?per_page=100`)
            .then(res => res.json())
            .then(result => {
                // We only need the repo name and no other details from this API call
                // Map them to a new array with just the name
                const repoCount = result.length
                let isLastItem = false
                result.map((repo, i) => {
                    if (i === repoCount - 1) {
                        isLastItem = true
                    }
                    // API call to get the commit counts on each repository by the user.
                    // Need to correct some logic and find a way to handle the errors as well.
                    fetch(`https://api.github.com/repos/${userName}/${repo.name}/stats/participation`)
                        .then(res => res.json())
                        .then(result => {
                            let count = 0
                            if (result && result.owner && result.owner.length > 0) {
                                count = result.owner.reduce((a, b) => {
                                    return a + b
                                }, 0)
                            }
                            commitCount += count
                            if (isLastItem)
                                setCommitCount(commitCount)
                        })
                    return repo.name
                })
            })
    }

    // Show user details only if the user has been finalized else return a blank div
    if (isPlayed) {
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