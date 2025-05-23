import { useEffect, useState } from 'react';
import './../App.css'
import FadeIn from 'react-fade-in';
import { useParams } from 'react-router-dom';

function EditElection() {

    const params = useParams();
    const id = params.id;

    useEffect(()=>{
        window.scrollTo(0, 0);
    },[])

    function convertDate(date) {
        const datetime = new Date(date)
        const pad = (n) => n.toString().padStart(2, '0')

        const year = datetime.getFullYear()
        const month = pad(datetime.getMonth() + 1)
        const day = pad(datetime.getDate())
        const hour = pad(datetime.getHours())
        const minute = pad(datetime.getMinutes())

        return `${year}-${month}-${day}T${hour}:${minute}`
    }

    useEffect(() => {
        fetch('http://127.0.0.1:8080/getpoll/' + id)
        .then(response => response.json()) 
        .then(data => {
            if (data['error'] === 'Poll not found') {
                return
            } else {
                setTitle(() => data.title)
                setDescription(() => data.description)
                setStartDate(() => convertDate(data.start_date))
                setEndDate(() => convertDate(data.end_date))
                setPollType(() => data.poll_type)
                const options = []
                data.candidates.forEach((option) => {
                    options.push(option.name)
                })
                setChoices(() => options.join('\n'))
                setAnonymity(() => data.anonymity)
            }
        })
        .catch(error => {
          console.error('Error:', error)
        })
      }, [id])

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [start_date, setStartDate] = useState('')
    const [end_date, setEndDate] = useState('')
    const [pollType, setPollType] = useState('single')
    const [choices, setChoices] = useState('')
    const [anonymity, setAnonymity] = useState(true)

    function storeUpdatedPoll(e) {
        e.preventDefault()
        if (title == '' || start_date == '' || end_date == '' || choices == '') {
            console.log(title, start_date, end_date, choices)
            console.log(title == '', start_date == '', end_date == '', choices == '')
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

        fetch('http://127.0.0.1:8080/updatepoll/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: id,
                title: title,
                description: description,
                start_date: start_date,
                end_date: end_date,
                poll_type: pollType,
                anonymity: anonymity,
                options: choices.split('\n')
            })
        }).then((response) => {
            if (response.status === 403) {
                alert('This poll can no longer be edited because votes have already been cast.');
                window.location.href = '/';
                return;
            }
            if (!response.ok) {
                alert('Failed to update poll.');
                return;
            }
            return response.json();
        }).then(() => {
            window.location.href = '/';
        }).catch((error) => {
            console.error('Error:', error);
        });
    }

    return (
        <div className="App">
            <FadeIn>
                <h1>Edit selected Poll / Election</h1>
                <div className='createField'>
                    <p>
                        Title:
                        <input type="text" onChange={(e) => setTitle(e.target.value)} value={title} />
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
                    <p>
                        <input type="submit" value='Edit existing poll' onClick={e => storeUpdatedPoll(e)} />
                    </p>
                </div>
            </FadeIn>
        </div>
    );
};

export default EditElection;