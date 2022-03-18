const express = require('express');
const app = express();
const test = require('./Router/test');
const cors = require('cors');

app.use(cors());

const port=5000; 

app.get('/', test);

app.listen(port, ()=>{console.log(`Listening on port ${port}`)});