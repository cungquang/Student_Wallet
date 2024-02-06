const express = require('express');
const Configs = require('./src/configs/configs');
const MetadataService = require('./src/services/metadataService');
const UploadService = require('./src/services/uploadService');
const UploadController = require('./src/controllers/uploadController');
const UploadRouter = require('./src/routes/uploadRoutes');

const PORT = process.env.PORT || 5000;
const ENVIRONMENT = process.env.ENVIRONMENT || 'Development';

// inject dependencies
const config = new Configs(ENVIRONMENT);
const metadataService = new MetadataService(config);
const uploadService = new UploadService(config);
const uploadController = new UploadController(uploadService, metadataService);
const uploadRouters = new UploadRouter(uploadController);

//Initiate app
const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//testing
app.get('/', (request, response) => {
    response.sendFile(__dirname + '/index.html');
})

//api
app.use("/api", uploadRouters.configureUploadRoute());

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})
