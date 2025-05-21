import { useState, useEffect } from 'react';
import './../App.css';
import FadeIn from 'react-fade-in';
import { Link } from 'react-router-dom';
const AdminDashboard = () => {

    return (
        <FadeIn>
            <h1>Admin Dashboard</h1>
            <div className='activeElection adminPanel'>
                <Link to="/create" className='voteButton activeButton adminBoard'>Add New Poll</Link>
                <Link to="/edit" className='voteButton activeButton adminBoard'>Edit Poll</Link>
            </div>
        </FadeIn>
    );
};

export default AdminDashboard;