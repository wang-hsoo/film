const express = require('express');
const router = express.Router();
const axios = require("axios"); 
const cheerio = require("cheerio");
let cgv = [];
let lotte = [];

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
        
        cgv.push({
            company: "CGV",
            title: $(node).find(".title").text(),
            percent: $(node).find(".percent").text(),
            open: $(node).find(".txt-info").text().replace(/\n/g, "").replace(/\s*/g, ""),
            img: $(node).find(".thumb-image > img").attr("src"),
            age: $(node).find(".thumb-image > span").text(),
            key: $(node).find(".box-image > a").attr("href")
        })
        
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
            })
        }
        
}

    parsing();

}

getCgv();
getLotte();


router.get('/', (req, res)=>{
  res.send({
      cgv: cgv,
      lotte: lotte
    });
});

module.exports = router;


