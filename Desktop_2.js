import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBq5r5taSo1_tBTXA-bDUSvnVEl1J-fjkU",
    authDomain: "kuch-mil-gaya-c28fd.firebaseapp.com",
    databaseURL: "https://kuch-mil-gaya-c28fd-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "kuch-mil-gaya-c28fd",
    storageBucket: "kuch-mil-gaya-c28fd.appspot.com",
    messagingSenderId: "5006594070",
    appId: "1:5006594070:web:3a14ff156161caafc6e537",
    measurementId: "G-NRHGY33C8Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.addEventListener("DOMContentLoaded", function() {
    const firstName = localStorage.getItem("firstName");
    if (firstName) {
        document.getElementById("userName").textContent = firstName + "!";
    }

    // Logout script
    document.getElementById("logoutButton").addEventListener("click", function() {
        signOut(auth).then(() => {
            // Clear localStorage
            localStorage.removeItem("firstName");
            localStorage.removeItem("email");
            localStorage.removeItem("uid");
            localStorage.removeItem("lastLogin");

            // Redirect to the login page or initial page
            window.location.href = "Desktop_1.html";  // Replace with your login page or first page
        }).catch((error) => {
            console.error("Error signing out: ", error);
        });
    });
});
