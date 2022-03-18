import axios from "axios";
import React, { useEffect } from 'react';

function App() {
  const callApi = async()=>{
    const response = await axios.get('http://localhost:5000/');
    console.log(response);
  };

  useEffect(()=>{
    callApi();
  }, []);

  return (
    <div>
      <h3>film</h3>
    </div>
  );
}

export default App;
