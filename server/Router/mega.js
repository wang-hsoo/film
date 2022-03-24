const axios = require("axios"); 
const cheerio = require("cheerio");
var FormData = require('form-data');


    const getHTML = async() => {
        try{
            

            var dic = {"masterType":"brch",
                        "detailType": "area",
                        "brchNo": "1372",
                        "firstAt":"N",
                        "brchNo1":"1372",
                        "crtDe":"20200315",
                        "playDe":"20200315"};


            const config = {header: {
                'Content-Type': "multipart/form-data",
                // 'user-agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.74 Safari/537.36',
                // 'referer': 'https://www.lottecinema.co.kr/NLCHS/Movie/List?flag=1'
            }};

            return await axios.post("https://www.megabox.co.kr/on/oh/oha/Movie/selectMovieList.do",  'ParamList='+JSON.stringify(dic));
        }catch(err){
            console.log(err);
        }   
    }
    
    const parsing =async() => {
        const html = await getHTML();
        const $ = cheerio.load(html.data);
        const $coureList = $(".movieList");
       
        
        
        $coureList.each((idx, node) => {
            console.log(node);
        
        });
}

    parsing();