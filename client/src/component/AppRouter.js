import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import axios from "axios";

import Home from "../routes/Home";
import Login from "../routes/Login";
import SignUp from "../routes/SignUp";
import MovieDetail from "../routes/MovieDetail";
import AllMovie from "../routes/AllMovie";
import { useState } from "react";
import { useEffect } from "react";

function AppRouter(){
  const [data, setData] = useState([]);

  const callApi = async()=>{
    const response = await axios.get('http://localhost:5000/');
    console.log("재실행")
    setData(response.data);


  };

  useEffect(() => {
    callApi();
  }, []);

    return(
      <Router basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element = {<Home data = {data} />} />
        <Route path="/Login" element = {<Login />} />
        <Route path="/SignUp" element = {<SignUp />} />
        <Route path="/film/:title/:company" element={<MovieDetail data = {data} />} />
        <Route path="/film/movies" element={<AllMovie data = {data} />}  />
      </Routes>
    </Router>
    )
}

export default AppRouter;