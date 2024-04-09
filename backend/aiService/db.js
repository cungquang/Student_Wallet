const MongoClient = require('mongodb').MongoClient;
const url ="mongodb://mongoDB372:27017"
const dbName = 'asn-db';

let _db;

async function dbConnection(){
    try{
        const client = await MongoClient.connect(url); 
        _db = client.db(dbName);
        console.log('Connected to MongoDB');
    } catch(error){
        console.error('Error while connecting to MongoDB: ', error);
        throw error;
    }
}

function getDB(){
    if(!_db){
        console.log('DB not connected');
        throw new Error('DB not connected');
    }
    return _db;
}

module.exports = {dbConnection, getDB};
