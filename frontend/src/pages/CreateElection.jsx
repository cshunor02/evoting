import { useEffect, useState } from 'react';
import './../App.css'
import FadeIn from 'react-fade-in';

function CreateElection() {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [start_date, setStartDate] = useState('')
    const [end_date, setEndDate] = useState('')
    const [pollType, setPollType] = useState('single')
    const [choices, setChoices] = useState('')
    const [anonymity, setAnonymity] = useState(true)

    function setAnonym(e) {
        e == 'yes' ? setAnonymity(true) : setAnonymity(false)
    }

    function storeNewPoll(e) {
        e.preventDefault()
        if (title == '' || description == '' || start_date == '' || end_date == '' || choices == '') {
            console.log(title, description, start_date, end_date, choices)
            console.log(title == '', description == '', start_date == '', end_date == '', choices == '')
            alert('Please fill all the fields')
            return
        }
        if (start_date > end_date) {
            alert('Start date cannot be after end date')
            return
        }
        if (choices.split('\n').length < 2) {
            alert('Please provide at least two choices')
            return
        }
        choices.split('\n').forEach((choice) => {
            if (choice == '') {
                alert('Empty choice is not allowed')
                return
            }
        })

        /*
        fetch('http://localhost:8000/polls/', {
            method: 'POST',
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
                options: choices.split('\n')
            })
        })
        */
       console.log(JSON.stringify({
            title: title,
            description: description,
            start_date: start_date,
            end_date: end_date,
            poll_type: pollType,
            anonymity: anonymity,
            options: choices.split('\n')
        }))
    }

    return (
        <div className="App">
            <FadeIn>
                <h1>Create a new Poll / Election</h1>
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
                        <input type="datetime-local" onChange={(e) => setEndDate(e.target.value)} onInput={(e) => setEndDate(e.target.value)}     value={end_date} />
                    </p>
                    <hr />
                    <h3>Options</h3>
                    <div className='options'>
                        <h4>Poll type</h4>
                            <div className='optionBlock'>
                                <input type="radio" id="single" name="pollType" value="single" onChange={e => setPollType(e.target.value)} defaultChecked={pollType == 'single'} />
                                <label htmlFor="single">Singe selection poll</label><br />
                                <input type="radio" id="multiple" name="pollType" value="multiple" onChange={e => setPollType(e.target.value)} defaultChecked={pollType == 'multiple'}/>
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
                    <div className='options'>
                        <h4>Anonymity</h4>
                            <div className='optionBlock'>
                                <p>Does anonymity required?</p>
                                <input type="radio" id="no" name="anonymity" value="yes" onChange={e => setAnonym(e.target.value)} defaultChecked={anonymity == true}/>
                                <label htmlFor="no">Yes, no names are collected</label><br />
                                <input type="radio" id="yes" name="anonymity" value="no" onChange={e => setAnonym(e.target.value)} defaultChecked={anonymity == false}/>
                                <label htmlFor="yes">No, collect names</label><br />
                            </div>
                    </div>
                    <p>
                        <input type="submit" value='Create new poll' onClick={e => storeNewPoll(e)} />
                    </p>
                </div>
            </FadeIn>
        </div>
    );
};

export default CreateElection;