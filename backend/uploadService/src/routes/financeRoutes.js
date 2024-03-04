const express = require("express");

//Configure 3rd party - multer for temporary storage
const router = express.Router();

class FinanceRoutes{
    constructor(financeController) {
        this.financeController = financeController;
    }

    //Handle routing for finance api
    configureFinanceRoutes() {
        router.post("/insertReceiptRecord", async(request, response) => {
            try {
                await this.financeController.insertNewReceiptRecord(request, response);
            } catch(error) {
                console.error('Error handling database: ', error);
                response.status(500).json({ error: 'Internal Server Error' });
            }
        });

        router.put("/updateReceiptRecord", async(request, response) => {
            try {
                await this.financeController.updateReceiptRecordByUserIdAndObjectName(request, response);
            } catch(error) {
                console.error('Error handling database: ', error);
                response.status(500).json({ error: 'Internal Server Error' });
            }
        });

        router.get("/getReceiptRecordByUserId", async(request, response) => {
            try{
                await this.financeController.getReceiptRecordByUserId(request, response);
            } catch(error) {
                console.error('Error handling database: ', error);
                response.status(500).json({ error: 'Internal Server Error' });
            }
        });

        router.get("/getReceiptRecordsByUserIdAndObjectName", async(request, response) => {
            try {
                await this.financeController.getReceiptRecordByUserIdAndObjectName(request, response);
            } catch(error) {
                console.error('Error handling database: ', error);
                response.status(500).json({ error: 'Internal Server Error' });
            }
        });

        router.get("/getReceiptRecordsByUserIdAndDate", async(request, response) => {
            try {
                await this.financeController.getReceiptRecordByUserIdAndDate(request, response);
            } catch(error) {
                console.error('Error handling database: ', error);
                response.status(500).json({ error: 'Internal Server Error' });
            }
        });

        router.delete("/deleteReceiptRecordsByUserIdAndObjectName", async(request, response) => {
            try {
                await this.financeController.deleteReceiptRecordByUserIdAndObjectName(request, response);
            } catch(error) {
                console.error('Error handling database: ', error);
                response.status(500).json({ error: 'Internal Server Error' });
            }
        });

        router.delete("/readReceiptRecordByAi", async(request, response) => {
            try {
                await this.financeController.readReceiptRecordByAi(request, response);
            } catch(error) {
                console.error('Error handling database: ', error);
                response.status(500).json({ error: 'Internal Server Error' });
            }
        });

        return router;
    }
}

module.exports = FinanceRoutes;