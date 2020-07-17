require('dotenv').config();

const dbName = process.env.db_name;
const dbHost = process.env.db_host;
const dbPort = process.env.db_port;

console.log('dbName:', dbName);

module.exports = {
    url: `mongodb://${dbHost}:${dbPort}/${dbName}`
};