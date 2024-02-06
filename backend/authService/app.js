const express = require('express');
const { initializeApp } = require("firebase/app");
const { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } = require("firebase/auth");
const bodyParser = require('body-parser');

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

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
app.use(cors());
app.use(bodyParser.json());

app.post('/signin', async (req, res) => {
  try {
      const { email, password } = req.body;
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      res.json({ message: "Login successful", user });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

app.post('/signup', async (req, res) => {
  try {
      const { email, password } = req.body;
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      res.json({ message: "Signup successful", user });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});