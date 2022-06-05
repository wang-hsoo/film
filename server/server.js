const express = require('express');
const app = express();
const crawling = require('./Router/crawling');
const cors = require('cors');
const bodyParser = require("body-parser");
const cron = require('node-cron');


app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const port=5000; 




app.get('/', crawling);






app.listen(port, ()=>{console.log(`Listening on port ${port}`)});