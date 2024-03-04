/*
Document structure:
{
    _id: (default)
    userId: uuid
    objectName: uuid
    totalCost: number
    totalTax: number
    ReceiptLine: []
}
*/

class FinanceController{
    constructor(financeRepository){
        this.financeRepository = financeRepository;
    }

    //Function to insert receipt record
    async insertNewReceiptRecord(request, response){
        try{
            const body = request.body;

            //Found match existence record
            if(await this.uploadFileRepository.asyncResourceExit( { userId: body.userId, objectName: body.objectName }) > 0){
                response.status(400).send("Bad request.");
                return;
            } 

            const record = {
                userId: body.userId,
                objectName: body.objectName,
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
    async updateReceiptRecordByIdAndObjectName(request, response) {
        try {
            body = request.body

            //Missing query param
            if (Object.keys(body).length === 0 || !Object.keys(body).includes("userId") || !Object.keys(body).includes("objectName")) {
                response.status(400).send("Bad request.");
                return;
            }

            //Unauthorized record OR non existence
            if(await this.uploadFileRepository.asyncResourceExit( { userId: body.userId, objectName: body.objectName }) <= 0){
                response.status(404).send("Unauthorized request.");
                return;
            } 

            const filter = { 
                userId: body.userId,
                objectName: body.objectName
            };

            const updatedData = body.updatedData;
            const result = await this.uploadFileRepository.asyncUpdateRecord(filter, updatedData);
            response.status(200).send(JSON.stringify(result));
        } catch(error){
            throw(error);
        }
    }

    //Function to read receipt record
    async getReceiptRecordByIdAndObjectName(request, response) {
        try {
            //Missing query param
            if (Object.keys(request.query).length === 0 || !Object.keys(request.query).includes("userId") || !Object.keys(request.query).includes("objectName")) {
                response.status(400).send("Bad request.");
                return;
            }


            response.status(200).send(JSON.stringify());
        } catch(error) {
            throw(error);
        }
    }

    //Function to delete receipt record

    //Function to read receipt record
}