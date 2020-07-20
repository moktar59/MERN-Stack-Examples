const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;
db.url = require('./../config/db').url;
db.user = require('./user');
db.role = require('./role');

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
