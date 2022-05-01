import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import style from "./Home.module.css";

function AllMovie(){
    const [loading, setLoading] = useState(false);
    const [movie, setMovie] = useState([]);
    const [lotteDisplay, setLotteDisplay] = useState("block");
    const [cgvDisplay, setCgvDisplay] = useState("block");

    const callApi = async()=>{
        const response = await axios.get('http://localhost:5000/');
        
  
        setMovie(response.data);
       
  
      
        if(movie){
            setLoading(true);
        }
      };

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

      useEffect(()=>{
        callApi();
      }, []);

      return(
        <div>
            {loading ? 
              <> 
                <header>
                    <h2><Link to={'/'}>Film</Link></h2>
                    <Link to={'/Login'} className = {style.loginBtn}>Login</Link>
                </header>
                <main>
                    <div>
                        <h3>현재 상영중인 영화</h3>
                        <button onClick={changeDisplay}>ALL</button>
                        <button onClick={changeDisplay}>LOTTE</button>
                        <button onClick={changeDisplay}>CGV</button>
                    </div>
                    
                    <div>
                        {movie.lotte.map( (lotte) => (
                            lotte.title === "AD" ? null :
                            <Link to={`/film/${lotte.title}/${lotte.company}`}>
                                <div style={{"display" : `${lotteDisplay}`}}> 
                                    <div>{lotte.company}</div>
                                    <div><img src = {lotte.img} /></div>
                                    <div>{lotte.title}</div>
                                    <div>{lotte.age}</div>
                                    <div>{lotte.percent}</div>
                                </div>
                            </Link>
                        ))}
                        {movie.cgv.map( (cgv) => (
                            <Link to={`/film/${cgv.title}/${cgv.company}`}>
                                <div style={{"display" : `${cgvDisplay}`}}>
                                    <div>{cgv.company}</div>
                                    <div><img src = {cgv.img} /></div>
                                    <div>{cgv.title}</div>
                                    <div>{cgv.age}</div>
                                    <div>{cgv.percent}</div>
                                </div>
                            </Link>
                        ))}
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

export default AllMovie;