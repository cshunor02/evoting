import { Link } from 'react-router-dom';
import './../App.css';
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

const Results = () => {

    return (
        <FadeIn>
            <h1>Election Results</h1>
            <p>Choose an election to see the results!</p>
            <div className='electionPanel'>
                {Object.keys(defaultData).map(key => (
                    <div key={key} className='results'>
                        <h3>{defaultData[key].title}</h3>
                        <p className='resDesc'>{defaultData[key].description}</p>
                        <p className='resDeadline'>Deadline: {defaultData[key].end_time}</p>
                        <Link to={{ pathname: `/result/${defaultData[key].id}` }} className='voteButton activeButton resultsButton'>See results</Link>
                    </div>
                ))}
            </div>
        </FadeIn>
    );
};

export default Results;