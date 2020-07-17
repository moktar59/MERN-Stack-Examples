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
const db = require('./models');

db.mongoose.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('connected to db.');
}).catch (err => {
    console.log("Couldn't connect to db. Error:", err);
    process.exit();
});


//base route
app.get('/', (req, res) => {
    res.json({
        message: "Welcome to backend service."
    });
});

require('./routes/tutorial.routes')(app);

const port = process.env.PORT || 8081;

app.listen(port, () => {
    console.log(`Server is running at port:8080`);
});
