import React, { useEffect } from "react";
import { useState } from "react";
import DatePicker from "react-datepicker";

function BoxofficeRanck(){
    const [getDate, setDate] = useState("");
    const [movie, setMovie] = useState([]);

    
    

    const getmovie = async() =>{
        const json = await(
            await fetch(`http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=d57f7dfe38d2def2190a41bfc774f8b6&targetDt=${getDate}`)
        ).json();

        setMovie(json.boxOfficeResult.dailyBoxOfficeList);
        console.log(json.boxOfficeResult.dailyBoxOfficeList);
    
    }

    useEffect(() => {
        var now = new Date;
        var year = now.getFullYear();
        var month = now.getMonth() + 1 > 10 ? now.getMonth()+1  : `0`+(now.getMonth()+1);
        var day = now.getDate() > 10 ? now.getDate()  : `0`+ now.getDate();

        let today = `${year}${month}${day}`;

        setDate(today);
        getmovie();
        console.log(today);
    },[]);

    const Datepick = () => {
        const [startDate, setStartDate] = useState(new Date());
        return (
          <DatePicker
            dateFormat="yyyy/MM/dd"
            selected={startDate}
            onChange={(date) => {
                var year = date.getFullYear();
                var month = date.getMonth() + 1 > 10 ? date.getMonth()+1  : `0`+(date.getMonth()+1);
                var day = date.getDate() > 10 ? date.getDate()  : `0`+ date.getDate();

                let today = `${year}${month}${day}`;
                setStartDate(date);
                setDate(today);
                getmovie();
                
            }}
          />
        );
      };

  
    
    

    return(
        <div>
            <h3>boxofficeRank</h3>
            <Datepick />

            {movie.map((movies) => {
                return(
                    <div key = {movies.movieCd}>
                        <div>{getDate}</div>
                        <div>{movies.rank}</div>
                        <div>{movies.movieNm}</div>
                        <div>{movies.audiAcc}</div>
                    </div>
                    );
            })}

            

        </div>
    );

}

export default BoxofficeRanck;