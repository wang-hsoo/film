import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Movie from "./Movie";




function Home(){

    

    return (
        <div>
            <h2>Home</h2>
            <div><Link to = {"/Login"}>LogIn</Link></div>
            <h3>Movie</h3>
            <Movie />
        </div>
    );

};

export default Home;