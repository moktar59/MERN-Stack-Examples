const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

//Allow http://localhost:8081 as valid origin of request
var corsOption = {
    origin: 'http://localhost:8081'
};

app.use(corsOption);

//Parse request of content type = application/json
app.use(bodyParser.json());

//Parse request of content type = application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

//base route
app.get('/', (req, res) => {
    res.json({
        message: "Welcome to backend service."
    });
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Server is running at port:8080`);
});
