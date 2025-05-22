import { useEffect, useState } from 'react';
import './../App.css';
import { RxDotFilled } from "react-icons/rx";
import { Link } from "react-router-dom";
import FadeIn from 'react-fade-in';

function Results() {
    const [data, setData] = useState({})

    useEffect(() => {
        fetch('http://127.0.0.1:8080/allpoll')
        .then(response => response.json()) 
        .then(data => {
            const object = {};
            data.forEach((item, index) => {
                object[(index + 1).toString()] = item
                })

            setData(() => object)
        })
        .catch(error => {
          console.error('Error:', error)
        })
      }, [])

    return (
        <FadeIn>
            <h1>Results</h1>
            <p>To check a poll's result, click on one of the following polls:</p>
            <div className='electionPanel'>
                {Object.keys(data).map(key => (
                    <div key={key} className='election'>
                        <h3>{data[key].title}</h3>
                        <p className={(new Date(data[key].end_date) - new Date()) >= 0 ? 'status active' : 'status passive'}><RxDotFilled className='dot' />{(new Date(data[key].end_date) - new Date()) >= 0 ? 'Active' : 'Inactive'}</p>
                        <Link to={{ pathname: `/result/${data[key].id}` }} className='voteButton activeButton'>Results</Link>
                    </div>
                ))}
            </div>
        </FadeIn>
    );
};

export default Results;