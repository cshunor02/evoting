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
    const [selectedIds, setSelectedIds] = useState([]);


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

    function castMultipleVotes(e) {
        e.preventDefault();
        fetch('http://127.0.0.1:8080/vote/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            poll_id: allData.id,
            candidate_ids: selectedIds,
          }),
        }).then((response) => {
            console.log(response)
            window.location.href = '/'
        });
      }

    return (
        <div className="App">
            <FadeIn>
                <h1>{defaultMessage}</h1>
 
                <h2>{Object.keys(data).length != 0 ? 'Candidates' : ''}</h2>
                <ul>
                {Object.keys(data).map((key) => (
                    <li key={key} className="candidate">
                    <h3>{data[key].name}</h3>
                    {allData.poll_type === 'single' ? (
                        <input
                        type="button"
                        className="voteButton"
                        value={"Vote to " + data[key].name}
                        onClick={(e) => {
                            castVote(e, data[key].id);
                        }}
                        />
                    ) : (
                        <label>
                        <input
                            type="checkbox"
                            value={data[key].id}
                            onChange={(e) => {
                                const id = e.target.value;
                                setSelectedIds((prev) =>
                                e.target.checked ? [...prev, id] : prev.filter((item) => item !== id)
                                );
                            }}
                        />
                        Select
                        </label>
                    )}
                    </li>
                ))}
                </ul>
                {allData.poll_type === 'multiple' && selectedIds.length > 0 && (
                <div style={{
                    position: 'fixed',
                    bottom: '20px',
                    left: '0',
                    right: '0',
                    display: 'flex',
                    justifyContent: 'center',
                    zIndex: 1000
                }}>
                    <input
                    type="button"
                    className="voteButton"
                    value="Submit Vote"
                    onClick={castMultipleVotes}
                    />
                </div>
                )}
            </FadeIn>  
        </div>
    );
};

export default Election;