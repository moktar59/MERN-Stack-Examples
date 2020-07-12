const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();


const app = express();

//Allow http://localhost:8081 as valid origin of request
var corsOption = {
    origin: 'http://localhost:3000'
};

app.use(cors(corsOption));

//Parse request of content type = application/json
app.use(bodyParser.json());

//Parse request of content type = application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

//Database connection
const mongoose = require('mongoose');
const dbConfig = require('./config/db.js');

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

console.log("dbConfg:", dbConfig);

//base route
app.get('/', (req, res) => {
    res.json({
        message: "Welcome to backend service."
    });
});

const port = process.env.PORT || 8081;

app.listen(port, () => {
    console.log(`Server is running at port:${port}`);
});
