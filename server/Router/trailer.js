const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require("body-parser");
const axios = require("axios"); 

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
            a.push(`https://caching.lottecinema.co.kr//Media/MovieFile/MovieMedia/202203/${key[i]}_301_1.mp4`);
        }
       
    }
    
});




router.get('/key', (req,res) => {
    res.send({
        name: "트레일러",
        key: a,
    });

    
});







module.exports = router;
