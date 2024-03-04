const express = require("express");

//Configure 3rd party - multer for temporary storage
const router = express.Router();

class FinanceRoutes{
    constructor(financeController) {
        this.financeController = financeController;
    }

    configureFinanceRoutes() {
        router.post("/insertReceiptRecord", async(request, response) => {
            try {
                await this.financeController.insertNewRecord(request, response);
            } catch(error) {
                console.error('Error handling database: ', error);
                response.status(500).json({ error: 'Internal Server Error' });
            }
        });

        router.put("/updateReceiptRecord", async(request, response) => {
            try {
                await this.financeController.updateRecordByIdAndObjectName(request, response);
            } catch(error) {
                console.error('Error handling database: ', error);
                response.status(500).json({ error: 'Internal Server Error' });
            }
        });

        router.get("/getReceiptRecordsByIdAndObjectName", async(request, response) => {
            try {
                await this.financeController.getRecordByIdAndObjectName(request, response);
            } catch(error) {
                console.error('Error handling database: ', error);
                response.status(500).json({ error: 'Internal Server Error' });
            }
        });

        router.get("/getReceiptRecordsByIdAndDate", async(request, response) => {
            try {
                await this.financeController.asyncGetRecordsByIdAndDate(request, response);
            } catch(error) {
                console.error('Error handling database: ', error);
                response.status(500).json({ error: 'Internal Server Error' });
            }
        });

        return router;
    }
}

module.exports = FinanceRoutes;