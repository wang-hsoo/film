
import axios from "axios";
import React, { useEffect, useState } from "react";
import style from "../routes/Home.module.css";
import play from "../img/play.png";

function Trailer( {id , name, key, trailer, img}) {
    const [modalOpen, setModalOpen] = useState(false);
    
        const openModal = () => {
            setModalOpen(true);
        };
        const closeModal = () => {
            setModalOpen(false);
        };
            

   
    const Modal = (props) => {
        const {open, close, header } = props;

        

        return (
            <div className = {style.movieTrail} >
                {open ? (
                    <section className={style.modarTrailer}>
                        
                        <button onClick={close}>x</button>
                        <video autoPlay>
                            <source src={trailer}/>
                        </video>
                    </section> 
                ): null}
            </div>
        )
    }


    
      
    return(
        <div className={style.ss} >
            <div onClick={openModal} >
                <div className={style.playBtnBox} >
                <img src={play} className={style.playBtn} />
                </div>
                
                <img src={img} className={style.tailerImg} />
                <div>{name}</div>
            </div>
            

            <Modal open= {modalOpen} close={closeModal}></Modal>
        </div>

    )
}


export default Trailer;

