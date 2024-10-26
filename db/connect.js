
const dotenv = require('dotenv');
const { call } = require("body-parser");
const MongoClient = require('mongodb').MongoClient;
dotenv.config();

let db;

const initDB = (callback) => {
    if(db) {
        console.log('Db is already initialized');
        return call(null, db);
    }
    MongoClient.connect(process.env.MONGODB_URI)
    .then((client) => {
        db = client;
        callback(null, db);
        })
        .catch((err) => {
            callback(err);
            });
};


const getDb = () => {
    if (!db){
        throw Error('Db not initialized')
    }
    return db;
};

module.exports = { initDB, getDb };
