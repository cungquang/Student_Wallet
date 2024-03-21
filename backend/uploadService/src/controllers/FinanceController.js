/*
Document structure:
{
    _id: (default)
    userId: uuid
    objectName: uuid
    totalCost: number
    totalTax: number
    receiptLine: []
}
*/

class FinanceController{
    constructor(financeRepository, azureAiService){
        this.financeRepository = financeRepository;
        this.azureAiService = azureAiService;
    }

    //Function to insert receipt record
    async insertNewReceiptRecord(request, response){
        try{
            const body = request.body;

            //Found match existence record
            if(await this.financeRepository.asyncResourceExit( { userId: body.userId, objectName: body.objectName }) > 0){
                response.status(400).send("Bad request.");
                return;
            } 

            const record = {
                userId: body.userId,
                objectName: body.objectName,
                createdDate: new Date(body.createdDate),
                lastModified: new Date(body.lastModified),
                merchantName: body.merchantName,
                totalCost: body.totalCost,
                totalTax: body.totalTax,
                receiptLine: body.receiptLine
            }
            
            await this.financeRepository.asyncInsertRecord(record)
            response.status(200).send({complete: true});
        } 
        catch(error){
            throw(error);
        }
    }

    //Function to update receipt record
    async updateReceiptRecordByUserIdAndObjectName(request, response) {
        try {
            const body = request.body

            //Missing query param
            if (Object.keys(body).length === 0 || !Object.keys(body).includes("userId") || !Object.keys(body).includes("objectName")) {
                response.status(400).send("Bad request.");
                return;
            }

            //Unauthorized record OR non existence
            if(await this.financeRepository.asyncResourceExit( { userId: body.userId, objectName: body.objectName }) <= 0){
                response.status(404).send("Unauthorized request.");
                return;
            } 

            const filter = { 
                userId: body.userId,
                objectName: body.objectName
            };

            const updatedData = body.updatedData;
            const result = await this.financeRepository.asyncUpdateRecord(filter, updatedData);
            response.status(200).send(JSON.stringify(result));
        } catch(error){
            throw(error);
        }
    }

    //Function to read receipt record by userId and objectName
    async getReceiptRecordByUserIdAndObjectName(request, response) {
        try {
            //Missing query param
            if (Object.keys(request.query).length === 0 || !Object.keys(request.query).includes("userId") || !Object.keys(request.query).includes("objectName")) {
                response.status(400).send("Bad request.");
                return;
            }

            const filter = {
                userId: request.query.userId,
                objectName: request.query.objectName
            }

            const result = await this.financeRepository.asyncReadRecordByCondition(filter);
            response.status(200).send(JSON.stringify(result));
        } catch(error) {
            throw(error);
        }
    }

    //Function to read receipt record by userId
    async getReceiptRecordByUserId(request, response) {
        try {
            //Missing query param
            if (Object.keys(request.query).length === 0 || !Object.keys(request.query).includes("userId")) {
                response.status(400).send("Bad request.");
                return;
            }

            const filter = {
                userId: request.query.userId
            }
            const result = await this.financeRepository.asyncReadRecordByCondition(filter);
            response.status(200).send(JSON.stringify(result));
        } catch(error) {
            throw(error);
        }
    }

    //Function to read receipt record by userId
    async getReceiptRecordByUserIdAndDate(request, response) {
        try {
            //Missing query param
            if (Object.keys(request.query).length === 0 || !Object.keys(request.query).includes("userId")) {
                response.status(400).send("Bad request.");
                return;
            }

            const startDate = new Date(request.query.startDate);
            const endDate = new Date(request.query.endDate);

            const filter = {
                userId: request.query.userId,
                createdDate: { $gte: startDate, $lte: endDate }
            };

            const result = await this.financeRepository.asyncReadRecordByCondition(filter);
            response.status(200).send(JSON.stringify(result));
        } catch(error) {
            throw(error);
        }
    }

    //Function to delete receipt record
    async deleteReceiptRecordByUserIdAndObjectName(request, response) {
        try {
            if(Object.keys(request.query).length === 0 || !Object.keys(request.query).includes("userId") || !Object.keys(request.query).includes("objectName")) {
                response.status(400).send("Bad request.");
                return;
            }

            const recordId = {
                userId: request.query.userId,
                objectName: request.query.objectName
            }
            
            const result = await this.financeRepository.asyncDeleteRecord(recordId);
            response.status(200).send(JSON.stringify(result));
        }catch(error){
            throw(error);
        }
    }
    
    //Function to call AI Service to read receipt
    async readReceiptRecordByAi(request, response) {
        try {
            if(Object.keys(request.query).length === 0 || !Object.keys(request.query).includes("RequestUrl")) {
                response.status(400).send("Bad request.");
                return;
            }

            const result = await this.azureAiService.asyncReadReceipt(request.body.RequestUrl);
            response.status(200).send(JSON.stringify(result));
        } catch(error) {
            throw(error);
        }
    }
}

module.exports = FinanceController;