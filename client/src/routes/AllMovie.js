import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import style from "./Home.module.css";
import movieStyle from "./AllMovie.module.css";
import logo from "../img/logo.png";
import Footer from "./Footer";


function AllMovie( data){
    const [loading, setLoading] = useState(false);
    const [lotteDisplay, setLotteDisplay] = useState("block");
    const [cgvDisplay, setCgvDisplay] = useState("block");
    const [checkLogin , setLogin] = useState(false);


      const changeDisplay = (event) => {
        const sel = event.target.innerText;
        
        switch(sel){
            case "ALL":
                setLotteDisplay("block");
                setCgvDisplay("block");
                break;

            case "LOTTE":
                setLotteDisplay("block");
                setCgvDisplay("none");
                break;

            case "CGV":
                setCgvDisplay("block");
                setLotteDisplay("none");
                break;

            
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

      useEffect(()=>{
        logCheck();
        setTimeout(() => setLoading(true), 500);
      }, [data]);
      
      

      return(
        <div>
            {loading ? 
              <> 
               <header>
                    <Link to ={"/"}><img src={logo} className = {style.logo}></img></Link>
                    <Link to={'/Login'} className = {style.loginBtn} onClick={onLog}>{checkLogin ? "LogOut" : "LogIn"}</Link>
                </header>
                <main>
                    <div className = {movieStyle.companyBtn}>
                        <h3>All MOVIES</h3>
                        <div>
                            <button onClick={changeDisplay}>ALL</button>
                            <button onClick={changeDisplay}>LOTTE</button>
                            <button onClick={changeDisplay}>CGV</button>
                        </div>
                    </div>
                    <div className={movieStyle.allList}>
                        {data.data.lotte.map( (lotte, idx) => (
                            lotte.title === "AD" ? null :
                            <Link to={`/film/${lotte.title}/${lotte.company}`} style={{"display" : `${lotteDisplay}`}} className={movieStyle.detailLink} key={idx}>
                                <div className={movieStyle.detailBox}> 
                                    <div className={movieStyle.movieCompany}>{lotte.company}</div>
                                    <div className={movieStyle.moviePoster}><img src = {lotte.img} /></div>
                                    <div className={movieStyle.movieTitle}>{lotte.title}</div>
                                    <div className={movieStyle.movieAge}>{lotte.age === "청불" || lotte.age ==="전체" ? lotte.age : lotte.age + "세 이상"}</div>
                                    <div className={movieStyle.moviePercent}>예매율: {lotte.percent}</div>
                                </div>
                            </Link>
                        ))}
                        
                        {data.data.cgv.map( (cgv, idx) => (
                            <Link to={`/film/${cgv.title}/${cgv.company}`} style={{"display" : `${cgvDisplay}`}} className={movieStyle.detailLink} key={idx}>
                                <div  className={movieStyle.detailBox}>
                                    <div className={movieStyle.movieCompany}>{cgv.company}</div>
                                    <div className={movieStyle.moviePoster}><img src = {cgv.img} /></div>
                                    <div className={movieStyle.movieTitle}>{cgv.title}</div>
                                    <div className={movieStyle.movieAge}>{cgv.age}</div>
                                    <div className={movieStyle.moviePercent}>{cgv.percent}</div>
                                </div>
                            </Link>
                        ))}
                    </div>
                    

                </main>
                <Footer />
         
                    
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

export default AllMovie;