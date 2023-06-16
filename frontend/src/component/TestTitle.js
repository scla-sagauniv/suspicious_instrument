import "../css/test.css";
import axios from 'axios';
import { useState, useEffect } from 'react';

function TestTitle () {

  const [data, setData] = useState([])

  useEffect(()=> {
    axios.get('/api').then(res => setData(res.data));
  }, []);


    return data.map((x, index) => {
    return (
      <div>
        <h1>
          チャットGPTを用いたタスク管理アプリケーション
        </h1>
        <p key={index}>
          {x.id} {x.name} {x.age}
        </p>
      </div>)
  });
};

export default TestTitle;
