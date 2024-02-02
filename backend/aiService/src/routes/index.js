"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const chatGptController_1 = __importDefault(require("../controllers/chatGptController"));
const azureAiController_1 = __importDefault(require("../controllers/azureAiController"));
const router = express_1.default.Router();
// Other imports and configurations...
//Route
router.get('/chatgpt', chatGptController_1.default.postQuestion);
router.get('/azureai', azureAiController_1.default.postReadDocument);
exports.default = router;
