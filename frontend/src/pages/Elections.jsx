import { useEffect, useState } from 'react';
import './../App.css';
import { RxDotFilled } from "react-icons/rx";
import { Link } from "react-router-dom";
import FadeIn from 'react-fade-in';

const defaultData = {
    '0': {
        'id' : 0,
        'title' : 'Presidental Election 2024',
        'description' : 'This is a description field, where if the description is too long, it overflows.',
        'start_time' : '2012-04-23T18:25:43.511Z',
        'end_time' : '2025-05-05T18:25:43.511Z'
    },
    '1': {
        'id' : 1,
        'title' : 'Local Council Election',
        'description' : 'This is a description field, where if the description is too long, it overflows. The maximum line numbers should be only 2 lines.',
        'start_time' : '2025-01-12',
        'end_time' : '2025-03-23'
    },
    '2': {
        'id' : 2,
        'title' : 'High School Kahoot',
        'description' : 'This is a description field, where if the description is too long, it overflows.',
        'start_time' : '2025-01-12',
        'end_time' : '2025-05-05'
    },
    '3': {
        'id' : 3,
        'title' : 'G0ogl3 F0rm5',
        'description' : 'This is a description field, where if the description is too long, it overflows.',
        'start_time' : '2025-01-12',
        'end_time' : '2025-05-05'
    }
}

function Elections() {
    const [data, setData] = useState({})

    useEffect(() => {
        setData(() => defaultData)
      }, []);

    return (
        <FadeIn>
            <h1>Available Elections</h1>
            <div className='electionPanel'>
                {Object.keys(defaultData).map(key => (
                    <div key={key} className='election'>
                        <h3>{defaultData[key].title}</h3>
                        <p className='pDesc'>{defaultData[key].description}</p>
                        <p className={(new Date(defaultData[key].end_time) - new Date()) >= 0 ? 'status active' : 'status passive'}><RxDotFilled className='dot' />{(new Date(defaultData[key].end_time) - new Date()) >= 0 ? 'Active' : 'Inactive'}</p>
                        <Link to={{ pathname: `/election/${defaultData[key].id}` }} className={(new Date(defaultData[key].end_time) - new Date()) >= 0 ? 'voteButton activeButton' : 'voteButton passiveButton'}>{(new Date(defaultData[key].end_time) - new Date()) >= 0 ? 'Vote now' : 'Not available'}</Link>
                    </div>
                ))}
            </div>
        </FadeIn>
    );
};

export default Elections;