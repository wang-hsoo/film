import React, { useEffect } from "react";
import { useState } from "react";
import DatePicker from "react-datepicker";

function BoxofficeRanck(){
    const [getDate, setDate] = useState(null);
    const [movie, setMovie] = useState([]);

    useEffect(() => {
        let now = new Date;
        let year = now.getFullYear();
        let month = now.getMonth() + 1 > 10 ? now.getMonth()+1  : `0`+(now.getMonth()+1);
        let day = now.getDay() > 10 ? now.getDay()  : `0`+now.getDay();

        let today = `${year}${month}${day}`;

        setDate(today);
    },[]);

    
    const getmovie = async() =>{
        const json = await(
            await fetch(`http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=d57f7dfe38d2def2190a41bfc774f8b6&targetDt=${getDate}`)
        ).json();

        setMovie(json.boxOfficeResult.daliyBoxOfficeList);
    }

    useEffect(() => {
        getmovie();
    },[]);
    


    return(
        <div>
            <h3>boxofficeRank</h3>

            {movie.map((movies) => {
                <ul>
                    <li>{movies.rank}</li>
                    <li>{movies.movieNm}</li>
                    <li>{movies.audiAcc}</li>
                </ul>
            })}
        </div>
    );

}

export default BoxofficeRanck;