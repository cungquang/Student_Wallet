"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./src/routes"));
const app = (0, express_1.default)();

//Get PORT number at run time from environment variable
const PORT = process.env.PORT || 3000;

//Middleware
app.use(express_1.default.json());

//Call API execution
app.use('/api', routes_1.default);

//Error handling middleware
app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).send('Internal error');
});
app.listen(PORT, () => {
    console.log('Server listening on the port ' + PORT);
});
