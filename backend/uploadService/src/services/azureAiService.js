const axios = require('axios');

class AzureAIService{
    constructor(aiServiceUri){
        this.aiServiceUri = aiServiceUri
    }

    async asyncReadReceipt(urlToFile) {
        const requestBody = {
            RequestedUrl: urlToFile
        };
        
        try {
            //Send post request
            const response = axios.post(this.aiServiceUri, requestBody);
            return response.data;
        } catch(error){
            throw(error);
        }
    }
}

module.exports = AzureAIService;