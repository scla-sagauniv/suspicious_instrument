import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';

function App() {

  const [people, setPeople] = useState([])
  
  useEffect(()=> {
    axios.get('/api').then(res => setPeople(res.data));
  }, []);
  
  return people.map((p, index) => {
    return (<div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p key={index}>
          {p.id} {p.name} {p.age}
        </p>
      </header>
    </div>)
  });
}

export default App;