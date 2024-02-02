import express from 'express';
import ChatGptController from '../controllers/chatGptController';
import AzureAiController from '../controllers/azureAiController';

const router = express.Router();

// Other imports and configurations...


//Route
router.get('/chatgpt', ChatGptController.postQuestion);
router.get('/azureai', AzureAiController.postReadDocument)

export default router;