const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;
db.url = require('./../config/db').url;
db.user = require('./user')(mongoose);
db.role = require('./role')(mongoose);

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
