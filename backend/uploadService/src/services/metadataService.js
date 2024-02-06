const { MongoClient } = require('mongodb');

class metadataService {
    constructor(config){
        this.config = config;
        this.uploadService = this.config.databaseInfo.uploadService;
        this.connectionString = `${this.config.databaseInfo.connectionString}${this.uploadService.database}`;
    }
    
    async asyncCreateConnection() {
        //Setup connection
        try{
            const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
            console.log(`Successfully connect to ${this.uploadService.database}`);

            return client;
        } catch(error){
            console.log(`Fail to connect to ${this.uploadService.database}`);
            throw(error);
        }
    }

    async asyncInsertRecord(record) {
        let dbClient;
        try {
            dbClient = await this.asyncCreateConnection();
            const collection = dbClient.collection(this.uploadService.ImageCollection);
            const result = await collection.insertOne(data);
        } catch(error){
            throw(error);
        }finally{
            if(dbClient){
                dbClient.close();
            }
            console.log('Connection successfully close');
        }
    }

    async asyncReadRecord(){

    }

    async asyncUpdateRecord() {

    }

    async asyncDeleteRecord(){

    }
}


module.exports = metadataService;