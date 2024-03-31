const express = require('express');
const bodyParser = require('body-parser');
const firebase_admin = require("firebase-admin")
const serviceAccount = require("./src/controllers/cloudKey.json");
const  { signInUser, signUpUser, getUserByUID, getAllUsers, decodeTokenHandler, verifyToken } = require("./src/controllers/authController");
const cors = require('cors');
const path = require('path');
const app = express();
app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'unsafe-none');
  next();
});
app.use(cors());
app.use(bodyParser.json());


app.use(express.static(path.join(__dirname, './build')));

const PORT = 3000;
// POST: Sign in
app.post('/signin', signInUser);

// POST: Sign up
app.post('/signup', signUpUser);

// GET: Get all users
app.get('/user/all', verifyToken,  getAllUsers);

// GET: Get user by UID
app.get(`/user/:uid`, getUserByUID);

// POST: Decode token
app.post('/decode-token', decodeTokenHandler);

// GET: Return message if the user is verified
app.get('/check-user', verifyToken, (req, res) => {
  res.status(200).json({ message: 'User is authenticated' });
});

app.listen(PORT, () => {
    console.log('Server is running on port 3000');
});


