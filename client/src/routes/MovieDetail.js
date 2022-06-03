import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import style from "./Home.module.css";
import style2 from "./MovieDetail.module.css";
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import noImg from "../img/no_img.png";
import KakaoMap from "../component/KakaoMap";
import logo from "../img/logo.png";


function MovieDetail(){
    const [loading, setLoading] = useState(false);
    const {title} = useParams();
    const {company} = useParams();
    const [detail, getDetail] = useState([]);
    const [data, setData] = useState([]);
    let movieD = [];
    let movieC = [];
    let imgD = [];
    let imgC = [];
    const [poster, setPosetr] = useState();
    const [age10, setAge10] = useState("");
    const [age20, setAge20] = useState("");
    const [age30, setAge30] = useState("");
    const [age40, setAge40] = useState("");
    const [checkLogin , setLogin] = useState(false);
    const [cgvImg, setCgvImg] = useState([]);

    const callApi = async()=>{
        const response = await axios.get('http://localhost:5000/');
        
        movieD = response.data.lotteMovieDetail;
        imgD = response.data.lotte;
        movieC = response.data.cgvMovieDetail;
        imgC = response.data.cgv;
        setData(response.data);
        
        sel();
        console.log(response.data.cgv);

       
        if(movieD && movieC){
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
            for(let i = 0; i < movieC.length; i++){
                if(title === movieC[i].title){
                    getDetail(movieC[i]);

                    
                    for(let q = 0; q < movieD.length; q++){
                        if(movieD[q].title === title){
                            setCgvImg(movieD[q].trailImg);
                        }
                    }
                    
                    for(let a = 0; a < imgC.length; a++){
                        if(imgC[a].title == title){    
                            setPosetr(imgC[a].img );
                        }
                    }
      
                }
            }
        }
      }

      const favorite = () => {
          
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

      const logCheck = () => {
        const id = localStorage.getItem("id");

        if(id){
            setLogin(true);
        }
    }

    const onLog = (event) => {
        const id = localStorage.getItem("id");
        

        if( id){
            setLogin(false);
            localStorage.removeItem("id");
            event.preventDefault();
        }
    }
      
    
    useEffect(()=>{
        logCheck();
        callApi();
      }, []);
      

      return(
        <div>
            {loading ? 
              <> 
                <header>
                    <Link to ={"/"}><img src={logo} className = {style.logo}></img></Link>
                    <Link to={'/Login'} className = {style.loginBtn} onClick={onLog}>{checkLogin ? "LogOut" : "LogIn"}</Link>
                </header>
                <main>
                    <div className={style2.detail}>
                        <div className={style2.detailimpo}>
                            <div className={style2.detailPoster}><img src={poster} /></div>
                            <div className={style2.detailMore}>
                                <div className={style2.detailTitle}>{detail.title}</div>
                                <div className={style2.detailContent}>
                                    <div className={style2.viewRate}>예매율 : {detail.viewRate}</div>
                                    <div className={style2.viewEvalu}>평점 : {detail.viewEvalu}</div>
                                    <div className={style2.detailAge}>{detail.age === 0 ? "전체연령대" : detail.age}</div>
                                    <div className={style2.detailGenreBox}>
                                        <div className={style2.detailGenreTitle}>장르 :&nbsp;</div> 
                                        <div className={style2.detailGenre}>{detail.genre1}</div>
                                        <div className={style2.detailGenre}>{detail.genre2}</div>
                                    </div>
                                    <div className={style2.playTime}>{detail.playTime}분</div>
                                </div>
                                
                                <div>
                                    <div>{detail.synops}</div>
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
                            </div>
                            <div className={style2.movieCasting}>
                                <div>
                                    
                                    <div className={style2.castingImg}><img src = {detail.image[0] === "/LCHS/Image/Thum/movie_no_casting.jpg" ? noImg : detail.image[0]} /></div>
                                    <div className={style2.movieMan}>감독: {detail.name[0] }</div>
                                </div>
                                <div>
                                    <div className={style2.castingImg}><img src = {detail.image[1] === "/LCHS/Image/Thum/movie_no_casting.jpg" ? noImg : detail.image[1]} /></div>
                                    <div className={style2.movieMan}>출연: {detail.name[1]}</div>
                                </div>
                                <div>
                                    <div className={style2.castingImg}><img src = {detail.image[2] === "/LCHS/Image/Thum/movie_no_casting.jpg" ? noImg : detail.image[2]} /></div>
                                    <div className={style2.movieMan}>출연: {detail.name[2]}</div>
                                </div>
                                <div>
                                    <div className={style2.castingImg}><img src = {detail.image[3] === "/LCHS/Image/Thum/movie_no_casting.jpg" ? noImg : detail.image[3]} /></div>
                                    <div className={style2.movieMan}>출연: {detail.name[3]}</div>
                                </div>
                            </div>
                        </div>

                        <div  >
                           
                            {company === "LOTTE" ?
                            <Slide>
                                {detail.trailImg.map( (detail, index) => (
                                    <div style={{'width': '100%', 'height' : '80vh'}} key={index}>
                                        <div style={{
                                        'backgroundImage': `url(${detail.ImageURL === undefined ? noImg : detail.ImageURL})`, 
                                        'width': '100%' ,
                                        'height': '100%', 
                                        'backgroundPosition' : 'center center' ,
                                        'backgroundRepeat' : 'no-repeat', 
                                        'margin' : '0 auto'}} />
                                    </div>
                                ))}

                            </Slide> : 
                            cgvImg[0] === undefined ? null :
                            <Slide>
                                {cgvImg.map( (detail, index) => (
                                    <div style={{'width': '100%', 'height' : '80vh'}} key={index}>
                                        
                                        <div style={{'backgroundImage': `url(${detail.ImageURL === undefined ? noImg : detail.ImageURL})`, 'width': '100%' ,'height': '100%', 'backgroundRepeat' : 'no-repeat', 'backgroundPosition' : 'center center' , 'margin' : '0 auto'}} />
                                    </div>
                                ))}    
                        </Slide>
                            }
                        </div>
                       
                    </div>
                    <div>
                        <KakaoMap data = {data}/>
                    </div>
                    

                </main>
         
                    
                </>:
                <div className={style.loading}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        
            }
        
        </div>
    )
}

export default MovieDetail;