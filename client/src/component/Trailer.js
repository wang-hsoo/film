
import React, { useEffect } from "react";

function Trailer(cgv) {
    let movieKey = [];

    cgv.movie?.map((movie) => {
            movieKey.push(movie.key)
    })
  
    const post = () => {
        fetch("http://localhost:5000/key",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(movieKey)
        })
    };

    useEffect(() => {
        post();
    },[])
    
    

    return(
        <div>
            <div>예고편</div>
        </div>
    )
}

export default Trailer;

