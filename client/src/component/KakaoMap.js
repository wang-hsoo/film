
import React, { useEffect, useState } from "react";
import style from "./KakaoMap.module.css";

function KakaoMap() {
   
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
    const my_script = new_script('https://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=8894cb8f3eedf8df828b4dac6c91c873');
    
    //스크립트 읽기 완료 후 카카오맵 설정
    my_script.then(() => { 
      console.log(lati,lone);  
      const kakao = window['kakao']; 
      kakao.maps.load(() => {
        const mapContainer = document.getElementById('map');
        const options = { 
          center: new kakao.maps.LatLng(lati, lone), //좌표설정
          level: 3 
          
        }; 
        const map = new kakao.maps.Map(mapContainer, options); //맵생성
        //마커설정
        const markerPosition = new kakao.maps.LatLng(lati,lone); 
        const marker = new kakao.maps.Marker({ 
          position: markerPosition
        }); 
        marker.setMap(map); 
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