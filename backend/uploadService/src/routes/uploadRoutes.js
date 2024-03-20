const express = require("express");
const Multer = require("multer");

//Configure 3rd party - multer for temporary storage
const router = express.Router();
const multerStorage = Multer.memoryStorage();
const multerUpload = Multer({ storage: multerStorage });

class UploadRouter{
    constructor(uploadController){
        this.uploadController = uploadController
    }

    //Handle routing for upload to blob
    configureUploadRoute(){

        //in multerUpload.single(must specify the field name in html use to keep the file)
        router.post("/upload", multerUpload.single("file"), async (request, response) => {
            try {
                await this.uploadController.asyncUploadFile(request, response);
            } catch (error) {
                console.error('Error handling file upload: ', error);
                response.status(500).json({ error: 'Internal Server Error' });
            }
        });
        
        
        //Route: /getsignedurl
        router.get("/getsignedurl", async(request, response) => {
            try{
                await this.uploadController.asyncGetSignedUrl(request, response);
            }catch(error){
                console.error('Error handling file upload: ', error);
                response.status(500).json({ error: 'Internal Server Error' });
            }
        })
        
        //Route: /getmetadata
        router.get("/getmetadata", async(request, response) => {
            try{
                await this.uploadController.asyncGetMetadata(request, response);
            } catch(error){
                console.error('Error handling file upload: ', error);
                response.status(500).json({ error: 'Internal Server Error' });
            }
        })


        //Route: /deleteobject
        router.delete("/deletefile", async(request, response) => {
            try{
                await this.uploadController.asyncDeleteObject(request, response);
            } catch(error){
                console.error('Error handling file upload: ', error);
                response.status(500).json({ error: 'Internal Server Error' });
            }
        });

        return router;
    }
}

module.exports = UploadRouter;