import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import BoxOfficeRank from "./BoxofficeRank";



function Home(){

    

    return (
        <div>
            <h2>Home</h2>
            <div><Link to = {"/Login"}>LogIn</Link></div>
            <h3>End Movie</h3>
            <div>
                <BoxOfficeRank />
            </div>
        </div>
    );

};

export default Home;