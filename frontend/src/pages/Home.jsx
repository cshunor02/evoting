import { useState, useEffect } from 'react';
import './../App.css'
import Layout from './Layout'
import { Link } from "react-router-dom";

const defaultData = {
    '0': {
        'id' : 0,
        'title' : 'Presidental Election 2024',
        'description' : 'BLABLA',
        'start_time' : '2012-04-23T18:25:43.511Z',
        'end_time' : '2025-05-05T18:25:43.511Z'
    },
    '1': {
        'id' : 1,
        'title' : 'Local Council Election',
        'description' : 'BLABLA',
        'start_time' : '2025-01-12',
        'end_time' : '2025-03-23'
    },
    '2': {
        'id' : 2,
        'title' : 'High School Kahoot',
        'description' : 'BLABLA',
        'start_time' : '2025-01-12',
        'end_time' : '2025-05-05'
    },
    '3': {
        'id' : 3,
        'title' : 'G0ogl3 F0rm5',
        'description' : 'BLABLA',
        'start_time' : '2025-01-12',
        'end_time' : '2025-05-05'
    }
}

function Home() {

    const [data, setData] = useState({})

    useEffect(() => {
        setData(() => defaultData)
      }, []);

  return (
    <div className='page'>
        <Layout />
        <h2>Available Elections</h2>
        <div className='electionPanel'>
            {Object.keys(defaultData).map(key => (
                <div key={key} className='election'>
                    <h3>{defaultData[key].title}</h3>
                    <p>{defaultData[key].description}</p>
                    <p className={(new Date(defaultData[key].end_time) - new Date()) >= 0 ? 'status active' : 'status passive   '}>{(new Date(defaultData[key].end_time) - new Date()) >= 0 ? 'Active' : 'Inactive'}</p>
                    <Link to={{ pathname: `/election/${defaultData[key].id}` }} className={(new Date(defaultData[key].end_time) - new Date()) >= 0 ? 'voteButton activeButton' : 'voteButton passiveButton'}>{(new Date(defaultData[key].end_time) - new Date()) >= 0 ? 'Vote now' : 'Not available'}</Link>
                </div>
            ))}
        </div>

        <div className='activeElection'>
            <h1 className='title'>Presidental Election 2024</h1>
            <hr />
            <p>Gotta move on</p>
        </div>
    </div>
  )
}

export default Home