import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyDI26Bw2RZkbNJp-U77lA3v_fX_Wou_hWQ",
    authDomain: "jooeunpark301414492.firebaseapp.com",
    projectId: "jooeunpark301414492",
    storageBucket: "jooeunpark301414492.appspot.com",
    messagingSenderId: "119117724944",
    appId: "1:119117724944:web:b7d3637b1b0199b8e73995"
  };
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.addEventListener("DOMContentLoaded", () => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            document.getElementById("message").innerHTML = "Welcome, " + user.email;
        } else {
            document.getElementById("message").innerHTML = "No user signed in.";
        }
    });

    const btn = document.getElementById("btn");
    btn.addEventListener("click", signIn);
});

function signIn() {
    const email = document.getElementById("email").value;
    console.log("Captured Email:", email);

    const password = document.getElementById("password").value;
    signInWithEmailAndPassword(auth, email, password)
        .catch((error) => {
            document.getElementById("message").innerHTML = error.message;
        });
}
