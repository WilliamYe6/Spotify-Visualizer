import './App.css';
import React from 'react'

function App() {
  const url = "https://accounts.spotify.com/authorize?client_id=13c6a1850e5d4dd2814971fbac941087&response_type=code&redirect_uri=http://localhost:8888/callback&scope=user-top-read"
  return (
    
   <div>
    <a href={url}>Sign in</a>
   </div>
  );
}

export default App;
