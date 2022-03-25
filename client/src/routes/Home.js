import { useEffect, useState } from "react";
import axios from "axios";
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'

function Home(){
    const [movie, setMovie] = useState([]);
    const [loading, setLoading] = useState(false);
    const slideImages  = [{
        url : "https://caching2.lottecinema.co.kr/lotte_image/2022/Hot/0323/Hot_1920774.jpg",
        caption:'Slide 1'
    }, 
    {
        url :"https://caching2.lottecinema.co.kr/lotte_image/2022/Movi/0323/Movi_1920774.jpg",
        caption:'Slide 2'
    } ,
    {
        url :"https://caching2.lottecinema.co.kr/lotte_image/2022/Super/Super_1920774.jpg",
        caption:'Slide 3'
    } ]
    
    const callApi = async()=>{
      const response = await axios.get('http://localhost:5000/');

      setMovie(response.data);

      if(movie){
          console.log(response.data);
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
                  <>    
                     <div className="slide-container">
                        <Slide>
                            {slideImages.map((slideImage, index)=> (
                                <div className="each-slide" key={index}>
                                <div style={{'backgroundImage': `url(${slideImage.url})`, 'height': '82vh'}}>
                                    <span>{slideImage.caption}</span>
                                </div>
                                </div>
                            ))} 
                        </Slide>
                    </div>

                        <ul>
                        {movie.cgv?.map( (movies) => (
                            
                                <li key = {movies.key} style={{display: "inline-block"}}>
                                    <span>{movies.title}</span>
                                    <img src={movies.img} width="100px"></img>
                                    <div>{movies.key}</div>
                                </li>
                            
                        ))}
                        
                        {movie.lotte?.map( (movies) => (
                            
                            <li key = {movies.key} style={{display: "inline-block"}}>
                                <span>{movies.title}</span>
                                <img src={movies.img} width="100px"></img>
                                <div>{movies.key}</div>
                            </li>
                        
                        ))}
                        </ul> 
                    </>:
                    <div>
                        Loading...
                    </div>

                }
            
            </div>
        </div>
    )

}

export default Home;