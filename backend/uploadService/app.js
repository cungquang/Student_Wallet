const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const path = require('path');
const Configs = require('./src/configs/configs');
const UploadFileRepository = require('./src/repositories/uploadFileRepository');
const UploadService = require('./src/services/uploadService');
const UploadController = require('./src/controllers/uploadController');
const UploadFileDbController = require('./src/controllers/uploadFileDbController');
const UploadRouter = require('./src/routes/uploadRoutes');
const UploadFileDbRouter = require('./src/routes/uploadFileDbRoutes');

// Get environment variables & setup config
require('dotenv').config();
const { PORT = 5000, ENVIRONMENT = 'Development' } = process.env;
const config = new Configs(ENVIRONMENT);

//Dependency injection 
const database = new DatabaseService(config.connectionString);
//Init
(async () => {
    await database.asyncConnect()}
)();

//Shutdown
const gracefulShutdown = () => {
    console.log('Closing database connection...');
    database.asyncDisconnect()
        .then(() => {
            console.log('Database connection closed');
            process.exit(0);
        })
        .catch(error => {
            console.error('Error closing database connection:', error);
            process.exit(1);
        });
}

// Initiate dependency injection
const uploadFileRepository = new UploadFileRepository(database.client);
const uploadService = new UploadService(config);

// Upload & UploadDbFile controller
const uploadController = new UploadController(uploadService);
const uploadFileDbController = new UploadFileDbController(uploadFileRepository);

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
app.use("/api/file", uploadRouter.configureUploadRoute());
app.use("/api/db", uploadFileDbRouter.configureUploadFileDbRoute());


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
