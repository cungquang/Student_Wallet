const express = require('express');
const { initializeApp } = require("firebase/app");
const { getAuth, signInWithEmailAndPassword, onAuthStateChanged, createUserWithEmailAndPassword } = require("firebase/auth");
const bodyParser = require('body-parser');
const firebase_admin = require("firebase-admin")
const serviceAccount = require("./cloudKey.json");

const cors = require('cors');
const app = express();

const firebaseConfig = {
  apiKey: "AIzaSyDI26Bw2RZkbNJp-U77lA3v_fX_Wou_hWQ",
  authDomain: "jooeunpark301414492.firebaseapp.com",
  projectId: "jooeunpark301414492",
  storageBucket: "jooeunpark301414492.appspot.com",
  messagingSenderId: "119117724944",
  appId: "1:119117724944:web:b7d3637b1b0199b8e73995"
};

app.use(cors());
app.use(bodyParser.json());

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const admin = firebase_admin.initializeApp({
  credential: firebase_admin.credential.cert(serviceAccount)
})

// POST: Sign in
app.post('/signin', signInUser);

// POST: Sign up
app.post('/signup', signUpUser);

// GET: Get all users
app.get('/user/all', getAllUsers);

// GET: Get user by UID
app.get(`/user/:uid`, getUserByUID);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});


async function signInUser(req, res) {
  try {
    const { email, password } = req.body;
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    res.json({
      message: "Login successful",
      user: user.toJSON()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function signUpUser(req, res) {
  try {
    const { email, password } = req.body;
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    res.json({
      message: "Signup successful",
      user: user.toJSON()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getAllUsers(req, res) {
  try {
    const users = await listAllUsers();
    console.log(users);
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getUserByUID(req, res) {
  try {
    const uid = req.params.uid;
    const userRecord = await admin.auth().getUser(auth, uid);
    res.json(userRecord.toJSON());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Helper functions
//Return all users' email
async function listAllUsers(nextPageToken) {
  const allUsers = [];

  const result = await admin.auth().listUsers(10, nextPageToken); 
  result.users.forEach(userRecord => {
    //push EMAIL in allUsers 
    //change this line to get uid or any other attributes
    allUsers.push(userRecord.email);
  });
  
  if (result.pageToken) { 
    await listAllUsers(result.pageToken);
  }
  
  return allUsers;
}
