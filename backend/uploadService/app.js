const express = require('express');
const routes = require('routes');
const mongoose = require('mongoose');
const configs = require('./src/configs/configs');
const UploadService = require('./src/services/uploadService');
const UploadController = require('./src/controllers/uploadController');
const UploadRouter = require('./src/routes/uploadRoutes');

//Setup 
const uploadService = new UploadService();
const uploadController = new UploadController(uploadService);
const uploadRouters = new UploadRouter(uploadController);
const PORT = process.env.PORT || 4000;

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// inject dependencies

const app = express();


app.get('/', (request, response) => {
    response.sendFile(__dirname + '/index.html');
})

app.post('/api/upload', (request, response) =>  {
    response.send('File uploaded successfully');
})

app.use("/api", uploadRouters.configureUploadRoute(request, response));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})
