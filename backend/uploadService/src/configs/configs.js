class ConnectionStringBuilder{
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
        this.api = "";
        this.method = "";
        this.queryParams = {};
    }

    addApi() {
      this.api = "/api";
      return this;
    }

    addApiMethod(apiMethod) {
      this.method = `/${apiMethod}`;
      return this;
    }

    addQueryParam(key, value) {
      this.queryParam[key] = value;
      return this;
    }

    deleteQueryParam(key) {
      delete this.queryParam[key];
      return this;
    }

    build() {
      const paramsString = Object.keys(this.queryParams)
            .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(this.queryParams[key])}`)
            .join('&');
      return this.baseUrl + (this.api? this.api : '') + (this.method? this.method: '') + (queryString ? `?${queryString}`: '');
    }
}

class Configs {
    constructor() {
      //Database information
      this.connectionString= process.env.MONGODB_URI;
      this.aiServiceUri = process.env.AISERVICE_URI;
      
      //Google cloud information
      this.googleCloudInfo = {
        projectId: process.env.PROJECT_ID,
        bucketName: process.env.BUCKET_NAME,
        credentialFilePath: process.env.CREDENTIAL_PATH
      };
    }
}


module.exports = { ConnectionStringBuilder, Configs};