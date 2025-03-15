import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js';
import { getDatabase, ref,onValue, get, set } from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js';

// Konfigurasi Firebase
const firebaseConfig = {
    apiKey: "AIzaSyB7wATj7rG4YaTQFUmvTfC3PUWZ9SsC44A",
    authDomain: "iot-project-dea64.firebaseapp.com",
    databaseURL: "https://iot-project-dea64-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "iot-project-dea64",
    storageBucket: "iot-project-dea64.firebasestorage.app",
    messagingSenderId: "22378615060",
    appId: "1:22378615060:web:c467c6b54644a34370b201",
    measurementId: "G-KVXNYD5WJN"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.languageCode = 'en';
const database = getDatabase(app);

// Google Auth Provider
const provider = new GoogleAuthProvider();
const googleLogin = document.getElementById("ledEsp3");

const targetElement = document.getElementById("main-content"); // Ganti dengan ID elemen lo

googleLogin.addEventListener("click", () => {
  signInWithPopup(auth, provider)
      .then((result) => {
          const user = result.user;
          console.log("User berhasil login:", user.email);

          if (user.email === "ohohihi77@gmail.com" || "fauzigaga59@gmail.com") {
              targetElement.style.display = "flex";
          } else {
              targetElement.style.display = "none";
          }
      })
      .catch((error) => {
          console.error("Login error:", error.message);
      });
});

// Cek status login
onAuthStateChanged(auth, (user) => {
    if (user) {
        const userEmail = user.email;
        console.log("User login:", userEmail);

        if (userEmail ==="ohohihi77@gmail.com" || "fauzigaga59@gmail.com") {
            targetElement.style.display = "flex"; // Tampilkan elemen
            login.style.display = "none";
        } else {
            targetElement.style.display = "none";
            login.style.display = "flex";
        }
    } else {
        console.log("Belum login");
        targetElement.style.display = "none"; // Sembunyikan elemen kalau belum login
    }
});

// Login dengan Google
document.getElementById("login").addEventListener("click", () => {
    signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            console.log("User berhasil login:", user.email);

            if (user.email === "ohohihi77@gmail.com" || "fauzigaga59@gmail.com") {
                targetElement.style.display = "flex";
            } else {
                targetElement.style.display = "none";
            }
        })
        .catch((error) => {
            console.error("Login error:", error.message);
        });
});

document.addEventListener("DOMContentLoaded", function() {
    let Led1Status;
    let Led2Status;

    // Referensi ke elemen database
    const ledRef = ref(database, 'Led1Status');
    const ledRef2 = ref(database, 'Led2Status');

    // Referensi ke elemen HTML
    const ledEsp = document.getElementById("ledEsp");
    const ledEsp2 = document.getElementById("ledEsp2");
    const border = document.getElementById("item");
    const border2 = document.getElementById("item2");
    
    // Mendapatkan data dari database
    onValue(ledRef, function(snapshot) {
        Led1Status = snapshot.val();
        console.log("Current Led1Status from Firebase:", Led1Status); // Debugging log
        Led1Status === 1 ? (ledEsp.style.backgroundColor = "#02a2ff",
        ledEsp.style.color = "#fff",
        ledEsp.innerHTML ="TURN OFF",
        ledEsp.style.boxShadow = "0px 0px 10px 1px #02a2ff",
        border.style.boxShadow = "0px 0px 0px 0px #02a2ff",
        ledEsp.style.textShadow = "2px 2px 2px #000",
        ledEsp.style.borderColor = "#02a2ff" )
        : 
        (ledEsp.style.backgroundColor = "white",
            ledEsp.style.color = "#000",
            ledEsp.innerHTML ="TURN ON",
            ledEsp.style.boxShadow = "0px 0px 0px 0px #02a2ff",
            border.style.boxShadow = "0px 0px 10px 1px #02a2ff",
            ledEsp.style.textShadow = "1px 1px 1px #fff",
            ledEsp.style.borderColor = "#fff"
        );
    });
    onValue(ledRef2, function(snapshot) {
        Led2Status = snapshot.val();
        console.log("Current Led2Status from Firebase:", Led2Status); // Debugging log
        Led2Status === 1 ? (ledEsp2.style.backgroundColor = "#02a2ff",
        ledEsp2.style.color = "#fff",
        ledEsp2.innerHTML ="TURN OFF",
        ledEsp2.style.boxShadow = "0px 0px 10px 1px #02a2ff",
        border2.style.boxShadow = "0px 0px 0px 0px #02a2ff",
        ledEsp2.style.textShadow = "2px 2px 2px #000",
        ledEsp2.style.borderColor = "#02a2ff" )
        : 
        (ledEsp2.style.backgroundColor = "white",
            ledEsp2.style.color = "#000",
            ledEsp2.innerHTML ="TURN ON",
            ledEsp2.style.boxShadow = "0px 0px 0px 0px #02a2ff",
            border2.style.boxShadow = "0px 0px 10px 1px #02a2ff",
            ledEsp2.style.textShadow = "1px 1px 1px #fff",
            ledEsp2.style.borderColor = "#fff"
        );
    });

    // Event listener untuk tombol toggle
document.querySelector(".item-submit").addEventListener("click", function() {
    console.log("Button clicked. Current Led1Status:", Led1Status);
  
    if (Led1Status === undefined) {
      console.warn("LED status is not yet available.");
      return;
    }
    Led1Status === 1 ? (set(ledRef, 0), Led1Status = 0, ledEsp.style.backgroundColor = "white") : (set(ledRef, 1), Led1Status = 1);
  });
  
document.querySelector(".item-submit2").addEventListener("click", function() {
      console.log("Button clicked. Current Led2Status:", Led2Status);
      if (Led2Status === undefined) {
        console.warn("LED status is not yet available.");
        return;
      }
      Led2Status === 1 ? (set(ledRef2, 0), Led2Status = 0, ledEsp2.style.backgroundColor = "white") : (set(ledRef2, 1), Led2Status = 1);
  });
});
  