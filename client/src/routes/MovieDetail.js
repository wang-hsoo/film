import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import style from "./Home.module.css";
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';


function MovieDetail(){
    const [loading, setLoading] = useState(false);
    const {title} = useParams();
    const {company} = useParams();
    const [detail, getDetail] = useState([]);
    let movieD = [];
    let imgD = [];
    const [poster, setPosetr] = useState();

    const callApi = async()=>{
        const response = await axios.get('http://localhost:5000/');
        
        movieD = response.data.lotteMovieDetail;
        imgD = response.data.lotte;
        console.log(imgD);
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
                    <div>
                        <div><img src={poster} /></div>
                        <div>{detail.title}</div>
                        <div>
                            <div>{detail.age === 0 ? "전체연령대" : detail.age}</div>
                            <div>
                                <div>장르 : </div> 
                                <div>{detail.genre1}</div>
                                <div>{detail.genre2}</div>
                            </div>
                            
                            <div>평점 : {detail.viewRate}</div>
                            <div>예매율 : {detail.viewEvalu}</div>
                            <div>{detail.playTime}분</div>
                        </div>
                        <div>
                            <div>감독: {detail.name[0]}</div>
                            <div><img src = {detail.image[0]} /></div>
                            <div>출연: {detail.name[1]}</div>
                            <div><img src = {detail.image[1]} /></div>
                            <div>출연: {detail.name[2]}</div>
                            <div><img src = {detail.image[2]} /></div>
                            <div>출연: {detail.name[3]}</div>
                            <div><img src = {detail.image[3]} /></div>
                        </div>
                        <div>
                            <div>연령별 선호도</div>
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