import { useEffect, useState } from 'react';
import './../App.css';
import { RxDotFilled } from "react-icons/rx";
import { Link } from "react-router-dom";
import FadeIn from 'react-fade-in';
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

function Elections() {
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

    function deletePoll(e, id) {
        e.preventDefault()
        console.log(data)
        fetch('http://localhost:8080/deletepoll/', {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: id,
            })
        }).then((response) => {
            window.location.href = '/'
        })
    }

    return (
        <FadeIn>
            <h1>Available Elections</h1>
            <div className='electionPanel'>
                {Object.keys(data).map(key => (
                    <div key={key} className='election'>
                        <h3>{data[key].title}</h3>
                        <p className={(new Date(data[key].end_date) - new Date()) >= 0 ? 'status active' : 'status passive'}><RxDotFilled className='dot' />{(new Date(data[key].end_date) - new Date()) >= 0 ? 'Active' : 'Inactive'}</p>
                        <Link to={{ pathname: `/election/${data[key].id}` }} className={(new Date(data[key].end_date) - new Date()) >= 0 ? 'voteButton activeButton' : 'voteButton passiveButton'}>{(new Date(data[key].end_date) - new Date()) >= 0 ? 'Vote now' : 'Not available'}</Link>
                        {!data[key].has_votes && (
                            <Link to={{ pathname: `/editpoll/${data[key].id}` }} className='activeButton editButton'>
                                <FaEdit />
                            </Link>
                        )}
                        <Link to={{}} onClick={(e) => deletePoll(e, data[key].id)} className='activeButton deleteButton'><MdDeleteForever /></Link>
                    </div>
                ))}
            </div>
        </FadeIn>
    );
};

export default Elections;