const express = require("express");

//Configure 3rd party - multer for temporary storage
const router = express.Router();

class UploadFileDbRoutes{
    constructor(uploadFileDbService) {
        this.uploadFileDbService = uploadFileDbService;
    }

    configureUploadFileDbRoute() {
        router.post("/insert", async(request, response) => {
            try {
                await this.uploadFileDbService.asyncInsertRecord(request, response);
            } catch(error) {
                console.error('Error handling file upload: ', error);
                response.status(500).json({ error: 'Internal Server Error' });
            }
        });

        return router;
    }
}

module.exports = UploadFileDbRoutes;