import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './../App.css';
import FadeIn from 'react-fade-in';

function EditElection() {
    const { id } = useParams();

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchElectionData();
    }, []);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [start_date, setStartDate] = useState('');
    const [end_date, setEndDate] = useState('');
    const [pollType, setPollType] = useState('single');
    const [choices, setChoices] = useState('');
    const [anonymity, setAnonymity] = useState(true);

    const fetchElectionData = async () => {
        try {
            const response = await fetch(`http://localhost:8000/polls/${id}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();

            setTitle(data.title);
            setDescription(data.description);
            setStartDate(new Date(data.start_date).toISOString().slice(0, 16));
            setEndDate(new Date(data.end_date).toISOString().slice(0, 16));
            setPollType(data.poll_type);
            setChoices(data.options.join('\n'));
            setAnonymity(data.anonymity);
        } catch (error) {
            console.error("Error fetching election data:", error);
            alert("Failed to load election data.");
        }
    };

    function updatePoll(e) {
        e.preventDefault();
        if (title === '' || description === '' || start_date === '' || end_date === '' || choices === '') {
            alert('Please fill all the fields');
            return;
        }
        if (start_date > end_date) {
            alert('Start date cannot be after end date');
            return;
        }
        const choiceArray = choices.split('\n').filter(choice => choice.trim() !== '');
        if (choiceArray.length < 2) {
            alert('Please provide at least two non-empty choices');
            return;
        }

        fetch(`http://localhost:8000/polls/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: title,
                description: description,
                start_date: start_date,
                end_date: end_date,
                poll_type: pollType,
                anonymity: anonymity,
                options: choiceArray
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            alert('Election updated successfully!');
            console.log('Election updated:', data);
        })
        .catch(error => {
            console.error("Error updating election:", error);
            alert("Failed to update election. Please try again.");
        });
    }

    return (
        <div className="App">
            <FadeIn>
                <h1>Edit Poll / Election</h1>
                <div className='createField'>
                    <p>
                        Title:
                        <input type="text" onChange={(e) => setTitle(e.target.value)} value={title} />
                    </p>
                    <p>
                        Description:
                        <textarea name="desc" id='desc' cols="50" rows="2" onChange={(e) => setDescription(e.target.value)} value={description}></textarea>
                    </p>
                    <p>
                        Start date:
                        <input type="datetime-local" onChange={(e) => setStartDate(e.target.value)} onInput={(e) => setStartDate(e.target.value)} value={start_date} />
                    </p>
                    <p>
                        Deadline:
                        <input type="datetime-local" onChange={(e) => setEndDate(e.target.value)} onInput={(e) => setEndDate(e.target.value)} value={end_date} />
                    </p>
                    <hr />
                    <h3>Options</h3>
                    <div className='options'>
                        <h4>Poll type</h4>
                        <div className='optionBlock'>
                            <input type="radio" id="single" name="pollType" value="single" onChange={e => setPollType(e.target.value)} checked={pollType === 'single'} />
                            <label htmlFor="single">Singe selection poll</label><br />
                            <input type="radio" id="multiple" name="pollType" value="multiple" onChange={e => setPollType(e.target.value)} checked={pollType === 'multiple'} />
                            <label htmlFor="multiple">Multiple choice poll</label><br />
                        </div>
                    </div>
                    <div className='options'>
                        <h4>Possible choices</h4>
                        <div className='optionBlock'>
                            <p><i>Write each of the options in new line</i></p>
                            <textarea name="desc" cols="50" rows="2" onChange={(e) => setChoices(e.target.value)} value={choices}
                                placeholder='Option A
Option B
...'></textarea>
                        </div>
                    </div>
                    <p>
                        <input type="submit" value='Update poll' onClick={e => updatePoll(e)} />
                    </p>
                </div>
            </FadeIn>
        </div>
    );
}

export default EditElection;