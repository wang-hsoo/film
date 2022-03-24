const axios = require("axios"); 
const cheerio = require("cheerio");
var FormData = require('form-data');
let lotte = [];

    const getHTML = async() => {
        try{
            var form = new FormData(form)

            var dic = {"MethodName":"GetMoviesToBe","channelType":"HO","osType":"Chrome","osVersion":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.82 Safari/537.36","multiLanguageID":"KR","division":1,"moviePlayYN":"Y","orderType":"1","blockSize":100,"pageNo":1,"memberOnNo":""}

            form.append('ParamList', JSON.stringify(dic));

            const config = {header: {
                'Content-Type': "multipart/form-data",
                // 'user-agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.74 Safari/537.36',
                // 'referer': 'https://www.lottecinema.co.kr/NLCHS/Movie/List?flag=1'
            }};

            return await axios.post("https://www.lottecinema.co.kr/LCWS/Movie/MovieData.aspx",  'ParamList='+JSON.stringify(dic));
        }catch(err){
            console.log(err);
        }   
    }
    
    const parsing =async() => {
        const html = await getHTML();
        const $ = cheerio.load(html.data);
        const $coureList = $(".movie_list type2 > li");

        
        const Movies = html.data.Movies.Items;
        
        
        for(let i = 0; i < Movies.length;i++){
            lotte.push({
                title: Movies[i].MovieNameKR
                
            })
        }
        console.log(lotte);
        
}

    parsing();
