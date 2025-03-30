import { useEffect, useState } from 'react';
import './../App.css'
import { useParams } from 'react-router-dom';
import FadeIn from 'react-fade-in';
import useCandidates from '../hooks/useCandidates';

function Election() {
    const params = useParams();
    const id = params.id;
    const [defaultMessage, changeMessage] = useState('HELO')
    const { 
        candidates, 
        fetchCandidates,
      } = useCandidates();

    useEffect(() => {
        fetchCandidates();

        if (id != undefined)
        {
            changeMessage(e => 'This is election ID: ' + id)
        }
      }, [id,  fetchCandidates]);

    return (
        <div className="App">
            <FadeIn>
                <h1>Election Page</h1>
                <p>Welcome to the election page.</p>
                <p>{defaultMessage}</p>
 
                <h2>Candidates</h2>
                <ul>
                    {candidates.map(candidate => (
                    <li key={candidate.id}>
                        {candidate.name}
                    </li>
                    ))}
                </ul>
            </FadeIn>  
        </div>
    );
};

export default Election;