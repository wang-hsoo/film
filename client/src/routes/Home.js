import { useEffect, useState } from "react";
import axios from "axios";
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import { Link } from "react-router-dom";
import Trailer from "../component/Trailer";
import style from "./Home.module.css";

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
                    <h2>Film</h2>
                    <Link to={'/Login'} className = {style.loginBtn}>Login</Link>
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

                    <div className={style.top_movie}>
                        <h3>현재 상영중인 영화</h3>
                        <div className={style.allBtn}>모두보기</div>
                        <div className={style.top_movie_group}>
                            <ul>
                            {moviesA?.map( (movies) => (

                                <li key = {movies.key} className = {style.top_movie_li}>
                                    <span className = {style.top_movie_li_title}>{movies.title}</span>
                                    <img src={movies.img}></img>
                                    <span className = {style.top_movie_li_percent}>{movies.percent}</span>
                                    <span  className = {style.top_movie_li_open}>{movies.open}</span>
                                    <span className = {style.top_movie_li_age}>{movies.age}</span>
                                    {/* 구성에 따라 순서 바꿔도 무관 */}
                                </li>

                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className={style.trailer}>
                        <h3>트레일러</h3>
                        <div className={style.trailer_group}>
                            {/* Trailer.js 파일로 가면됨 component 폴더 밑에 있음 */}
                            <Trailer movie = {movie.cgv} />
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