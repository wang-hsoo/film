import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import style from "./Home.module.css";
import style2 from "./MovieDetail.module.css";
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import noImg from "../img/no_img.png";


function MovieDetail(){
    const [loading, setLoading] = useState(false);
    const {title} = useParams();
    const {company} = useParams();
    const [detail, getDetail] = useState([]);
    let movieD = [];
    let imgD = [];
    const [poster, setPosetr] = useState();
    const [age10, setAge10] = useState("");
    const [age20, setAge20] = useState("");
    const [age30, setAge30] = useState("");
    const [age40, setAge40] = useState("");

    const callApi = async()=>{
        const response = await axios.get('http://localhost:5000/');
        
        movieD = response.data.lotteMovieDetail;
        imgD = response.data.lotte;

        sel();

       
        if(movieD){
            setLoading(true);
        }
      };

     

      const sel = () => {
        
        if(company === "LOTTE"){
            for(let i = 0; i < movieD.length; i++){
                if(title === movieD[i].title){
                    getDetail(movieD[i]);
                    
                    if(i > 3){
                        setPosetr(imgD[i+1].img);
                        
                    }else{
                        setPosetr(imgD[i].img);
                        
                    }
                        
                    
                    
                    
                }
            }
        }else if(company === "CGV"){

        }
      }

      const favorite = () => {
          console.log(detail);
            const age10 = parseFloat(detail.AgePrefer10);
            const age20 = parseFloat(detail.AgePrefer20);
            const age30 = parseFloat(detail.AgePrefer30);
            const age40 = parseFloat(detail.AgePrefer40);
            
            const age = [age10, age20, age30, age40];

            let max = age[0];

            for (let i = 0; i < age.length; i++){
                if(max < age[i])
                    max = age[i];
            }

            if( detail.AgePrefer10 == max){
                setAge10("#ffd600");
            } else if( detail.AgePrefer20 == max){
                setAge20("#ffd600");
            } else if( detail.AgePrefer30 == max){
                setAge30("#ffd600");
            } else if( detail.AgePrefer40 == max){
                setAge40("#ffd600");
            }
            
        
      }

      useEffect( () => {
        favorite();
      }, window.onload);
      
    
    useEffect(()=>{
        callApi();
      }, []);
      

    return(
        <div>
            {loading ? 
              <> 
                <header>
                    <h2><Link to={'/'}>Film</Link></h2>
                </header>
                <main>
                    <div className={style2.detail}>
                        <div className={style2.detailPoster}><img src={poster} /></div>
                        <div className={style2.detailTitle}>{detail.title}</div>
                        <div className={style2.detailContent}>
                            <div className={style2.detailAge}>{detail.age === 0 ? "전체연령대" : detail.age}</div>
                            <div className={style2.detailGenre}>
                                <div className={style2.detailGenreTitle}>장르 : </div> 
                                <div className={style2.detailGenre}>{detail.genre1}</div>
                                <div className={style2.detailGenre}>{detail.genre2}</div>
                            </div>
                            
                            <div className={style2.viewRate}>평점 : {detail.viewRate}</div>
                            <div className={style2.viewEvalu}>예매율 : {detail.viewEvalu}</div>
                            <div className={style2.playTime}>{detail.playTime}분</div>
                            {console.log(detail.synops)}
                        </div>
                        <div>
                            <div>{detail.synops.replace(/(<br>|<br\/>|<br \/>)/g,   `\r\n`)}</div>
                        </div>
                        <div className={style2.movieCasting}>
                            <div className={style2.movieMan}>감독: {detail.name[0] }</div>
                            <div className={style2.castingImg}><img src = {detail.image[0] === "/LCHS/Image/Thum/movie_no_casting.jpg" ? noImg : detail.image[0]} /></div>
                            <div className={style2.movieMan}>출연: {detail.name[1]}</div>
                            <div className={style2.castingImg}><img src = {detail.image[1] === "/LCHS/Image/Thum/movie_no_casting.jpg" ? noImg : detail.image[1]} /></div>
                            <div className={style2.movieMan}>출연: {detail.name[2]}</div>
                            <div className={style2.castingImg}><img src = {detail.image[2] === "/LCHS/Image/Thum/movie_no_casting.jpg" ? noImg : detail.image[2]} /></div>
                            <div className={style2.movieMan}>출연: {detail.name[3]}</div>
                            <div className={style2.castingImg}><img src = {detail.image[3] === "/LCHS/Image/Thum/movie_no_casting.jpg" ? noImg : detail.image[3]} /></div>
                        </div>
                        <div className={style2.movieFavorite}>
                            <div className={style2.favoriteTitle}>연령별 선호도</div>
                            <div className={style2.favoriteBox}>
                                <div className={style2.favoriteSet}>
                                    <div className={style2.favoriteAge}>10대</div>
                                    <div className={style2.favoriteBar} style = {{"width" : `${detail.AgePrefer10}%` ,"background":`${age10}`}}></div>
                                    <div className={style2.favoritePercent}>{detail.AgePrefer10}%</div>
                                </div>
                                <div className={style2.favoriteSet}>
                                    <div className={style2.favoriteAge}>20대</div>
                                    <div className={style2.favoriteBar} style = {{"width" : `${detail.AgePrefer20}%`, "background":`${age20}`}}></div>
                                    <div className={style2.favoritePercent}>{detail.AgePrefer20}%</div>
                                </div>
                                <div className={style2.favoriteSet}>
                                    <div className={style2.favoriteAge}>30대</div>
                                    <div className={style2.favoriteBar} style = {{"width" : `${detail.AgePrefer30}%`, "background":`${age30}`}}></div>
                                    <div className={style2.favoritePercent}>{detail.AgePrefer30}%</div>
                                </div>
                                <div className={style2.favoriteSet}>
                                    <div className={style2.favoriteAge}>40대</div>
                                    <div className={style2.favoriteBar} style = {{"width" : `${detail.AgePrefer40}%`, "background":`${age40}`}}></div>
                                    <div className={style2.favoritePercent}>{detail.AgePrefer40}%</div>
                                </div>
                                
                            </div>
                        </div>
                        <div className="slide-container">
                            <Slide>
                                {detail.trailImg.map( (detail, index) => (
                                    <div>
                                        <div className="each-slide" key={index}></div>
                                        <div style={{'backgroundImage': `url(${detail.ImageURL})`, 'width': '900px' ,'height': '500px'}} />
                                    </div>
                                ))}
                             </Slide>
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

export default MovieDetail;