import { useEffect, useState } from "react";

import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import { Link } from "react-router-dom";
import Trailer from "../component/Trailer";
import style from "./Home.module.css";
import next from "../img/next.png";
import prev from "../img/prev.png";
import closeBtn from "../img/close.png";
import logo from "../img/logo.png";
import plus from "../img/plus.png";


function Home(data){
    console.log(data);
    let moviesA = [];
    let moving = 0;
    let trailMoving = 0;
    const [trailerTitle, setTrailerTitle ] = useState("");
    const [move, setMove] = useState(0);
    const [trailmove, settrailMove] = useState(0);
    const [loading, setLoading] = useState(false);
    const [genre, setGenre] = useState(["드라마", "멜로/로맨스"]);
    const [checkLogin , setLogin] = useState(false);
    const slideImages  = [{
        url : "https://caching2.lottecinema.co.kr/lotte_image/2022/Hot/0323/Hot_1920774.jpg",
    }, 
    {
        url :"https://caching2.lottecinema.co.kr/lotte_image/2022/Movi/0323/Movi_1920774.jpg",
    } ,
    {
        url :"https://caching2.lottecinema.co.kr/lotte_image/2022/Ani/Ani_1920774.jpg",
    } ]
    
    

    const sliderNext = () => {
        let length = moviesA.length;
        const ulWidth = length * 19.5 - 100;
        if(move > -ulWidth){
            moving = move - 78;
            setMove(moving);
        } 

    }

    const sliderPrev = () => { 
        if(move === 0){

        }else if(move < 0){
            moving = move + 78;
            setMove(moving);
        }
        
    };

    const trailerNext = () => {
        let length = data.data.trailer.length;
        const ulWidth = length * 26 - 100;
        if(trailmove > -ulWidth){
            moving = trailmove - 78;
            settrailMove(moving);
        } 
    }

    const trailerPrev = () => {
        if(trailmove === 0){

        }else if(trailmove < 0){
            trailMoving = trailmove + 78;
            settrailMove(trailMoving);
        }

    }

    const filter = () => {
        data.data.cgv?.map( (cgv) => {
            data.data.lotte?.map( (lotte) => {
                if(cgv.title === lotte.title){
                    moviesA.push(cgv);
                }
            })
        })
    }

    const changeGenre = (event) => {
        const gen = event.target.innerText;

        if(gen === "드라마"){
            setGenre(["드라마", "멜로/로맨스"]);
        }else if(gen === "액션"){
            setGenre(["액션","범죄"]);
        }else if(gen ==="애니메이션"){
            setGenre(["애니메이션"]);
        }else if (gen === "공포(호러)"){
            setGenre(["공포(호러)","스릴러"]);
        }
    }

    const [Open, setlOpen] = useState("none");
    
    const close = () => {
        setlOpen("none");

        const video = document.getElementById("Video1");
        video.pause();
       
    }
    
    
  

    const trailerClick = (event) => {

        if(event.target.className === "Home_tailerImg__GTNWn"){
            setTrailerTitle(event.target.offsetParent.innerText);
            setlOpen("inline-block");
        }else if(event.target.className === "Home_playBtn__EKuPx"){
            setTrailerTitle(event.nativeEvent.path[2].innerText);
            setlOpen("inline-block");
        }
        

    }

    const logCheck = () => {
        const id = localStorage.getItem("id");

        if(id){
            setLogin(true);
        }
    }

    const onLog = (event) => {
        const id = localStorage.getItem("id");
        console.log(id);

        if( id){
            setLogin(false);
            localStorage.removeItem("id");
            event.preventDefault();
        }
    }

 

    function onTap(event, info) {
        console.log(info.point.x, info.point.y);
      }

  

  
    useEffect(()=>{
    
      console.log(data);    
      logCheck();
      return () => setLoading(true);
    }, [data]);

    filter();
    
   

    

    return(
        <div>
            {loading ? 
              <> 
                <header>
                    <img src={logo} className = {style.logo}></img>
                    <Link to={'/Login'} className = {style.loginBtn} onClick={onLog}>{checkLogin ? "LogOut" : "LogIn"}</Link>
                </header>
                <main>
                    <div className="slide-container">
                        <Slide>
                            {slideImages.map((slideImage, index)=> (
                                <div className="each-slide" key={index} style={{'width' : '100vw', 'height' : '774px'}}>
                                <div style={{'backgroundImage': `url(${slideImage.url})`,'height': '100%' , 'width' : '100%' , 'backgroundPosition' : 'center center' , 'margin' : '0 auto'}} />
                                </div>
                            ))} 
                        </Slide>
                    </div>

                    <div className={style.top_movie}>
                        <div className={style.top_movie_head}>
                            <a className={style.menu}>HOT</a>
                            <div className={style.top_movie_button}>
                                <Link to={'/film/movies'} className={style.allBtn}> <img src={plus} /> </Link>
                                <div onClick={sliderPrev} className={style.btn}> <img src={prev} /> </div>
                                <div onClick={sliderNext} className={style.btn}> <img src={next} /> </div>
                            </div>
                        </div>
                        <div id={style.top_movie_group} className={style.nonscroll}>
                            <ul className = {style.top_movie_ul} style = {{"margin-left": `${move}vw`}}>
                            {moviesA?.map( (movies) => (
                                <Link to={`/film/${movies.title}/${movies.company}`} >
                                    <li key = {movies.key} className = {style.top_movie_li}>
                                        <img src={movies.img}></img>
                                        <span className = {style.top_movie_li_title}>{movies.title}</span>
                                        <span className = {style.top_movie_li_open}>{movies.open}</span>
                                        <span className = {style.top_movie_li_percent}>{movies.percent}</span>
                                        <span className = {style.top_movie_li_age}>{movies.age}</span>
                                        {/* 구성에 따라 순서 바꿔도 무관 */}
                                    </li>
                                </Link>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className={style.trailer}>
                        <div className={style.top_movie_head}>
                            <h3 className={style.menu}>TRAILER</h3>

                            <div className={style.top_movie_button}>
                                <div onClick={trailerPrev} className={style.btn}> <img src={prev} /> </div>
                                <div onClick={trailerNext} className={style.btn}> <img src={next} /> </div>
                            </div>
                        </div>
                        <div className={style.trailer_group}>
                            {/* Trailer.js 파일로 가면됨 component 폴더 밑에 있음 */}
                            <div className={style.trailer_ul}  style = {{"margin-left": `${trailmove}vw`}} onClick={trailerClick}>
                                {data.data.trailer.map( (trailer) => (   
                                    <Trailer 
                                        id = {trailer.num}
                                        name = {trailer.name}
                                        key = {trailer.name}
                                        trailer = {trailer.mp4}
                                        img = {trailer.img}
                                    /> 
                                ))}
                            </div>
                        
                        </div>
                        <div className={style.mainTrailer} style={{"display": `${Open}`}}>
                            <div onClick={close} className={style.closeBtn}><img src={closeBtn} /> </div>
                            {data.data.trailer.map( (trailer) => (   
                                    trailerTitle === trailer.name ? 
                                    <div>
                                        <video autoPlay id="Video1">
                                            <source src={trailer.mp4}/>
                                        </video>
                                    </div>: null
                                    
                                ))}
                        </div>
                    </div>

                    <div className={style.genre}>
                        <div className={style.genreHeader}>
                            <h3 className={style.menu}>BY GENRE</h3>
                            <div className={style.genreBtns}>
                                <button onClick={changeGenre}>드라마</button>
                                <button onClick={changeGenre}>액션</button>
                                <button onClick={changeGenre}>애니메이션</button>
                                <button onClick={changeGenre}>공포(호러)</button>
                            </div>
                            
                            
                        </div>
                    
                        <div className={style.genreList}>
                            <ul>
                                
                                {data.data.lotte?.map( (lotte) => (
                                    <>
                                        {genre[0] === lotte.genre ||  genre[1] === lotte.genre? 
                                        <div className={style.genreMovies}>
                                            <Link to={`/film/${lotte.title}/${lotte.company}`} >
                                                <li>
                                                    <img src={lotte.img} />
                                                    <span className={style.genreTitle}>{lotte.title}</span>
                                                </li>
                                            </Link> 
                                        </div>: null
                                        }
                                    </>
                                ))}
                            </ul>
                        </div>
                    </div>
                </main>
         
                    
                </>:
                <div className={style.loading}>
                    Loading...
                </div>
        
            }
        
        </div>
    )

}

export default Home;