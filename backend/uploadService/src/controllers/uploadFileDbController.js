class UploadFileDbController {
    constructor(uploadFileRepository){
        this.uploadFileRepository = uploadFileRepository;
    }

    async asyncInsertRecord(request, response) {
        try{
            const body = request.body;
            //Found match existence record
            if(await this.recipeRepository.asyncResourceExit( { userId: body.userId, objectName: body.objectName }) > 0){
                res.status(400).send("Bad request.");
                return;
            } 

            const record = {
                _id: {
                    userId: body.userId,
                    objectName: body.objectName
                },
                createdDate: body.createdDate,
                lastModified: body.lastModified,
                originalName: body.originalName,
                isRead: body.isRead,
                isReceipt: body.iseReceipt
            }
            await this.uploadFileRepository.asyncInsertRecord(record);
            response.status(200).send({complete: true});
        } catch(error) {
            throw(error);
        }
    }

    async asyncUpdateRecord(request, response) {
        try{
            //Missing query param
            if (Object.keys(req.query).length === 0 || !Object.keys(req.query).includes("userId") || !Object.keys(req.query).includes("objectName")) {
                res.status(400).send("Bad request.");
                return;
            }

            //Unauthorized record OR non existence
            if(await this.recipeRepository.asyncResourceExit( { userId: body.userId, objectName: body.objectName }) <= 0){
                res.status(404).send("Bad request.");
                return;
            } 

            const filter = { 
                _id: request.query.userId,
                objectName: request.query.objectName
            };
            const updatedData = request.body;
            const result = await this.uploadFileRepository.asyncUpdateRecord(filter, updatedData);
            response.status(200).send(JSON.stringify(result));
        } catch(error){
            throw(error);
        }
    }
}


module.exports = UploadFileDbController;