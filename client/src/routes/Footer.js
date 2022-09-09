import style from "./Footer.module.css";
import logo from "../img/logo.png";

function Footer(){


    return(
        <div className={style.wrapper}>
            <div className={style.bar}>FILM</div>
            <div className={style.container}>
                {/* <img src={logo} className = {style.logo}></img> */}

            </div>
        </div>
    )
}

export default Footer;