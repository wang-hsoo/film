const express = require('express');
const router = express.Router();
const axios = require("axios"); 
const cheerio = require("cheerio");
const iconv = require('iconv-lite');
let cgv = [];
let lotte = [];
let trailerKey = [];
let a = [];
let MovieDetail = [];
let CGVMovieDetail = [];
let lottecinemaInf = [];
let  cgvInfo = [];
let lottecinemaTimeList = [];
let t = [];


function getCgvMovieDetail(key){
    const getHTML = async() => {
        try{
            if(key !== "undefined")
                return await axios.get(`http://www.cgv.co.kr/${key}`);
        }catch(err){
            console.log(err);
        }   
    }
    
    const parsing =async() => {
        const html = await getHTML();
        const $ = cheerio.load(html.data);
        const $coureList = $("#contents");
        
    
        $coureList.each(async(idx, node) => {
            const name = [];
            const image = [];
            name.push($(node).find(".spec > dl").children("dd").eq(0).text().replace(/\n/g, "").replace(/\s*/g, ""));
            const p = $(node).find(".spec > dl").children(".on").eq(1).text().split(',');
            const directerImg = $(node).find(".spec > dl").children("dd").eq(0).find("a").attr("href");

            const getdirectImg = await await axios.get(`http://www.cgv.co.kr/${directerImg}`);
            const $$ = cheerio.load(getdirectImg.data);
            const $get = $$(".wrap-people");
            $get.each((idx,node)=> {image.push($(node).find(".thumb-image > img").attr("src") === "" ? "/LCHS/Image/Thum/movie_no_casting.jpg" : $(node).find(".thumb-image > img").attr("src") )});
            
            for(let i = 0; i < 4; i++){
                name.push($(node).find(".spec > dl > .on").children("a").eq(i).text());
                const actorImg = $(node).find(".spec > dl > .on").children("a").eq(i).attr("href");
                const getActorImg = await await axios.get(`http://www.cgv.co.kr/${actorImg}`);
                const $$$ = cheerio.load(getActorImg.data);
                const $$get = $$$(".wrap-people");
                $$get.each((idx, node)=> {image.push($(node).find(".thumb-image > img").attr("src") === "" ? "/LCHS/Image/Thum/movie_no_casting.jpg" : $(node).find(".thumb-image > img").attr("src") )})
            }
            
                
            
            
            CGVMovieDetail.push({
                company: "CGV",
                title: $(node).find(".box-contents > .title > strong").text(),
                name: name,
                synops: $(node).find(".sect-story-movie").text(),
                image: image,
                genre1: $(node).find(".spec > dl").children("dt").eq(2).text().replace(/장르 :/g, ""),
                genre2: "",
                age : p[0],
                viewRate:  $(node).find(".score > .percent > span").text(),   //예매율
                playTime: p[1],
                viewEvalu: $(node).find(".score > .egg-gage > .percent").text(),
                AgePrefer10: "0",
                AgePrefer20: "0",
                AgePrefer30: "0",
                AgePrefer40: "0",
                trailImg: ["noImg"]
                
            });
           
            
            
        });
        
    
    

    
    
    }


    parsing();
    
    
}


function getCgv(){
    const getHTML = async() => {
        try{
            return await axios.get("http://www.cgv.co.kr/movies/?lt=1&ft=1");
        }catch(err){
            console.log(err);
        }   
    }
    
    const parsing =async() => {
        const html = await getHTML();
        const $ = cheerio.load(html.data);
        const $coureList = $(".sect-movie-chart > ol > li");
        
        
    
        
    
    $coureList.each((idx, node) => {
        const key = $(node).find(".box-image > a").attr("href");
        const percent = $(node).find(".percent").text().split("%");
        
        cgv.push({
            company: "CGV",
            title: $(node).find(".title").text(),
            percent: percent[0],
            open: $(node).find(".txt-info").text().replace(/\n/g, "").replace(/\s*/g, ""),
            img: $(node).find(".thumb-image > img").attr("src"),
            age: $(node).find(".thumb-image > span").text(),
            key: $(node).find(".box-image > a").attr("href")
        });
       
        getCgvMovieDetail(key);
        
    });

    
    
}


    parsing();

}

function getLotte(){
    const getHTML = async() => {
        try{

            var dic = {"MethodName":"GetMoviesToBe","channelType":"HO","osType":"Chrome","osVersion":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.82 Safari/537.36","multiLanguageID":"KR","division":1,"moviePlayYN":"Y","orderType":"1","blockSize":100,"pageNo":1,"memberOnNo":""}

            return await axios.post("https://www.lottecinema.co.kr/LCWS/Movie/MovieData.aspx",  'ParamList='+JSON.stringify(dic));
        }catch(err){
            console.log(err);
        }   
    }
    
    const parsing =async() => {
        const html = await getHTML();

        const Movies = html.data.Movies.Items;
        
        
        for(let i = 0; i < Movies.length;i++){
            lotte.push({
                company:  "LOTTE",
                title: Movies[i].MovieNameKR,
                genre: Movies[i].MovieGenreName,
                img: Movies[i].PosterURL,
                age: Movies[i].ViewGradeNameKR,
                percent: Movies[i].BookingRate,
                key: Movies[i].RepresentationMovieCode
            });
            trailerKey.push(Movies[i].RepresentationMovieCode);
        }
        
        return trailerKey;
}
    
     t = parsing();
     
}


function getTrailer() {
    const trailerImg = async() => {

       try {
        trailerKey = await t;
        
        for(let i = 0; i < 10; i++){
            if(trailerKey[i] === "AD"){
                continue;
            }else {
                
                    var dic = {"MethodName":"GetMovieDetailTOBE",
                    "channelType":"HO",
                    "osType":"Chrome",
                    "osVersion":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.75 Safari/537.36",
                    "multiLanguageID":"KR",
                    "representationMovieCode":`${trailerKey[i]}`,
                    "memberOnNo":""}
        
                    const html = await axios.post("https://www.lottecinema.co.kr/LCWS/Movie/MovieData.aspx", 'ParamList='+JSON.stringify(dic));
                    const name = html.data.Movie.MovieNameKR;
                    const imgUrl = html.data.Trailer.Items[0].ImageURL;
                    const date = html.data.Movie.PlanedRelsMnth.replace(/-/g, "");
                   
                    a.push(
                        {   num:i,
                            key:trailerKey[i],
                        mp4 : `https://caching.lottecinema.co.kr//Media/MovieFile/MovieMedia/${date}/${trailerKey[i]}_301_1.mp4`, 
                        img : imgUrl,
                        name: name }
                    );
            
                
                
            }
           
        }
       } catch (error) {
           console.log(error);
       }

        
    };
        
        

    trailerImg();
}

function getMovieDetail() {
    const detail = async() => {

        try {
            key = await t;
        
        for(let i = 0; i < key.length; i++){
            if(key[i] === "AD"){
                continue;
            }else {
                    
                    var dic = {"MethodName":"GetMovieDetailTOBE",
                    "channelType":"HO",
                    "osType":"Chrome",
                    "osVersion":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.75 Safari/537.36","multiLanguageID":"KR",
                    "representationMovieCode":`${key[i]}`,"memberOnNo":""}
        
                    const html = await axios.post("https://www.lottecinema.co.kr/LCWS/Movie/MovieData.aspx", 'ParamList='+JSON.stringify(dic));
                    const name = [];
                    const image = [];
                    
                    
                    for(let b = 0; b < html.data.Casting.Items.length; b++){
                         name.push(html.data.Casting.Items[b].StaffName);
                         image.push(html.data.Casting.Items[b].StaffImage);
                         
                    }
                    
                    const title = html.data.Movie.MovieNameKR;
                    const genre1 = html.data.Movie.MovieGenreNameKR;
                    const genre2 = html.data.Movie.MovieGenreNameKR3;
                    const synops = html.data.Movie.SynopsisKR.replace(/<br>/g, "").replace(/<b>/g, "").replace(/<\/b>/g, "");
                    const viewRate = html.data.Movie.ViewRate; //평점
                    const age = html.data.Movie.ViewGradeCode;
                    const viewEvalu = html.data.Movie.ViewEvaluation;//예매율
                    const playTime = html.data.Movie.PlayTime;
                    const AgePrefer10 = html.data.Movie.AgePrefer10;
                    const AgePrefer20 = html.data.Movie.AgePrefer20;
                    const AgePrefer30 = html.data.Movie.AgePrefer30;
                    const AgePrefer40 = html.data.Movie.AgePrefer40;
                    const trailImg = html.data.Trailer.Items;

                    
                   
                    MovieDetail.push({
                        company: "LOTTE",
                        title: title,
                        name : name,
                        image: image,
                        genre1: genre1,
                        genre2: genre2,
                        synops: synops,
                        viewRate: viewRate,
                        age: age,
                        viewEvalu: viewEvalu,
                        playTime: playTime,
                        AgePrefer10: AgePrefer10,
                        AgePrefer20: AgePrefer20,
                        AgePrefer30: AgePrefer30,
                        AgePrefer40: AgePrefer40,
                        trailImg: trailImg,

                    });

                    
                    
            }}
        } catch (error) {
            
        }

           
        
    };
        
        

    detail();
}

function lottecinemaInfo(){
    const detail = async() => {  
        try {
            var dic = {"MethodName":"GetTicketingPageTOBE","channelType":"HO","osType":"W","osVersion":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36","memberOnNo":"0"}
            const html = await axios.post("https://www.lottecinema.co.kr/LCWS/Ticketing/TicketingData.aspx", 'ParamList='+JSON.stringify(dic));
            
            lottecinemaInf.push(html.data.Cinemas.Cinemas.Items);
            return lottecinemaInf;
        } catch (error) {
            console.log(error);
        }
       
    }

    const movieTime = async(data) => {
        try {
            for(let i = 0; i < data[0].length; i++){
                const  temStorage = [];
                let today = new Date();   

                let year = today.getFullYear(); // 년도
                let month = today.getMonth() + 1;  // 월
                let date = today.getDate();
                var dic = {"MethodName":"GetPlaySequence",
                            "channelType":"HO",
                            "osType":"W",
                            "osVersion":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.67 Safari/537.36",
                            "playDate":`${year}-${month}-${date}`,
                            "cinemaID":`${data[0][i].DivisionCode}|${data[0][i].DetailDivisionCode}|${data[0][i].CinemaID}`,
                            "representationMovieCode":""}
    
                const html = await axios.post("https://www.lottecinema.co.kr/LCWS/Ticketing/TicketingData.aspx", 'ParamList='+JSON.stringify(dic));
    
                const d = html.data.PlaySeqs.Items;
                for(let a = 0; a < d.length; a++){
                    temStorage.push({
                        CinemaNameKR: d[a].CinemaNameKR,
                        MovieNameKR: d[a].MovieNameKR,
                        FilmNameKR: d[a].FilmNameKR,
                        PlayDt : d[a].PlayDt,
                        StartTime : d[a].StartTime,
                        EndTime : d[a].EndTime,
                        ScreenNameKR : d[a].ScreenNameKR
                    })
                }
    
                
                
                lottecinemaTimeList.push(temStorage);
    
                
            }
        } catch (error) {
            console.log(error);
        }
        
        
        
    }
           
        
    
    const crawl = async() => {
        const data = await detail();
        movieTime(data);
    }
        

    
    crawl();

}

function CgvInfo(){
    const getHTML = async() => {
        try{
            
                return await axios.get("https://thewiki.kr/w/CGV/%EC%A7%80%EC%A0%90");
            
            
        }catch(err){
            console.log(err);
        }   
    }
    
    const parsing =async() => {
        const html = await getHTML();
        const $ = cheerio.load(html.data);
        const $coureList = $(".wiki-size");

        
        
        
    
        
    
    $coureList.each((idx, node) => {
        if($(node).find("a > span > strong").text() !== ""){
            cgvInfo.push($(node).find("a > span > strong").text());
            
        }
       
    
    });

    
    
}


    parsing();

}

// function cgvTime(){
//     const getHTML = async() => {
//         try{
            
//             let today = new Date();   

//             let year = today.getFullYear(); // 년도
//             let month = today.getMonth() + 1;  // 월
//             let date = today.getDate();
//             console.log(`http://www.cgv.co.kr/common/showtimes/iframeTheater.aspx?areacode=${cgvCode[0].area}&theatercode=${cgvCode[0].code}&date=${year}${month < 10 ? "0" + month : month }${date < 10 ? "0" + date : date}`)
//             //for(let i = 0; i < cgvCode.length; i++){
//                 return await axios.get(`http://www.cgv.co.kr/common/showtimes/iframeTheater.aspx?areacode=01&theatercode=0056&date=20220601`);
//             //}
            
//         }catch(err){
//             console.log(err);
//         }   
//     }
    
//     const parsing =async() => {
//         const html = await getHTML();
//         const $ = cheerio.load(html.data);
//         const $coureList = $("sect-showtimes > ul > li > .col-times");
//         console.log($coureList);

        
       
        
    
        
    
//     // $coureList.each((idx, node) => {
//     //    console.log($(node).find(".info-movie").text());
    
//     // });

    
    
// }


//     parsing();

// }

getCgv();
getLotte();
getTrailer();
getMovieDetail();
lottecinemaInfo();
CgvInfo();
// cgvTime();

router.get('/', (req, res)=>{
  res.send({
      cgv: cgv, // cgv 영화 목록 
      lotte: lotte, // lotte 영화 목록
      trailer: a, //예고편
      lotteMovieDetail : MovieDetail, //상세 페이지 정보
      cgvMovieDetail: CGVMovieDetail, //상세페이지 정보
      lottecinemaInf: lottecinemaInf, //영화관 목록
      cgvInfo: cgvInfo,  //영화관 목록
      lottecinemaTimeList : lottecinemaTimeList  //롯데시네마 영화 시간
    });
});

module.exports = router;



