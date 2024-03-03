const { MongoClient } = require('mongodb');

/*
Document structure:
{
    _id:{
        userId: uuid
        objectName: uuid
    }
    createdDate: date
    lastModified: date
    originalName: string
    isRead: bool
    isReceipt: bool
}
*/

DB_NAME = "UploadImageDB";
COLLECTION_NAME = "Image";

class UploadFileRepository {
    constructor(client){
        this.client = client;
        this.collection = this.client.db(DB_NAME).collection(this.collection);
    }

    async asyncInsertRecord(record) {
        try {
            await this.collection.insertOne(record);
        } catch(error){
            throw(error);
        }
    }

    async asyncDeleteRecord(recordId) {
        try {
            const result = await this.collection.deleteOne(recordId);
            return result;
        }catch(error) {
            throw(error);
        }
    }

    async asyncUpdateRecord(recordId, updatedData) {
        try {
            const result = await this.collection.updateOne(recordId, { $set: updatedData });
            return result.modifiedCount; 
        } catch(error) {
            throw(error);
        }
    }
    
    async asyncReadRecordById(userId){
        try{
            const records = await this.collection.find(userId).toArray();
            return records;
        } catch(error){

        }
    }

    async asyncGetAllDistinctRecordId() {
        try{
            return await this.collection.distinct("_id");
        } catch(error) {
            throw(error);
        }
    }
}


module.exports = UploadFileRepository;