class UploadFileDbController {
    constructor(uploadFileDbService){
        this.uploadFileDbService = uploadFileDbService;
    }

    async asyncInsertRecord(request, response) {
        try{
            const body = request.body;
            if(!body){
                response.status(400).json({ error: 'Bad request'});
            }
            await this.uploadFileDbService.asyncInsertRecord(body);
            response.status(200).send({complete: true});
        } catch(error) {
            throw(error);
        }
    }
}


module.exports = UploadFileDbController;