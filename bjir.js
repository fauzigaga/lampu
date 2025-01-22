import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js';
import { getDatabase, ref, onValue, set } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js';

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

// Inisialisasi aplikasi Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

document.addEventListener("DOMContentLoaded", function() {
    let Led1Status;

    // Referensi ke elemen database
    const ledRef = ref(database, 'Led1Status');

    // Referensi ke elemen HTML
    const ledEsp = document.getElementById("ledEsp");

    // Mendapatkan data dari database
    onValue(ledRef, function(snapshot) {
        Led1Status = snapshot.val();
        console.log("Current Led1Status from Firebase:", Led1Status); // Debugging log
        if (Led1Status === 1) {
            ledEsp.style.backgroundColor = "yellow";
        } else {
            ledEsp.style.backgroundColor = "white";
        }
    });

    // Event listener untuk tombol toggle
    document.querySelector(".item-submit").addEventListener("click", function() {
        console.log("Button clicked. Current Led1Status:", Led1Status); // Debugging log

        if (Led1Status === undefined) {
            console.warn("LED status is not yet available.");
            return; // Jangan lakukan apa-apa jika status belum tersedia
        }

        // Toggle LED status
        if (Led1Status == 1) {
            set(ledRef, 0)  // Set to off (0)
                .then(() => {
                    console.log("LED turned off and data uploaded.");
                })
                .catch((error) => {
                    console.error("Error uploading data:", error);
                });
            Led1Status = 0;  // Update local state
            ledEsp.style.backgroundColor = "white"; // Update button color
        } else {
            set(ledRef, 1)  // Set to on (1)
                .then(() => {
                    console.log("LED turned on and data uploaded.");
                })
                .catch((error) => {
                    console.error("Error uploading data:", error);
                });
            Led1Status = 1;  // Update local state
            ledEsp.style.backgroundColor = "yellow"; // Update button color
        }
    });
});

function setEspLed2 () {
    console.log('click');
    
}

setEspLed2();