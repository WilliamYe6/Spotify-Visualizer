import React from 'react';
import './App.css';

const  HomePage =  () => {
    return (
        <div className="App">
        <header className="App-header">
            <p>
                You are not logged in to Spotify
            </p>
            <a
                className="App-link"
                href={"/auth/login"}
            >
                Login Here
            </a>
        </header>
    </div>
    );
}

export default HomePage;