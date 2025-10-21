// --- 1. Import Packages ---
// 'require' is how you import a package in Node.js
const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin'); // --- ADDED THIS ---

// --- 2. Firebase Setup (Connect to Database) --- // --- ADDED THIS SECTION ---
// This line finds your secret key file
const serviceAccount = require('./serviceAccountKey.json');

// This logs your server in as an admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// This gives you a variable to talk to the Firestore database
const db = admin.firestore();


// --- 3. Create Your App ---
const app = express();
const port = 3001; // We'll run the backend on port 3001

// --- 4. Use Middleware (Plugins) ---
app.use(cors()); 
app.use(express.json()); 

// --- 5. Define Your API (Routes) ---
// This is your "Hello World" route.
app.get('/', (req, res) => {
  res.send('Hello from the Syntax Sensei Backend! 👋');
});


// This route gets all documents from the 'lessons' collection
app.get('/api/lessons', async (req, res) => {
  try {
    // 1. Tell the 'db' to get the 'lessons' collection
    const snapshot = await db.collection('lessons').get();

    // 2. Loop over the documents and format them
    const lessons = [];
    snapshot.forEach((doc) => {
      // 'doc.id' is the auto-ID, 'doc.data()' is the content
      lessons.push({ id: doc.id, ...doc.data() });
    });

    // 3. Send the list of lessons back as JSON
    res.status(200).json(lessons);

  } catch (error) {
    // If anything goes wrong, send an error
    console.error("Error getting lessons:", error);
    res.status(500).send("Error getting lesson data");
  }
});
// --- END OF NEW CODE BLOCK ---


// --- 6. Start The Server ---
// This tells your server to start listening for requests
app.listen(port, () => {
  console.log(`Backend server running at http://localhost:${port}`);
});