import axios from "axios";
import  AppRouter  from "./component/AppRouter";
import React, { useEffect, useState } from 'react';


function App() {
  const [movie, setMovie] = useState([]);
  const callApi = async()=>{
    const response = await axios.get('http://localhost:5000/');
    setMovie(response.data);

  };

  useEffect(()=>{
    callApi();
  }, []);

  return (
    <div>
      <AppRouter movie = {movie} />
    </div>
  );
}

export default App;
