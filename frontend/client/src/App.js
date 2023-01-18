import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';
import Load from './Load';
import PlaylistRecommender from './PlaylistRecommender';
import HomePage from './HomePage';


function App() {
  const [auth, setAuth] = useState(null);
  useEffect(() => {
    axios.get('/auth/current-session').then(({data}) => {
      setAuth(data);
    })
  }, []);
  
  if (auth == null) {
    return <Load/>
  }

  if (auth) {
    return <PlaylistRecommender auth = {auth}/>
  }
  return <HomePage/>
}

export default App;
