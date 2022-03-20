const axios = require("axios"); 
const cheerio = require("cheerio");
var FormData = require('form-data');


    const getHTML = async() => {
        try{
            var form = new FormData(form)

            var dic = {"MethodName":"GetMoviesToBe",
                "channelType":"HO",
                "osType":"Chrome",
                "osVersion":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.74 Safari/537.36",
                "multiLanguageID":"KR",
                "division":1,
                "moviePlayYN":"Y",
                "orderType":"1",
                "blockSize":100,
                "pageNo":1,
                "memberOnNo":""};

            form.append('paramList', JSON.stringify(dic));

            const config = {header: {
                'Content-Type': "multipart/form-data",
                // 'user-agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.74 Safari/537.36',
                // 'referer': 'https://www.lottecinema.co.kr/NLCHS/Movie/List?flag=1'
            }};

            return await axios.post("https://www.lottecinema.co.kr/LCWS/Movie/MovieData.aspx",  form, config);
        }catch(err){
            console.log(err);
        }   
    }
    
    const parsing =async() => {
        const html = await getHTML();
        
        console.log(html);
}

    parsing();
