const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const path = require('path');
const { config } = require('dotenv');
const cors = require('cors');
const { Configs } = require('./src/configs/configs');
const UploadFileRepository = require('./src/repositories/uploadFileRepository');
const FinanceRepository = require('./src/repositories/financeRepository');
const UploadService = require('./src/services/uploadService');
const UploadController = require('./src/controllers/uploadController');
const UploadFileDbController = require('./src/controllers/uploadFileDbController');
const FinanceController = require('./src/controllers/FinanceController');
const UploadRouter = require('./src/routes/uploadRoutes');
const UploadFileDbRouter = require('./src/routes/uploadFileDbRoutes');
const FinanceRoutes = require('./src/routes/financeRoutes');
const DatabaseService = require('./src/services/databaseService');
const AzureAIService = require('./src/services/azureAiService');


// Get environment variables & setup config
require('dotenv').config();
const PORT = process.env.PORT || 3001;
const ENV = process.env.ENV || "Development";
const configs = new Configs(ENV);

//Dependency injection 
const database = new DatabaseService(configs.connectionString);

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
const financeRepository = new FinanceRepository(database.client);
const uploadService = new UploadService(configs);
const azureAiService = new AzureAIService(configs.aiServiceUri);

// Upload & UploadDbFile controller
const uploadController = new UploadController(uploadService);
const uploadFileDbController = new UploadFileDbController(uploadFileRepository);
const financeController = new FinanceController(financeRepository, azureAiService);

// Router
const uploadRouter = new UploadRouter(uploadController);
const uploadFileDbRouter = new UploadFileDbRouter(uploadFileDbController);
const financeRouter = new FinanceRoutes(financeController);

// Initiate app
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(helmet());

// API routes
app.use("/api/file", uploadRouter.configureUploadRoute());
app.use("/api/fileMetadata", uploadFileDbRouter.configureUploadFileDbRoute());
app.use("/api/finance", financeRouter.configureFinanceRoutes());

// Static page - for testing
app.get('/', (request, response) => {
    response.sendFile(__dirname + '/static/index.html');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
