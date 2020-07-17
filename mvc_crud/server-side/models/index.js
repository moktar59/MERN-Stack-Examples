const mongoose = require('mongoose');
const dbConfig = require('./../config/db');

mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.tutorials = require('./tutorial.model')(mongoose);

module.exports = db;

