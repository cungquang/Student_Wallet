import express from 'express';
import chatGptController from '../controllers/chatGptController';
import azureAiController from '../controllers/azureAiController';

const router = express.Router();

// Other imports and configurations...


//Route
router.get('/chatgpt', chatGptController.postQuestion);
router.get('/azureai', azureAiController.postReadDocument)

export default router;