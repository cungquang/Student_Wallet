/*
Document structure:
{
    _id: (default)
    userId: uuid
    objectName: uuid
    createdDate: date
    lastModified: date
    isRead: bool
    isReceipt: bool
}
*/

class UploadFileDbController {
    constructor(uploadFileRepository){
        this.uploadFileRepository = uploadFileRepository;
    }

    //Function to insert records
    async asyncInsertRecord(request, response) {
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
                createdDate: new Date(body.createdDate),
                lastModified: new Date(body.lastModified),
                isRead: body.isRead,
                isReceipt: body.isReceipt
            }
            
            await this.uploadFileRepository.asyncInsertRecord(record);
            response.status(200).send({complete: true});
        } catch(error) {
            throw(error);
        }
    }

    //Function to update the record contents
    async asyncUpdateRecord(request, response) {
        try{
            //Missing query param
            if (Object.keys(request.query).length === 0 || !Object.keys(request.query).includes("userId") || !Object.keys(request.query).includes("objectName")) {
                response.status(400).send("Bad request.");
                return;
            }

            //Unauthorized record OR non existence
            if(await this.uploadFileRepository.asyncResourceExit( { userId: request.query.userId, objectName: request.query.objectName }) <= 0){
                response.status(404).send("Bad request.");
                return;
            } 

            const filter = { 
                userId: request.query.userId,
                objectName: request.query.objectName
            };

            console.log(request.body);
            const updatedData = request.body;
            const result = await this.uploadFileRepository.asyncUpdateRecord(filter, updatedData);
            response.status(200).send(JSON.stringify(result));
        } catch(error){
            throw(error);
        }
    }

    //Function to read records by Id 
    async asyncGetAllRecordsById(request, response) {
        try {
            if(Object.keys(request.query).length === 0 || !Object.keys(request.query).includes("userId")) {
                response.status(400).send("Bad request.");
                return;
            }

            const filter = {
                userId: request.query.userId
            }
            const result = await this.uploadFileRepository.asyncReadRecordByCondition(filter);
            response.status(200).send(JSON.stringify(result));
        } catch(error) {
            throw(error)
        }
    }

    //Function to read records by Id & Date range
    async asyncGetRecordsByIdAndDate(request, response) {
        try{
            if(Object.keys(request.query).length === 0 || !Object.keys(request.query).includes("userId")) {
                response.status(400).send("Bad request.");
                return;
            }

            const startDate = new Date(request.query.startDate);
            const endDate = new Date(request.query.endDate);

            const filter = {
                userId: request.query.userId,
                createdDate: { $gte: startDate, $lte: endDate }
            };

            const result = await this.uploadFileRepository.asyncReadRecordByCondition(filter);
            response.status(200).send(JSON.stringify(result));
        } catch(error) {
            throw(error);
        }
    }
}


module.exports = UploadFileDbController;