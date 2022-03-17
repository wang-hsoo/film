const axios = require("axios"); 
const cheerio = require("cheerio");

const getHTML = async() => {
    try{
        return await axios.get("http://www.cgv.co.kr/movies/?lt=1&ft=0");
    }catch(err){
        console.log(err);
    }   
}

const parsing =async() => {
    const html = await getHTML();
    const $ = cheerio.load(html.data);
    const $coureList = $(".sect-movie-chart");

    let courses = [];

   $coureList.each((idx, node) => {
    courses[idx] = {
        title: $(node).find(".title").text(),
    };
   });

    console.log(courses);
    
}

parsing();

