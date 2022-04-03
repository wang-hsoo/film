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


    for(let i = 0; i < 10; i++){
        if(key[i] === "AD"){
            continue;
        }else {
            if(a.length < 10){
                a.push(`https://caching.lottecinema.co.kr//Media/MovieFile/MovieMedia/202203/${key[i]}_301_1.mp4`);
            }else {
                break;
            }
            
        }
       
    }

    const getHtml = async() => {
        try{
            return await axios.get("https://www.lottecinema.co.kr/NLCHS/Movie/MovieDetailView?movie=18540");
            
        }catch(err){
            console.log(err);
        }
        
    }

    const parsing = async() => {
        const html = await getHtml();
        const $ = cheerio.load(html.data);
        const $coureList = $("#movie_trailer_0");
        
        $coureList.each((idx, node) => {
        
            const img =  $(node).find("a > em > img").attr("src");
            console.log(img);
            
        });
    }

   

    parsing();
    
});




router.get('/key', (req,res) => {
    res.send({
        name: "트레일러",
        key: a,
    });

    
});







module.exports = router;
