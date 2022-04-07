const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require("body-parser");
const axios = require("axios"); 
const cheerio = require("cheerio");

const router = express.Router();



app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());







    const getHtml = async() => {
        try{
            var dic = {"MethodName":"GetMovieDetailTOBE","channelType":"HO","osType":"Chrome","osVersion":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.75 Safari/537.36","multiLanguageID":"KR","representationMovieCode":"18551","memberOnNo":""}
            
            return await axios.post("https://www.lottecinema.co.kr/LCWS/Movie/MovieData.aspx", 'ParamList='+JSON.stringify(dic));
            
        }catch(err){
            console.log(err);
        }
        
    }

    const parsing = async() => {
        const html = await getHtml();


        console.log(html.data.Trailer.Items[0].ImageURL);
        
        
    }

   

    parsing();
    

