const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const Configs = require('./src/configs/configs');
const UploadFileDbService = require('./src/services/uploadFileDbService');
const UploadService = require('./src/services/uploadService');
const UploadController = require('./src/controllers/uploadController');
const UploadFileDbController = require('./src/controllers/uploadFileDbController');
const UploadRouter = require('./src/routes/uploadRoutes');
const UploadFileDbRouter = require('./src/routes/uploadFileDbRoutes');

// Get environment variables & setup config
const { PORT = 5000, ENVIRONMENT = 'Development' } = process.env;
const config = new Configs(ENVIRONMENT);

// Initiate Database Connection
const uploadFileDbService = new UploadFileDbService(config);

// Inject dependencies
const uploadService = new UploadService(config);
const uploadController = new UploadController(uploadService);
const uploadFileDbController = new UploadFileDbController(uploadFileDbService);

// Router
const uploadRouter = new UploadRouter(uploadController);
const uploadFileDbRouter = new UploadFileDbRouter(uploadFileDbController);

// Initiate app
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet());

// Static page - for testing
app.get('/', (request, response) => {
    response.sendFile(__dirname + '/index.html');
});

// API routes
app.use("/api", uploadRouter.configureUploadRoute());
app.use("/db", uploadFileDbRouter.configureUploadFileDbRoute());


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
