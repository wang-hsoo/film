const express = require('express');
const router = express.Router();
const axios = require("axios"); 
const cheerio = require("cheerio");
let cgv = [];
let lotte = [];
let trailerKey = [];
let a = [];
let MovieDetail = [];
let lotteMovieDetail = [];

function getCgvMovieDetail(key){
    const getHTML = async() => {
        try{
            return await axios.get(`http://www.cgv.co.kr/${key}`);
        }catch(err){
            console.log(err);
        }   
    }
    
    const parsing =async() => {
        const html = await getHTML();
        const $ = cheerio.load(html.data);
        const $coureList = $("#contents");
        
        //$(node).find(".spec > dl").children("dd").eq(0).find("a").attr("href") 감독 정보 사이트 주소
    
        $coureList.each((idx, node) => {
            const name = [];
            const image = [];
            name.push($(node).find(".spec > dl").children("dd").eq(0).text().replace(/\n/g, "").replace(/\s*/g, ""));

            for(let i = 0; i < 4; i++){
                name.push($(node).find(".spec > dl > .on").children("a").eq(i).text());
            }
            

            console.log();
            
            lotteMovieDetail.push({
                company: "CGV",
                title: $(node).find(".box-contents > .title > strong").text(),
                name: name,
                synops: $(node).find(".sect-story-movie").text(),
                // AgePrefer10: 
                
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
        
        cgv.push({
            company: "CGV",
            title: $(node).find(".title").text(),
            percent: $(node).find(".percent").text(),
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

       
        trailerKey = await t;
        
        for(let i = 0; i < 10; i++){
            if(trailerKey[i] === "AD"){
                continue;
            }else {
                
                    var dic = {"MethodName":"GetMovieDetailTOBE","channelType":"HO","osType":"Chrome","osVersion":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.75 Safari/537.36","multiLanguageID":"KR","representationMovieCode":`${trailerKey[i]}`,"memberOnNo":""}
        
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
    };
        
        

    trailerImg();
}

function getMovieDetail() {
    const detail = async() => {

       
        key = await t;
        
        for(let i = 0; i < key.length; i++){
            if(key[i] === "AD"){
                continue;
            }else {
                    
                    var dic = {"MethodName":"GetMovieDetailTOBE","channelType":"HO","osType":"Chrome","osVersion":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.75 Safari/537.36","multiLanguageID":"KR","representationMovieCode":`${key[i]}`,"memberOnNo":""}
        
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
                    const synops = html.data.Movie.SynopsisKR;
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

                    
                    
            }
           
        }
    };
        
        

    detail();
}

getCgv();
getLotte();
getTrailer();
getMovieDetail();

router.get('/', (req, res)=>{
  res.send({
      cgv: cgv,
      lotte: lotte,
      trailer: a,
      lotteMovieDetail : MovieDetail
    });
});

module.exports = router;



