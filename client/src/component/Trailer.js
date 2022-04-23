
import axios from "axios";
import React, { useEffect, useState } from "react";
import style from "../routes/Home.module.css";
import play from "../img/play.png";

function Trailer( {id , name, key, trailer, img}) {
   
            

  


    
      
    return(
        <div className={style.ss} >
            <div>
                <div className={style.playBtnBox} >
                    <img src={play} className={style.playBtn} />
                </div>
                    
                <img src={img} className={style.tailerImg} />
                <div>{name}</div>
            </div>
            

            
        </div>

    )
}


export default Trailer;

