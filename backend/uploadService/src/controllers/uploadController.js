class uploadController {
    constructor(uploadService, metadataService) {
        this.uploadService = uploadService;
        this.metadataService = metadataService;
    }

    async asyncUploadFile(request, response) {
        try {
            //Upload the file
            const objectId = await this.uploadService.asyncUploadObject(request.file);

            //Get object metadata
            const metadata = await this.uploadService.asyncGetObjectMetadata(objectId);
            
            //Store data into database

            //Signed url - for processing data
            const signedUrl = await this.uploadService.asyncSignedUrl(objectId);

            //Call Financial Service for processing data


            //Response
            response.status(200).send(JSON.stringify(metadata));
        }catch(error){
            throw(error);
        }
    }

    async asyncGetSignedUrl(request, response) {
        try {
            const objectName = request.query.objectName;
            const signedUrl = await this.uploadService.asyncSignedUrl(objectName)

            //Response
            response.status(200).send(signedUrl);
        } catch (error) {
            throw(error);
        }
      }
}

module.exports = uploadController;