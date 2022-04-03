
import axios from "axios";
import React, { useEffect, useState } from "react";

function Trailer(lotte) {
    let movieKey = [];
    const [trailer, setTrailer] = useState([]);

    lotte.movie?.map((movie) => {
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

    const callApi = async()=>{
        const response = await axios.get('http://localhost:5000/key');
  
        setTrailer(response.data.key);
  
      };
    
    
    useEffect(()=>{
        callApi();
      }, []);

    return(
        <div>
            <div>예고편</div>
            <div>
                <ul>
                    {trailer?.map( (trail) => {
                        <li>
                            <div>{trail}</div>
                        </li>
                        {console.log(trail)}
                    })}

                    
                    
                </ul>
            </div>
        </div>
    )
}

export default Trailer;

