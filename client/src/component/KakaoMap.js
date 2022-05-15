
import React, { useEffect, useState } from "react";
import style from "./KakaoMap.module.css";
import {useParams} from "react-router-dom";

function KakaoMap(data) {
   
  const {company} = useParams();
  const [movieInfo, setMovieInfo] = useState([]);

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
          for ( let b = 0; b < 10; b++){
            placesSearchCB(filter[b]);
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

        

        
        
        
    });
        

        
        

        
        
      });   

      
      
      
    
  }, []);


  






    
      
    return(
        <div className={style.kakomap_form}>
            <h3 className={style.mapTitle}>현재 내위치</h3>
            <div className={style.mapContain}>
                <div id = "map" className={style.map} ></div>
            </div>
            <div className={style.list_palytime}>
              <div className={style.movieList}>
                <h3 className={style.listTitle}>영화관 목록</h3>

                <ul className={style.list_Form}>
                  {movieInfo.map((movie ,idx) => (
                    idx > 9 ? null :
                    <li className={style.listName}>{movie.name} </li>
                  ))}
                </ul>
              </div>

              <div className={style.playTime}>
                <h3 className={style.playTimeList}>상영시간</h3>
              </div>  
            </div>
            
        </div>

    )
}


export default KakaoMap;