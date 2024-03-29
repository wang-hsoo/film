
import axios from "axios";
import React, { useEffect, useState } from "react";
import style from "../routes/Home.module.css";
import play from "../img/play.png";

function Trailer( { name, id, img}) {
    

      
    return(
        <div className={style.ss} id={id}>
            
                <div className={style.playBtnBox} >
                    <img src={play} className={style.playBtn} />
                </div>
                <div className={style.TrailImgBox}>
                    <img src={img} className={style.tailerImg} />
                </div>
                <div className={style.TrailMovieName}>{name}</div>
        </div>

    )
}


export default Trailer;

