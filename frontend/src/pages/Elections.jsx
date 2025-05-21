import { useEffect, useState } from 'react';
import './../App.css';
import { RxDotFilled } from "react-icons/rx";
import { Link } from "react-router-dom";
import FadeIn from 'react-fade-in';

const defaultData = {
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