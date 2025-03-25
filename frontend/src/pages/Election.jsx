import { useEffect, useState } from 'react';
import './../App.css'
import { useParams } from 'react-router-dom';
import FadeIn from 'react-fade-in';

function Election() {
    const params = useParams();
    const id = params.id;
    const [defaultMessage, changeMessage] = useState('HELO')

    useEffect(() => {
        if (id != undefined)
        {
            changeMessage(e => 'This is election ID: ' + id)
        }
      }, [id]);

    return (
        <div className="App">
            <FadeIn>
                <h1>Election Page</h1>
                <p>Welcome to the election page.</p>
                <p>{defaultMessage}</p>
            </FadeIn>
        </div>
    );
};

export default Election;