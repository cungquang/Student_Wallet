const mongodbhost = process.env.MONGODB_HOST || "127.0.0.1"; 

const MongoClient = require('mongodb').MongoClient;
const url =`mongodb://${mongodbhost}:27017`
const dbName = 'Unikeep';

console.log(url);

let _db;

async function dbConnection(){
    try{
        const client = await MongoClient.connect(url); 
        console.log('Connected to MongoDB');
        _db = client.db(dbName);
    } catch(error){
        console.error('Error while connecting to MongoDB: ', error);
        throw error;
    }
}

function getDB(){
    if(!_db){
        throw new Error('DB not connected');
    }
    return _db;
}

module.exports = {dbConnection, getDB};
