const express = require('express');
const router = express.Router();
const axios = require("axios"); 
const cheerio = require("cheerio");
let cgv = [];

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
        })
        
    });

}


    parsing();

}

function getMega(){
    

}

getCgv();


router.get('/', (req, res)=>{
  res.send({cgv: cgv});
});

module.exports = router;


