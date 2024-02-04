class uploadController {
    constructor(uploadService, uploadMetadataService) {
        this.uploadService = uploadService,
        this.uploadMetadataService = uploadMetadataService
    }

    async asyncUploadFile(request, response) {
        try {
            if (!request.file){
                return response.status(400).send('Invalid request, no file uploaded.');
            }
            
            //Upload the file
            const responseUrl = await this.uploadService.asyncUploadFile(request.fileUrl);

            //Store data into database

            response.status(200).send(responseUrl);
        }catch(error){
            console.error('Error uploading file: ', error);
            response.status(500).json({ error: 'Internal Server Error'});
        }
    }

    async asyncGetUploadFileURL(request, response) {
        console.log('return an upload url');
    }
}

module.exports = uploadController;