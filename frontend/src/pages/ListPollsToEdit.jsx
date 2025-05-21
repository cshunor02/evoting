import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import FadeIn from 'react-fade-in';
import './../App.css'; // Assuming App.css has styles for your list

function ListPollsToEdit() {
    const [polls, setPolls] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchPolls();
    }, []);

    const fetchPolls = async () => {
        try {
            setLoading(true);
            setError(null);
            // FETCHING
            const response = await fetch('http://localhost:8000/polls/');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setPolls(data);
        } catch (err) {
            console.error("Error fetching polls:", err);
            setError("Failed to load polls. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="App">
                <FadeIn>
                    <h1>Loading Polls...</h1>
                </FadeIn>
            </div>
        );
    }

    if (error) {
        return (
            <div className="App">
                <FadeIn>
                    <h1>Error: {error}</h1>
                    <button onClick={fetchPolls}>Retry Loading Polls</button>
                </FadeIn>
            </div>
        );
    }

    if (polls.length === 0) {
        return (
            <div className="App">
                <FadeIn>
                    <h1>No Polls Available for Editing</h1>
                    <p>It looks like there are no polls created yet.</p>
                    <Link to="/create-election" className="voteButton activeButton">Create New Poll</Link>
                </FadeIn>
            </div>
        );
    }

    return (
        <div className="App">
            <FadeIn>
                <h1>Select a Poll to Edit</h1>
                <div className="polls-list">
                    {polls.map(poll => (
                        <div key={poll.id} className="poll-item">
                            <h3>{poll.title}</h3>
                            <p>{poll.description}</p>
                            <p>Starts: {new Date(poll.start_date).toLocaleString()}</p>
                            <p>Ends: {new Date(poll.end_date).toLocaleString()}</p>
                            <Link to={`/edit-election/${poll.id}`} className="voteButton">Edit this Poll</Link>
                        </div>
                    ))}
                </div>
            </FadeIn>
        </div>
    );
}

export default ListPollsToEdit;