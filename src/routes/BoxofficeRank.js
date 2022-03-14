import React, { useEffect } from "react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';

function BoxofficeRanck(){
    const [getDate, setDate] = useState("");
    const [movie, setMovie] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [loading, setLoading] = useState(true);


    

    const getmovie = async() =>{
        const json = await(
            await fetch(`http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchWeeklyBoxOfficeList.json?key=d57f7dfe38d2def2190a41bfc774f8b6&targetDt=${getDate}&weekGb=0`)
        ).json();
        
        setMovie(json.boxOfficeResult.weeklyBoxOfficeList);
        console.log(json);
        setLoading(false);
        
    
    }

    

    const dPick = (date) => {
        let year = date.getFullYear();
        let month = date.getMonth() + 1 > 10 ? date.getMonth()+1  : `0`+(date.getMonth()+1);
        let day = date.getDate() > 10 ? date.getDate() - 1  : `0`+ (date.getDate() -1);
        let today = `${year}${month}${day}`;
        setDate(today);
    }

    const Datepick = () => {
        return (
          <DatePicker
            locale={ko}
            dateFormat="yyyy/MM/dd"
            selected={startDate}
            onChange={(date) => {
                setStartDate(date);
                dPick(date);
                getmovie();
                
            }}
          />
        );
      };

     

  

    

    return(
        <div>
            <h3>boxofficeRank</h3>
            <Datepick />

            { loading ?  
            
            <div>Loading...</div>

            : 
            
            <div>

            {movie.map((movies) => {
                return(
                    <div key = {movies.movieCd}>
                        <div>{movies.rank}</div>
                        <div>{movies.movieNm}</div>
                        <div>{movies.audiAcc}</div>
                    </div>
                    );
            })}</div>


        }

            

        </div>
    );

}

export default BoxofficeRanck;