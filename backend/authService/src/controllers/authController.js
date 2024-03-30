const { getAuth, signInWithEmailAndPassword, sendEmailVerification, onAuthStateChanged, createUserWithEmailAndPassword } = require("firebase/auth");


const { initializeApp } = require("firebase/app");
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
const firebase_admin = require("firebase-admin")
const serviceAccount = require("./cloudKey.json");
const admin = firebase_admin.initializeApp({
    credential: firebase_admin.credential.cert(serviceAccount)

})

// POST: Sign in
async function signInUser(req, res) {
    try {
        const { email, password } = req.body;
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        const idToken = await user.getIdToken();
        res.json({
            message: "Login successful",
            user: user.toJSON(),
            idToken: idToken
        });
    } catch (error) {
        res.status(500).json({ error: `Sign in error: ${error.message}` });
    }
}



// POST: Sign up

async function signUpUser(req, res) {
    try {
        const { email, password } = req.body;
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await admin.auth().updateUser(user.uid, { emailVerified: true });

        res.json({
            message: "Signup successful. Email verified.",
            user: user.toJSON()
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: `Sign up error: ${error.message}` });
    }
}

// GET: Get all users
async function getAllUsers(req, res) {
    try {
        const users = await listAllUsers();
        console.log(users);
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: `Get all user error: ${error.message}` });
    }
}

// GET: Get user by UID
async function getUserByUID(req, res) {
    try {
        const uid = req.params.uid;
        const userRecord = await admin.auth().getUser(uid);
        res.json(userRecord.toJSON());
    } catch (error) {
        res.status(500).json({ error: `Get user uid error: ${error.message}` });
    }
}

//Middleware that 
//Handle verify Token

// req-> 
// headers: {
//     authorization: `Bearer ${idToken}`
// }

// Go to the next function if verifed
const verifyToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Authorization header missing or invalid' });
        }
        const idToken = authHeader.split('Bearer ')[1];

        await firebase_admin.auth().verifyIdToken(idToken);

        next();
    } catch (error) {
        res.status(401).json({ error: 'Failed to authenticate token' });
    }
};

//Handle Decode token
// req->  { accessToken:accessToken}
// res->  decoded token
async function decodeTokenHandler(req, res) {
    try {
        const idToken = req.body.accessToken;
        const decodedToken = await firebase_admin.auth().verifyIdToken(idToken);
        res.json({ decodedToken: decodedToken });
    } catch (error) {
        res.status(500).json({ error: `Token decoding error: ${error.message}` });
    }
}

//Helper functions

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
module.exports = { getUserByUID, signInUser, getAllUsers, signUpUser, decodeTokenHandler, verifyToken };