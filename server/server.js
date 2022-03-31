const express = require('express');
const app = express();
const crawling = require('./Router/crawling');
const cors = require('cors');
const bodyParser = require("body-parser");
const trailer = require("./Router/trailer");


app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const port=5000; 




app.get('/', crawling);
app.get('/key', trailer);

app.post("/key", (req, res) => {
    key = req.body;
});





app.listen(port, ()=>{console.log(`Listening on port ${port}`)});