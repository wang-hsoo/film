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

const a = [];




router.post('/key', (req, res) => {
    key = req.body;


    const trailerImg = async() => {

    
            
            for(let i = 0; i < 10; i++){
                if(key[i] === "AD"){
                    continue;
                }else {
                    if(img.length < 10){
                        var dic = {"MethodName":"GetMovieDetailTOBE","channelType":"HO","osType":"Chrome","osVersion":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.75 Safari/537.36","multiLanguageID":"KR","representationMovieCode":`${key[i]}`,"memberOnNo":""}
            
                        const html = await axios.post("https://www.lottecinema.co.kr/LCWS/Movie/MovieData.aspx", 'ParamList='+JSON.stringify(dic));
                        const imgUrl = html.data.Trailer.Items[0].ImageURL;
                        console.log(html.data);
                        a.push(
                            {mp4 : `https://caching.lottecinema.co.kr//Media/MovieFile/MovieMedia/202203/${key[i]}_301_1.mp4`, 
                            img : imgUrl }
                        );
                
                    }else {
                        break;
                    }
                    
                }
               
            }
        };
            
            

        trailerImg();
       
    
});




router.get('/key', (req,res) => {
    res.send({
        name: "트레일러",
        trailer: a,
        
    });

    
});








module.exports = router;
