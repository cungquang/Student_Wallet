const express = require('express');
const helmet = require('helmet');
const Configs = require('./src/configs/configs');
const UploadFileDbService = require('./src/services/uploadFileDbService');
const UploadService = require('./src/services/uploadService');
const UploadController = require('./src/controllers/uploadController');
const UploadRouter = require('./src/routes/uploadRoutes');
const UploadFileDbRouter = require('./src/routes/uploadFileDbRoutes');

// Get environment variables & setup config
const { PORT = 2000, ENVIRONMENT = 'Development' } = process.env;
const config = new Configs(ENVIRONMENT);

// Initiate Database Connection
const uploadFileDbService = new UploadFileDbService(config);
(async () => {
    try {
        await uploadFileDbService.asyncConnect();
    } catch (error) {
        console.error('Failed to connect to database', error);
        process.exit(1);
    }
})();

// Inject dependencies
const uploadService = new UploadService(config);
const uploadController = new UploadController(uploadService, uploadFileDbService);

// Router
const uploadRouter = new UploadRouter(uploadController);
const uploadFileDbRouter = new UploadFileDbRouter(UploadFileDbRouter);

// Initiate app
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

// Close database connection on 'SIGINT' signal
// Create an event to list to 'SIGINT' -> 'SIGINT' get changed -> execute  
process.on('SIGINT', () => {
    console.log('Terminating server...');
    try {
        // Wait for asynchronous disconnection to complete
        uploadFileDbService.asyncDisconnect();
        process.exit(0);
    } catch (error) {
        console.error('Error closing database connection:', error);
        process.exit(1);
    }
});

// Static page - for testing
app.get('/', (request, response) => {
    response.sendFile(__dirname + '/index.html');
});

// API routes
app.use("/api/upload", uploadRouter.configureUploadRoute());
app.use("/api/database", uploadFileDbRouter.configureUploadFileDbRoute());


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
