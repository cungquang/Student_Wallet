const express = require('express');
const routes = require('routes');
const mongoose = require('mongoose');
const configs = require('./src/configs/configs');

const PORT = process.env.PORT || 3000;

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// inject dependencies

const app = express();

app.use("/api", uploadRoutes(configs));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})
