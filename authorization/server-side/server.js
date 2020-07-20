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
const Role = db.role;

console.log("db=", db);

db.mongoose.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Database connected successfully.");
    initial();
}).catch (err => {
    console.error("Failed to connect to db. Error: ", err);
    process.exit();
});


//base route
app.get('/', (req, res) => {
    res.json({
        message: "Welcome to backend service."
    });
});

require('./routes/auth')(app);
require('./routes/user')(app);

const port = process.env.port || 8081;

app.listen(port, () => {
    console.log(`Server is running at port:8080`);
});


function initial() {
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new Role({
                name: "user"
            }).save(err => {
                if (err) {
                    console.error("Error while saving Role. Error: ", err);
                }
                console.log("Added user to Role Collection.");
            });

            new Role({
                name: "moderator"
            }).save(err => {
                if (err) {
                    console.error("Error while saving Role to db. Error: ", err);
                }

                console.log("Added moderator Role to Collection.");
            });

            new Role({
                name: "admin"
            }).save(err => {
                if (err) {
                    console.log("Error while saving Role to db.");
                }
                
                console.log("Added admin Role to Collection.");
            });
        }
    });
}