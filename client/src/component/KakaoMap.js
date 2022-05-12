
import React, { useEffect, useState } from "react";
import style from "./KakaoMap.module.css";
import {useParams} from "react-router-dom";

function KakaoMap() {
   
  const {company} = useParams();
  const [lone, setlon] = useState();
  const [lati, setlat] = useState();
  
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
          level: 7 
          
        }; 
        const map = new kakao.maps.Map(mapContainer, options); //맵생성

        //마커설정
        const markerPosition = new kakao.maps.LatLng(lati,lone); 
        const marker = new kakao.maps.Marker({ 
          position: markerPosition
        }); 
        marker.setMap(map); 



        const ps = new kakao.maps.services.Places();
        ps.keywordSearch(company === "LOTTE" ? "롯데시네마" : company, placesSearchCB);

        function placesSearchCB(data, status, pagination){
          for(var i = 0; i < data.length; i++){
            const markerSet = new kakao.maps.LatLng(data[i].y, data[i].x);
            markers = new kakao.maps.Marker({
              position: markerSet,
              clickable: true
            });
            markers.setMap(map);
            
            
          }
        }



        
    });
        

        
        

        
        
      });   

      

      
    
  }, [{lati, lone}]);


  const onGeoOk = (position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    
    setlon(lon);
    setlat(lat);
  }

  const onGeoError = () => {
    
  }

  


    
      
    return(
        <div >
            <h3>현재 내위치</h3>
            <div>
                <div id = "map" className={style.map} ></div>
            </div>
            
        </div>

    )
}


export default KakaoMap;