import style from "./Footer.module.css";
import logo from "../img/logo.png";

function Footer(){


    return(
        <div className={style.wrapper}>
            <div className={style.container}>
                <img src={logo} className = {style.logo}></img>
                <div className={style.companyInfo}>
                    <div>상호 : FILM</div>
                    <div>대표 : 왕현수</div>
                    <div>주소 : 13174 성남시 중원구 광명로 377(금광2동 2685)</div>
                    <div>관리자 : 이준노, 이소현</div>
                    <div>&copy; 2022 FILM MOVIE SERVICE</div>
                </div>
            </div>
        </div>
    )
}

export default Footer;