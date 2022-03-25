import { useEffect, useState } from "react";
import axios from "axios";

function Home(){
    const [movie, setMovie] = useState([]);
    const [loading, setLoading] = useState(false);
    const callApi = async()=>{
      const response = await axios.get('http://localhost:5000/');
      setMovie(response.data);

      if(movie){
          setLoading(true);
      }
      
    };
  
    useEffect(()=>{
      callApi();
    }, []);
   
    
    

    return(
        <div>
            <h3>Film</h3>
            <div>
                {loading ? 
                    <ul>
                    {movie.cgv?.map( (movies) => (
                        
                            <li style={{display: "inline-block"}}>
                                <span>{movies.title}</span>
                                <img src={movies.img} width="100px"></img>
                            </li>
                        
                    ))}
                    
                    {movie.lotte?.map( (movies) => (
                        
                        <li style={{display: "inline-block"}}>
                            <span>{movies.title}</span>
                            <img src={movies.img} width="100px"></img>
                        </li>
                    
                    ))}
                    </ul> :
                    <div>
                        Loading...
                    </div>

                }
            
            </div>
        </div>
    )

}

export default Home;