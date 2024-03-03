const { Storage } = require('@google-cloud/storage');
const utils = require('../utils/utils');

const optionSignedUrl = {
    version: 'v4',                          //use v4 signing algorithm
    action: 'read',                         //specify action
    expires: Date.now() + 15*60*1000        //set limit time access - 15 minutes
};

const optionDelete = {
    storageClass: 'STANDARD'
}


class UploadService {
    constructor(config) {
        this.config = config;
        this.BlobStorage = new Storage({
            projectId: this.config.googleCloudInfo.projectId,
            keyFilename: this.config.googleCloudInfo.credentialFilePath
        });

        this.bucket = this.BlobStorage.bucket(this.config.googleCloudInfo.bucketName);
    }

    //Upload the file to Google bucket
    async asyncUploadObject(file) {
        try{
            if(!file) {
                throw new Error('File does not exist');
            }

            const subpart = file.originalname.split('.')

            //Initiate the blob
            const blobInstance = this.bucket.file(`${utils.generateUuid()}.${subpart[subpart.length - 1] }`);
            
            //Create a stream for writing
            const blobStreamWrite = blobInstance.createWriteStream();
            
            //Create an instance - of promise => receive 2 args: resolve, reject
            //resolve -> handle the success
            //reject -> handle failure
            return new Promise((resolve, reject) => {
                //Success deliver the message
                blobStreamWrite.on('finish', () =>{
                    resolve(blobInstance.name);
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

    async asyncGetObjectMetadata(objectName){
        try {
            // Get the object metadata
            const [metadata] = await this.bucket.file(objectName).getMetadata();

            return metadata;
        } catch (error) {
            console.error('Error fetching object metadata:', error);
            throw error;
        }
    }

    async asyncSignedUrl(objectName){
        const signedUri = await this.bucket.file(objectName).getSignedUrl(optionSignedUrl)
        return signedUri[0];
    }

    async asyncDelete(objectName) {
        try {
            //Need to verify before delete
            await this.bucket.file(objectName).delete(optionDelete);
            return 'Success';
        } catch(error) {
            throw(error);
        }
        
    }
}

module.exports = UploadService;