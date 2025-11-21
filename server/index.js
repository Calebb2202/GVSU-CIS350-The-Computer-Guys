// --- 1. IMPORTS ---
const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');

// --- 2. FIREBASE ADMIN SETUP ---
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Get a reference to the Firestore database
const db = admin.firestore();
const FieldValue = admin.firestore.FieldValue; // Needed for arrayUnion

// --- 3. EXPRESS APP SETUP ---
const app = express();
const port = 3001;

// --- 4. MIDDLEWARE ---
// Enable CORS for all routes (so the frontend can call the backend)
app.use(cors());
// Enable the server to read and understand JSON request bodies
app.use(express.json());

// --- 5. API ROUTES ---

/**
 * [GET] /
 * Health check endpoint.
 * Sends a welcome message to confirm the server is running.
 */
app.get('/', (req, res) => {
  res.send('Hello from the Syntax Sensei Backend! 👋');
});

// --- Lesson Routes ---

/**
 * [GET] /api/lessons
 * Gets all lessons from the 'lessons' collection.
 */
app.get('/api/lessons', async (req, res) => {
  try {
    const snapshot = await db.collection('lessons').get();
    const lessons = [];
    snapshot.forEach((doc) => {
      lessons.push({ id: doc.id, ...doc.data() });
    });
    res.status(200).json(lessons);
  } catch (error) {
    console.error("Error getting lessons:", error);
    res.status(500).send("Error getting lesson data");
  }
});

/**
 * [GET] /api/lessons/:id
 * Gets a single lesson by its document ID.
 */
app.get('/api/lessons/:id', async (req, res) => {
  try {
    const lessonId = req.params.id;
    const doc = await db.collection('lessons').doc(lessonId).get();

    if (!doc.exists) {
      res.status(404).send('Lesson not found');
    } else {
      res.status(200).json({ id: doc.id, ...doc.data() });
    }
  } catch (error) {
    console.error("Error getting single lesson:", error);
    res.status(500).send("Error getting lesson data");
  }
});

/**
 * [POST] /api/lessons
 * Creates a new lesson in the 'lessons' collection.
 * Expects new lesson data in the request body.
 */
app.post('/api/lessons', async (req, res) => {
  try {
    const newLessonData = req.body;

    if (!newLessonData.title) {
      return res.status(400).send('Missing required fields (e.g., title)');
    }
    
    const docRef = await db.collection('lessons').add(newLessonData);
    res.status(201).json({ id: docRef.id, ...newLessonData });
  } catch (error) {
    console.error("Error creating lesson:", error);
    res.status(500).send("Error creating lesson");
  }
});


// --- User & Progress Routes ---

/**
 * [GET] /api/users/:id
 * Gets a single user's profile by their UID.
 */
app.get('/api/users/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const doc = await db.collection('users').doc(userId).get();

    if (!doc.exists) {
      res.status(4404).send('User not found');
    } else {
      res.status(200).json({ id: doc.id, ...doc.data() });
    }
  } catch (error) {
    console.error("Error getting user:", error);
    res.status(500).send("Error getting user data");
  }
});

/**
 * [POST] /api/progress
 * Saves a user's lesson progress.
 * Expects { userId, lessonId } in the request body.
 * Adds the lessonId to the user's 'completedLessons' array.
 */
app.post('/api/progress', async (req, res) => {
  try {
    const { userId, lessonId } = req.body;

    if (!userId || !lessonId) {
      return res.status(400).send('Missing userId or lessonId');
    }

    const userRef = db.collection('users').doc(userId);

    // arrayUnion safely adds an item to an array only if it's not already there.
    await userRef.update({
      completedLessons: FieldValue.arrayUnion(lessonId)
    });

    res.status(200).send({ message: 'Progress saved successfully' });
  } catch (error) {
    console.error("Error saving progress:", error);
    res.status(500).send("Error saving progress");
  }
});

/**
 * [GET] /api/challenges/:belt
 * Gets the promotion challenge for a specific belt.
 * e.g., /api/challenges/white will get the White Belt Challenge.
 */
app.get('/api/challenges/:belt', async (req, res) => {
  try {
    const belt = req.params.belt;

    // Find the challenge where the 'belt' field matches
    const snapshot = await db.collection('beltChallenges')
      .where('belt', '==', belt)
      .limit(1) // We only expect one
      .get();

    if (snapshot.empty) {
      return res.status(404).send('Challenge not found for this belt');
    }

    // Get the first (and only) document
    const challengeDoc = snapshot.docs[0];
    res.status(200).json({ id: challengeDoc.id, ...challengeDoc.data() });

  } catch (error) {
    console.error("Error getting challenge:", error);
    res.status(500).send("Error getting challenge data");
  }
});

/**
 * [POST] /api/promote
 * Promotes a user to the next belt.
 * Expects { userId, newBelt } in the request body.
 */
app.post('/api/promote', async (req, res) => {
  try {
    const { userId, newBelt } = req.body;

    if (!userId || !newBelt) {
      return res.status(400).send('Missing userId or newBelt');
    }

    const userRef = db.collection('users').doc(userId);

    // Update the user's 'currentBelt' field
    await userRef.update({
      currentBelt: newBelt
    });

    res.status(200).send({ message: `User promoted to ${newBelt}` });
  } catch (error)
  {
    console.error("Error promoting user:", error);
    res.status(500).send("Error promoting user");
  }
});

// --- 6. START SERVER ---
app.listen(port, () => {
  console.log(`Backend server running at http://localhost:${port}`);
});