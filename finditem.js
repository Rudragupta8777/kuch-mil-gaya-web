// Firebase configuration
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
firebase.initializeApp(firebaseConfig);
var database = firebase.database();

// Elements
const itemList = document.getElementById('item-list');
const searchInput = document.getElementById('search');

// Store lost items
let lostItemList = [];

// Load data from Firebase
function loadLostItems() {
    const itemsRef = database.ref('lostItems');
    itemsRef.orderByChild('claimed').equalTo(false).on('value', function(snapshot) {
        itemList.innerHTML = '';
        lostItemList = [];

        snapshot.forEach(function(childSnapshot) {
            const item = childSnapshot.val();
            lostItemList.push(item);
            displayItem(item);
        });
    });
}

// Display individual item
function displayItem(item) {
    const itemCard = document.createElement('div');
    itemCard.classList.add('item-card');

    const claimedText = item.claimed ? '<span class="tick-icon">✔</span>' : '';

    itemCard.innerHTML = `
        <h2>${item.itemName} ${claimedText}</h2>
        <p><strong>Date:</strong> ${item.date}</p>
        <p><strong>Time:</strong> ${item.time}</p>
        <p><strong>Place:</strong> ${item.place}</p>
        <p><strong>Description:</strong> ${item.desc}</p>
        <p><strong>Contact:</strong> ${item.contact}</p>
    `;

    // Append the item card to the list
    itemList.appendChild(itemCard);

    // Add a separator (horizontal line) after each item
    const separator = document.createElement('hr');
    separator.style.border = '1px solid #ccc'; // Custom style for separator
    separator.style.margin = '20px 0'; // Add spacing around the separator
    itemList.appendChild(separator);
}

// Filter items based on search input
searchInput.addEventListener('input', function() {
    const query = searchInput.value.toLowerCase();
    itemList.innerHTML = '';

    const filteredItems = lostItemList.filter(item => item.itemName.toLowerCase().includes(query));

    filteredItems.forEach(item => {
        displayItem(item);
    });
});

// Load lost items when the page loads
loadLostItems();
