const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require("body-parser");
const router = express.Router();


app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

let text = require('../server.js');


router.get('/key', (req,res) => {
    res.send({
        name: "트레일러",
        body: text.text,
    });
});



module.exports = router;