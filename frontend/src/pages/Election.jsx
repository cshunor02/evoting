import { useEffect, useState } from 'react';
import './../App.css'
import { useParams } from 'react-router-dom';

function Election() {
    const params = useParams();
    const id = params.id;
    const [checkId, updateID] = useState(id)
    const [defaultMessage, changeMessage] = useState('HELO')

    useEffect(() => {
        if (id != undefined)
        {
            changeMessage(e => 'This is election ID: ' + id)
            console.log(id)
        }
      }, [id]);

    return (
        <div className="App">
            <h1>Election Page</h1>
            <p>Welcome to the election page.</p>
            <p>{defaultMessage}</p>
        </div>
    );
};

export default Election;