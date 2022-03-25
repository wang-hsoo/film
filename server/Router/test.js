const axios = require("axios"); 
const cheerio = require("cheerio");
var FormData = require('form-data');
let lotte = [];

const getHTML = async() => {
    try{
        return await axios.get("https://caching2.lottecinema.co.kr/lotte_image/2022/Hot/0323/Hot_1920774.jpg");
    }catch(err){
        console.log(err);
    }   
}

const parsing =async() => {
    const html = await getHTML();
    const $ = cheerio.load(html.data);
    const $coureList = $(".item");
    
    console.log(html);
    

$coureList.each((idx, node) => {
    const img = $(node).find("a > img").attr("src");
    
    
    lotte.push({
        img: $(node).find("a > img").attr("src"),
    })
    
});


}


parsing();
