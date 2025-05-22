import { useEffect, useState } from 'react';
import './../App.css'
import { useParams } from 'react-router-dom';
import FadeIn from 'react-fade-in';

function Election() {
    const params = useParams();
    const id = params.id;
    const [defaultMessage, changeMessage] = useState('This poll does not exist or has ended.')
    const [data, setData] = useState({})
    const [allData, setAllData] = useState({})

    useEffect(() => {
        fetch('http://127.0.0.1:8080/getpoll/' + id)
        .then(response => response.json()) 
        .then(data => {
            if (data['error'] === 'Poll not found') {
                return
            } else {
                changeMessage(() => data.title)
                setData(() => data['candidates'])
                setAllData(() => data)
            }
        })
        .catch(error => {
          console.error('Error:', error)
        })
      }, [id])

    function castVote(e, id) {
        e.preventDefault()
        fetch('http://127.0.0.1:8080/vote/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                poll_id: allData.id,
                candidate_id: id,
            })
        }).then((response) => {
            console.log(response)
            window.location.href = '/'
        })
        
    }

    return (
        <div className="App">
            <FadeIn>
                <h1>{defaultMessage}</h1>
 
                <h2>{Object.keys(data).length != 0 ? 'Candidates' : ''}</h2>
                <ul>
                    {Object.keys(data).map(key => (
                        <li key={key} className='candidate'>
                            <h3>{data[key].name}</h3>
                            <input type="button" className='voteButton' value={"Vote to " + data[key].name} onClick={(e) => {castVote(e, data[key].id)}} />
                        </li>
                    ))}
                </ul>
            </FadeIn>  
        </div>
    );
};

export default Election;