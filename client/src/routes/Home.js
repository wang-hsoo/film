import { useEffect, useState } from "react";

function Home(movie){

   
    
    

    return(
        <div>
            <h3>Film</h3>
            <div>
                {movie.movie.movie.cgv?.map( (movies) => (
                    <ul>
                        <li>{movies.title}</li>
                        <img src={movies.img} width="100px"></img>
                    </ul>
                ))}
            </div>
        </div>
    )

}

export default Home;