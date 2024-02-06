const { Storage } = require('@google-cloud/storage');
const utils = require('../utils/utils');
const configs = require('../configs/configs');

const BlobStorage = new Storage({
    projectId: configs.projectId,
    keyFilename: configs.credentialFilePath
});

class UploadService {
    constructor() {
        this.bucket = BlobStorage.bucket(configs.googleCloudInfo.bucketName);
    }

    async asyncUploadFile(file) {
        try{
            if(!file) {
                throw new Error('File does not exist');
            }
            
            //Initate the blob
            const blobInstance = this.bucket.file(utils.generateUuid());
            
            //Create a stream for writing
            const blobStreamWrite = blobInstance.createWriteStream();
            
            //Create an instance - of promise => receive 2 args: resolve, reject
            //resolve -> handle the success
            //reject -> handle failure
            return new Promise((resolve, reject) => {
                //Success deliver the message
                blobStreamWrite.on('finish', () =>{
                    resolve('File Upload successfully')
                });

                //Catch error
                blobStreamWrite.on('error', (error) => {
                    reject(error);
                });

                //Wait for complete
                blobStreamWrite.end(file.buffer)
            });
        }catch (error){
            throw error;
        }
    }
}

module.exports = UploadService(;