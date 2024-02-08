const express = require('express');
const { initializeApp } = require("firebase/app");
const { getAuth, signInWithEmailAndPassword, onAuthStateChanged, createUserWithEmailAndPassword } = require("firebase/auth");
const bodyParser = require('body-parser');
const firebase_admin = require("firebase-admin")
const serviceAccount = require("./src/controllers/cloudKey.json");
const  { signInUser, signUpUser, getUserByUID, getAllUsers, decodeTokenHandler, verifyToken } = require("./src/controllers/authController");
const cors = require('cors');
const app = express();

app.use(cors());
app.use(bodyParser.json());


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

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});


