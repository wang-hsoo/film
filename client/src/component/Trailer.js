
import axios from "axios";
import React, { useEffect, useState } from "react";

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
            <div>
                {open ? (
                    <section>
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
        <div id={id}>
            <div onClick={openModal} >
                <img src={img} />
                <div>{name}</div>
            </div>
            

            <Modal open= {modalOpen} close={closeModal}></Modal>
        </div>

    )
}


export default Trailer;

