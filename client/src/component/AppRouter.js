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

function AppRouter(){

    return(
      <Router basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element = {<Home />} />
        <Route path="/Login" element = {<Login />} />
        <Route path="/SignUp" element = {<SignUp />} />
        <Route path="/film/:title/:company" element={<MovieDetail />} />
        <Route path="/film/movies" element={<AllMovie />}  />
      </Routes>
    </Router>
    )
}

export default AppRouter;