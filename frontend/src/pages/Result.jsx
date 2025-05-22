import { useState, useEffect } from 'react';
import './../App.css';
import FadeIn from 'react-fade-in';

const defaultData = {
    '0': { id: 0, value: 10, label: 'A' },
    '1': { id: 1, value: 10, label: 'B' },
    '2': { id: 3, value: 20, label: 'C' },
}

const Result = () => {

    return (
        <FadeIn>
            <h1>Election Results</h1>
            <div className='activeElection'>
                {Object.keys(defaultData).map(key => (
                    <>
                        <p>Option {defaultData[key].label} | 
                        Votes: {defaultData[key].value}</p>
                    </>
                ))}
                <hr className='resultsDivider' />
            </div>
        </FadeIn>
    );
};

export default Result;