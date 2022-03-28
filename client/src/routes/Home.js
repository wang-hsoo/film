import { useEffect, useState } from "react";
import axios from "axios";
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import { Link } from "react-router-dom";

function Home(){
    let moviesA = [];
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
          setLoading(true);
      }
    };

    const filter = () => {
        movie.cgv?.map( (cgv) => {
            movie.lotte?.map( (lotte) => {
                if(cgv.title === lotte.title){
                    moviesA.push(cgv);
                }
            })
        })

        console.log(movie.cgv);
        

    }

  
    useEffect(()=>{
      callApi();
    }, []);

    filter();
    
   

    

    return(
        <div>
            {loading ? 
              <> 
                <header>
                    <h2 style ={{'color' : '#f5c510'}}>Film</h2>
                    <Link to={'/Login'}>Login</Link>
                </header>
                <main>
                    <div className="slide-container">
                        <Slide>
                            {slideImages.map((slideImage, index)=> (
                                <div className="each-slide" key={index}>
                                <div style={{'backgroundImage': `url(${slideImage.url})`,'height': '774px'}} />
                                </div>
                            ))} 
                        </Slide>
                    </div>

                    <div>
                        <h3>현재 상영중인 영화</h3>
                        <div>
                            <ul>
                            {moviesA?.map( (movies) => (

                                <li key = {movies.key} style={{display: "inline-block"}}>
                                    <span>{movies.title}</span>
                                    <img src={movies.img} width="100px"></img>
                                    <span>{movies.percent}</span>
                                    <span>{movies.open}</span>
                                    <span>{movies.age}</span>
                                </li>

                                ))}
                            </ul>
                        </div>
                    </div>
                </main>
         
                    
                </>:
                <div>
                    Loading...
                </div>
        
            }
        
        </div>
    )

}

export default Home;