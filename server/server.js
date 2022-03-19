const express = require('express');
const app = express();
const crawling = require('./Router/crawling');
const cors = require('cors');

app.use(cors());

const port=5000; 

app.get('/', crawling);

app.listen(port, ()=>{console.log(`Listening on port ${port}`)});