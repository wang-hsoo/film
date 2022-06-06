
import React, { useEffect, useState } from "react";
import style from "./KakaoMap.module.css";
import {useParams} from "react-router-dom";

function KakaoMap(data) {
  
  const {company} = useParams();
  const {title} = useParams();
  const [movieInfo, setMovieInfo] = useState([]);
  const [selectMovie, setSelectMovie] = useState();
  const [movieTimeList, setMoviTimeList] = useState([]);
  const timeCount = [];
  // const timeResult = [];
  const [timeResult, setTimeResult] = useState();
  

  const onGeoOk = (position) => {
    localStorage.setItem('lati', position.coords.latitude);
    localStorage.setItem('lone', position.coords.longitude);
  }

  const onGeoError = () => {
    
  }
  
  
  const new_script = src => { 
    return new Promise((resolve, reject) => { 
      const script = document.createElement('script'); 
      script.src = src; 
      script.addEventListener('load', () => { 
        resolve(); 
      }); 
      script.addEventListener('error', e => { 
        reject(e); 
      }); 
      document.head.appendChild(script); 
    }); 
  };
  
  useEffect(() => { 
    navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
    const lati = localStorage.getItem('lati');
    const lone = localStorage.getItem('lone');
    
    //카카오맵 스크립트 읽어오기
    const my_script = new_script('https://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=8894cb8f3eedf8df828b4dac6c91c873&libraries=services');
    
    //스크립트 읽기 완료 후 카카오맵 설정
    my_script.then(() => { 
      let markers;
      
      const kakao = window['kakao']; 
      kakao.maps.load(() => {
        const mapContainer = document.getElementById('map');
        const options = { 
          center: new kakao.maps.LatLng(lati, lone), //좌표설정
          level: 8
          
        }; 
        const map = new kakao.maps.Map(mapContainer, options); //맵생성

        //마커설정
        const markerPosition = new kakao.maps.LatLng(lati,lone); 
        const marker = new kakao.maps.Marker({ 
          position: markerPosition,
        }); 
        
        var infowindow = new kakao.maps.InfoWindow({
          content: '<div style="width:150px;text-align:center;padding:5px 0;color:black; z-index: 0; position: relative">현재 위치</div>'
      });
        
        infowindow.open(map, marker);
        marker.setMap(map); 


        const ps = new kakao.maps.services.Places();
        const lotteCinema = data.data.lottecinemaInf[0];
        

        function deg2rad(deg){
          return deg * (Math.PI/180)
        }
        const currentLotte = [];
        const cgvLength = [];
        if(company === "LOTTE"){
          
          for(let i = 0; i < lotteCinema.length; i++){
            var r = 6371;
            var dLat = deg2rad(lotteCinema[i].Latitude - lati);
            var dLon = deg2rad(lotteCinema[i].Longitude - lone);
            var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(deg2rad(lati)) * Math.cos(deg2rad(lotteCinema[i].Latitude)) * Math.sin(dLon/2) * Math.sin(dLon/2);
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
            var d = r * c; 
            currentLotte.push({
              length : Math.round(d*1000),
              name : lotteCinema[i].CinemaName,
              lati: lotteCinema[i].Latitude,
              lone: lotteCinema[i].Longitude
            });
          }

          const map = new Map();
          for(const cinema of currentLotte){
            map.set(JSON.stringify(cinema), cinema);
          }

          const filter2 = [...map.values()];

          var filter;
          filter = filter2.sort(function(a,b){
            return a.length - b.length;
          });
          
          setMovieInfo(filter);
          setSelectMovie(filter[0].name);
          for ( let b = 0; b < 10; b++){
            placesSearchCB(filter[b]);
          }
          
          
        }else if(company === "CGV"){
          
          
          for ( let q = 0; q < data.data.cgvInfo.length; q++){  
              ps.keywordSearch("cgv" + data.data.cgvInfo[q], placesSearch);
            
            
          
          }

          
          
        }

        

        function placesSearchCB(data){
          
          const markerSet = new kakao.maps.LatLng(data.lati, data.lone);
            markers = new kakao.maps.Marker({
              position: markerSet,
            });

            var movieInfowindow = new kakao.maps.InfoWindow({
              content: `<div style="width:150px;text-align:center;padding:5px 0;color:black; z-index: 1; position: absolute">${data.name}</div>`
            });

            
            markers.setMap(map);
            movieInfowindow.open(map, markers);


            
        }

        function placesSearch(db, status, pagination){
          if(db.length !== 0){
          var r = 6371;
          var dLat = deg2rad(db[0].y - lati);
          var dLon = deg2rad(db[0].x - lone);
          var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(deg2rad(lati)) * Math.cos(deg2rad(db[0].y)) * Math.sin(dLon/2) * Math.sin(dLon/2);
          var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
          var d = r * c;
          
          if( d < 11){
            const markerSet = new kakao.maps.LatLng(db[0].y, db[0].x);
            markers = new kakao.maps.Marker({
              position: markerSet,
            });

            var movieInfowindow = new kakao.maps.InfoWindow({
              content: `<div style="width:150px;text-align:center;padding:5px 0;color:black; z-index: 1; position: absolute">${db[0].place_name}</div>`
            });

            markers.setMap(map);
            movieInfowindow.open(map, markers);
            cgvLength.push({
              name : db[0].place_name});
            
            setTimeout( () => setMovieInfo(cgvLength), 500);
           setSelectMovie(cgvLength[0].name); 
          }}
        }

      

        

        
        
        
    });
        

        
        

        
        
      });   

      const timeList = data.data.lottecinemaTimeList;
      for(let w = 0; w < timeList.length; w++){
            
        if(timeList[w][0] === undefined){
          
        }else{ 
            timeCount.push({
              name : timeList[w][0].CinemaNameKR,
              count : timeList[w].length
            });
         
        }
      }

      
    
      for(let w = 0; w < timeList.length - 2; w++){

        if(timeList[w][0] === undefined){
              
        }else{
          for(let y = 0; y < timeList[w].length; y++){
            if(title === timeList[w][y].MovieNameKR){
              timeCount.push(
                timeList[w][y].CinemaNameKR
              )
            }
            
          }

          const count = timeCount.reduce((accu, curr) => {
            accu.set(curr, (accu.get(curr)||0) +1) ;
            return accu
          },new Map());
          
          setTimeResult(count);
          
          
          
          
          
        }}
      
      
    
  }, []);


  const clickMovie = (event) => {
    setSelectMovie(event.target.innerText);
  }


  useEffect(() => {
    if(company === "LOTTE"){
      const timeList = data.data.lottecinemaTimeList;
      const AllTime = [];

      for(let w = 0; w < timeList.length - 2; w++){
            if(timeList[w][0] === undefined){
              
            }
            else if(selectMovie === timeList[w][0].CinemaNameKR){
              for(let y = 0; y < timeList[w].length; y++){
                if(title === timeList[w][y].MovieNameKR){
                  AllTime.push(timeList[w][y]);
                }
              }
              setMoviTimeList(AllTime);
              break;
            }

            
          }
            
          }
        
        
    

  },[selectMovie])


  function playTime(){
    for(let i = 0; i < movieTimeList.length; i++){
      if(movieTimeList[0].ScreenNameKR === movieTimeList[i].ScreenNameKR){
        console.log("같음" + movieTimeList[i].ScreenNameKR);
      }else{
        console.log("다름" + movieTimeList[i].ScreenNameKR);
      }
    }
    return(
      <>
        
      </>
    )
  }

    
      
  return(
    <div className={style.kakomap_form}>
        <h3 className={style.mapTitle}>현재 내위치</h3>
        <div className={style.mapContain}>
            <div id = "map" className={style.map} ></div>
        </div>
        <div className={style.list_palytime}>
          <div className={style.movieList}>
            <h3 className={style.listTitle}>영화관 목록</h3>
            <div className={style.list_Form}>
                {movieInfo.map((movie ,idx) => (
                  idx > 9 ? null :
                  <div className={style.list_select}>
                    <span className={style.listName} onClick={clickMovie}>{movie.name}</span>
                    {/* {timeResult.map((time, idx) => (
                      <span>{time.name === movie.name ? time.count : null}</span>
                    ))} */}
                    {timeResult.get(movie.name) === undefined ? (0) : "(" + timeResult.get(movie.name) + ")" }
                  </div>
                ))}
            </div>
          </div>

          <div className={style.playTime}>
            <h3 className={style.playTimeList}>상영시간</h3>
            <div className={style.selectMovie}>{selectMovie}</div>
            <div className={style.playTimeBox}>
              {/* {movieTimeList[0] === undefined ? <div>영화 상영 정보가 없습니다</div> :} */}
              { movieTimeList[0] === undefined ? <div>영화 상영 정보가 없습니다</div> : movieTimeList.map((time, idx) => (
                <ul className={style.playTimeBlock}>
                  <li>{time.ScreenNameKR} {time.FilmNameKR}</li>
                  <li>{time.MovieNameKR}</li>
                  <li></li>
                  <li>{time.StartTime} ~ {time.EndTime}</li>
                </ul>
              ))}
              {/* {playTime()} */}
            </div>
          </div>  
        </div>
    </div>

)
}


export default KakaoMap;