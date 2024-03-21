const FIN_DB_NAME = "FinanceDB";
const FIN_COLLECTION_NAME = "ReceiptRecord";

class FinanceRepository {
    constructor(client){
        this.client = client;
        this.collection = this.client.db(FIN_DB_NAME).collection(FIN_COLLECTION_NAME);
    }

    //Function to insert new records
    async asyncInsertRecord(record) {
        try {
            const result = await this.collection.insertOne(record);
            return result;
        } catch(error){
            throw(error);
        }
    }

    async asyncDeleteRecord(recordId) {
        try {
            return await this.collection.deleteOne(recordId);
        }catch(error) {
            throw(error);
        }
    }

    //Function to update the content of record
    async asyncUpdateRecord(recordId, updatedData) {
        try {
            const result = await this.collection.updateOne(recordId, { $set: updatedData });
            return result.modifiedCount; 
        } catch(error) {
            throw(error);
        }
    }
    
    //Function to read/get record by conditions
    async asyncReadRecordByCondition(filter){
        try{
            const records = await this.collection.find(filter).toArray();
            return records;
        } catch(error){
            throw(error);
        }
    }

    //Function to verify resources exist
    async asyncResourceExit(filter){
        try{
            const db = this.client.db(FIN_DB_NAME).collection(FIN_COLLECTION_NAME);
            const count = await db.countDocuments(filter);
            return count;
        } catch(error) {
            throw(error);
        }
    }
}


module.exports = FinanceRepository;