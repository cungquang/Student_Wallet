const express = require("express");

//Configure 3rd party - multer for temporary storage
const router = express.Router();

class UploadFileDbRoutes{
    constructor(uploadFileDbController) {
        this.uploadFileDbController = uploadFileDbController;
    }

    configureUploadFileDbRoute() {
        router.post("/insertRecord", async(request, response) => {
            try {
                this.uploadFileDbController.asyncInsertRecord(request, response);
            } catch(error) {
                console.error('Error handling database: ', error);
                response.status(500).json({ error: 'Internal Server Error' });
            }
        });

        return router;
    }
}

module.exports = UploadFileDbRoutes;