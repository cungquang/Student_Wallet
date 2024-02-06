const express = require("express");
const Multer = require("multer");

//Configure 3rd party - multer for temporary storage
router = express.Router();
multerStorage = Multer.memoryStorage();
multerUpload = Multer({ storage: multerStorage });

class UploadRouter{
    constructor(uploadController){
        this.uploadController = uploadController
    }

    configureUploadRoute(request, response){
        this.router.post("/upload", multerUpload.single(), (request, response) => {
            this.uploadController.asyncUploadFile(response, request);
        });

        return router;
    }
}

module.exports = UploadRouter;