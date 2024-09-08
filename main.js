import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";

// Your web app's Firebase configuration
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
auth.languageCode = "en";

// Initialize Google Auth Provider with hosted domain hint
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  hd: "vitstudent.ac.in"  // Hint to prioritize vitstudent.ac.in domain accounts
});

const googleLogin = document.getElementById("googleSignInButton");

googleLogin.addEventListener("click", function() {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      const email = user.email;

      // Restrict to specific domain, e.g., '@vitstudent.ac.in'
      const allowedDomain = "vitstudent.ac.in";
      const userDomain = email.split('@')[1];

      if (userDomain === allowedDomain) {
        // If domain matches, extract first name and redirect to page 2
        const firstName = user.displayName.split(" ")[0];
        localStorage.setItem("firstName", firstName);

        // Redirect to the next page
        window.location.href = "Desktop_2.html";
      } else {
        // If domain doesn't match, sign out the user and show an error
        alert("You must sign in with an email from " + allowedDomain);
        signOut(auth);  // Signs out the user
      }
    })
    .catch((error) => {
      console.error(error);
    });
});
