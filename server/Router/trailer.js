const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require("body-parser");
const axios = require("axios"); 
const router = express.Router();
require('../server.js');




let k;


app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());




router.get('/key', (req,res) => {
    res.send({
        name: "트레일러",
        key: key,
    });
});



const getKey = async() => {
    try{
        return await axios.get("http://localhost:5000/key");
    }catch(err){
        console.log(err);
    }
}

const parsing = async() => {
    const html = await getKey();
    
}


parsing();





module.exports = router;
