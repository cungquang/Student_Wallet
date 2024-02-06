const express = require('express');
const mongoose = require('mongoose');
const configs = require('./src/configs/configs');
const UploadService = require('./src/services/uploadService');
const UploadController = require('./src/controllers/uploadController');
const UploadRouter = require('./src/routes/uploadRoutes');

// inject dependencies
const uploadService = new UploadService();
const uploadController = new UploadController(uploadService);
const uploadRouters = new UploadRouter(uploadController);
const PORT = process.env.PORT || 4000;

//Initiate app
const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routing
app.get('/', (request, response) => {
    response.sendFile(__dirname + '/index.html');
})

app.use("/api", uploadRouters.configureUploadRoute());

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})
