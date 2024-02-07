const mongoDbUri_dev = "mongodb://34.130.86.92:27017";
const mongoDbUri_prod = "mongodb://10.188.0.2:27017";

class Configs {
    constructor(environment) {
      //Database information
      this.databaseInfo = {
        connectionString: environment == 'Production' ? mongoDbUri_prod : mongoDbUri_dev,
        databaseName:"UploadImageDB",
        collectionName: "Image"
      }

      //Google cloud information
      this.googleCloudInfo = {
        projectId: "hongquangcung301417603",
        bucketName: "upload-bucket-storage",
        credentialFilePath: "./src/configs/cmpt372-finalproject-e057d0261c50.json"
      };
    }
}


module.exports = Configs;