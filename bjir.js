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
    var Led1Status;

    // Referensi ke elemen database
    const ledRef = ref(database, 'Led1Status');

    // Referensi ke elemen HTML
    var ledEsp = document.getElementById("ledEsp");

    // Mendapatkan data dari database
    onValue(ledRef, function(snapshot) {
        Led1Status = snapshot.val();
        if (Led1Status == 1) {
            ledEsp.style.backgroundColor = "yellow";
        } else {
            ledEsp.style.backgroundColor = "white";
        }
    });

    // Event listener untuk tombol toggle
    document.querySelector(".item-submit").addEventListener("click", function() {
        if (Led1Status == 1) {
            set(ledRef, 0);
            Led1Status = 0;
        } else {
            set(ledRef, 1);
            Led1Status = 1;
        }
    });
});
