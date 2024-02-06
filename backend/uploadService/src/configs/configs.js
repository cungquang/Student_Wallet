class Configs {
    constructor() {
      this.connectionString = [
        { mongoDbUri: "mongodb://34.130.86.92:27017/" }
      ];
      this.googleCloudInfo = {
        projectId: "hongquangcung301417603",
        bucketName: "upload-bucket-storage",
        credentialFilePath: "./student_wallet/backend/uploadService/src/configs/cmpt372-finalproject-e057d0261c50.json"
      }
    }
  }


export default new Configs();