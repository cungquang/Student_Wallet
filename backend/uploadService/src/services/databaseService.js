const { MongoClient } = require('mongodb');

class DatabaseService {
    constructor(connectionString) {
        if(!DatabaseService.client){
            this.connectionString = connectionString;
            this.client = new MongoClient(this.connectionString);
            DatabaseService.instance = this;
        }

        return DatabaseService.instance;
    }

    async asyncConnect() {
        try {
            await this.client.connect();
            console.log('Connected to the database');
        } catch(error){
            throw(error);
        }
    }

    async asyncDisconnect() {
        try {
            await this.client.close();
            console.log('Disconnected from the database');
        } catch (error) {
            throw new Error(`Error disconnecting from the database: ${error.message}`);
        }
    }

    async asyncResourceExist(filter) {
        try{
            return await this.collection.countDocuments(filter);
        } catch(error){
            throw(error);
        }
    }
}

module.exports = DatabaseService;