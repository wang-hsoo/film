const axios = require("axios"); 
const cheerio = require("cheerio");
let mega = [];


const getHTML = async() => {
    try{
        return await axios.get("https://www.lottecinema.co.kr/NLCHS/Movie/List?flag=1");
    }catch(err){
        console.log(err);
    }   
}

const parsing =async() => {
    const html = await getHTML();
    const $ = cheerio.load(html.data);
    const $coureList = $(".movie_list type2");

    



$coureList.each((idx, node) => {
    const title = $(node).find(".tit_info").text();

    console.log(title);

    mega.push({
        company: "MEGABOX",
        title: $(node).find(".tit_info").text(),
        percent: $(node).find(".rate_info").text().replace(/\n/g, "").replace(/\s*/g, ""),
        // open: $(node).find(".date").text(),
        img: $(node).find(".poster_info > img").attr("src"),
        // age: $(node).find(".tit-area > p:first-child").ClassName()
    })
    
});

// console.log(mega);
}


parsing();