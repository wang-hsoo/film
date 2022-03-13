import React, { useEffect } from "react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';

function BoxofficeRanck(){
    const [getDate, setDate] = useState("");
    const [movie, setMovie] = useState([]);
    const [startDate, setStartDate] = useState(new Date());

    // useEffect(() => {
    //     var now = new Date;
    //     var year = now.getFullYear();
    //     var month = now.getMonth() + 1 > 10 ? now.getMonth()+1  : `0`+(now.getMonth()+1);
    //     var day = now.getDate() > 10 ? now.getDate()  : `0`+ now.getDate();

    //     let today = `${year}${month}${day}`;

    //     setDate(today);
    // },[]);

    
    

    const getmovie = async() =>{
        const json = await(
            await fetch(`http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=d57f7dfe38d2def2190a41bfc774f8b6&targetDt=${getDate}`)
        ).json();
        
        setMovie(json.boxOfficeResult ? json.boxOfficeResult.dailyBoxOfficeList : null);
        console.log(json.boxOfficeResult.dailyBoxOfficeList);
    
    }

    

    const dPick = (date) => {
        let year = date.getFullYear();
        let month = date.getMonth() + 1 > 10 ? date.getMonth()+1  : `0`+(date.getMonth()+1);
        let day = date.getDate() > 10 ? date.getDate()  : `0`+ date.getDate()
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

      useEffect(() => {
        getmovie();
     },[]);

  
    
    

    return(
        <div>
            <h3>boxofficeRank</h3>
            <Datepick />

            { movie ?  <div>

            {movie.map((movies) => {
                return(
                    <div key = {movies.movieCd}>
                        <div>{movies.rank}</div>
                        <div>{movies.movieNm}</div>
                        <div>{movies.audiAcc}</div>
                    </div>
                    );
            })}</div>: 
            
            <div>다른 날짜를 선택해 주세요...</div>


        }

            

        </div>
    );

}

export default BoxofficeRanck;