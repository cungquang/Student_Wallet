const { MongoClient } = require('mongodb');

class UploadFileDbService {
    constructor(config){
        //Check if not initiate
        if (UploadFileDbService.instance){
            return UploadFileDbService.instance;
        }
        
        this.config = config;
        this.uploadService = this.config.databaseInfo.UploadService;
        this.connectionString = `${this.config.databaseInfo.connectionString}${this.uploadService.database}`;
        this.client = null;

        //Singleton design pattern -> force the class: ensure this is the only instance of the class through entire application 
        // In case use create another class -> this force to only have 1 instance
        UploadFileDbService.instance = this; 
    }
    
    async asyncConnect() {
        if (!this.client) {
            try {
                this.client = await MongoClient.connect(this.connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
                console.log(`Connected to database: ${this.uploadService.database}`);
            } catch (error) {
                console.error(`Fail to connect to database: ${this.uploadService.database}`, error);
                throw error;
            }
        }
        return this.client;
    }

    asyncDisconnect() {
        if(this.client){
            try{
                this.client.close();
                console.log('Database connection closed');
            } catch(error) {
                console.log('Error in closing database')
                throw(error);
            } finally{
                this.client = null;
            }
        }
    }

    async asyncInsertRecord(record) {
        try {
            const collection = this.client.collection(this.uploadService.ImageCollection);
            await collection.insertOne(record);
        } catch(error){
            throw(error);
        }
    }

    async asyncReadRecordById(userId){
        try{
            const collection = this.client.collection(this.uploadService.ImageCollection);
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