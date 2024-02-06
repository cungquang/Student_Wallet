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
            const signedUri = await this.uploadService.asyncGetSignedUrl(objectName);
            console.log(signedUri);
            
            //Store data into database


            response.status(200).send(JSON.stringify(metadata));
        }catch(error){
            console.error('Error uploading file: ', error);
            response.status(500).json({ error: 'Internal Server Error'});
        }
    }

    async asyncGetUploadFileURL(request, response) {
        try {
          console.log('Returning an upload URL');
          // Depending on your use case, you might want to send a response to the client here
          response.status(200).json({ message: 'Returning an upload URL' });
        } catch (error) {
          console.error('Error getting upload URL: ', error);
          response.status(500).json({ error: 'Internal Server Error' });
        }
      }
}

module.exports = uploadController;