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
                await this.uploadFileDbController.asyncInsertRecord(request, response);
            } catch(error) {
                console.error('Error handling database: ', error);
                response.status(500).json({ error: 'Internal Server Error' });
            }
        });

        router.put("/updateRecord", async(request, response) => {
            try {
                await this.uploadFileDbController.asyncUpdateRecord(request, response);
            } catch(error) {
                console.error('Error handling database: ', error);
                response.status(500).json({ error: 'Internal Server Error' });
            }
        });

        router.get("/getDistinctRecordsById", async(request, response) => {
            try {
                await this.uploadFileDbController.asyncGetAllRecordsById(request, response);
            } catch(error) {
                console.error('Error handling database: ', error);
                response.status(500).json({ error: 'Internal Server Error' });
            }
        });

        router.get("/getRecordsByIdAndDate", async(request, response) => {
            try {
                await this.uploadFileDbController.asyncGetRecordsByIdAndDate(request, response);
            } catch(error) {
                console.error('Error handling database: ', error);
                response.status(500).json({ error: 'Internal Server Error' });
            }
        });

        return router;
    }
}

module.exports = UploadFileDbRoutes;