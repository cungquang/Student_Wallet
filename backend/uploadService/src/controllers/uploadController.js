class uploadController {
    constructor(uploadService, uploadMetadataService) {
        this.uploadService = uploadService,
        this.uploadMetadataService = uploadMetadataService
    }

    async asyncUploadFile(request, response) {
        try {
            //Upload the file
            const objectName = await this.uploadService.asyncUploadObject(request.file);
            console.log(objectName);

            //Get object metadata
            const metadata = await this.uploadService.asyncGetObjectMetadata(objectName);

            //Store data into database
            
            //Response
            response.status(200).send(JSON.stringify(metadata));
        }catch(error){
            throw(error);
        }
    }

    async asyncGetSignedUrl(request, response) {
        try {
            const objectName = request.query.objectName;
            const signedUrl = await this.uploadController.asyncGetSignedUrl(objectName)

            //Response
            response.status(200).send(signedUrl);
        } catch (error) {
            throw(error);
        }
      }
}

module.exports = uploadController;