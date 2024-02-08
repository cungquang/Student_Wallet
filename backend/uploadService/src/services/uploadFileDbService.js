const { MongoClient } = require('mongodb');

class UploadFileDbService {
    constructor(config){
        //Check if not initiate
        if (UploadFileDbService.instance){
            return UploadFileDbService.instance;
        }
        
        this.config = config;
        this.connectionString = `${this.config.databaseInfo.connectionString}/${this.config.databaseInfo.databaseName}`;

        //Singleton design pattern -> force the class: ensure this is the only instance of the class through entire application 
        // In case use create another class -> this force to only have 1 instance
        UploadFileDbService.instance = this; 
    }

    async asyncInsertRecord(record) {
        try {
            this.client = await MongoClient.connect(this.connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
            const db = this.client.db(this.config.databaseInfo.databaseName); // Access the database
            await db.collection("Image").insertOne(record);
        } catch(error){
            throw(error);
        } finally{
            if(this.client){
                this.client.close();
            }
        }
    }

    async asyncReadRecordById(userId){
        try{
            const collection = this.client.getCollection(this.uploadService.ImageCollection);
            const records = await collection.find(userId).toArray();
            return records;
        } catch(error){

        }
    }

    async asyncUpdateRecord() {
        
    }

    async asyncDeleteRecord(){

    }
}


module.exports = UploadFileDbService;