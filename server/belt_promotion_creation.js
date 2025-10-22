// This is a standalone script to seed ONLY the belt challenges.
// Run it with: node belt_promotion_creation.js

const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

// --- 1. CONNECT TO FIREBASE ---
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();

// --- 2. BELT CHALLENGE DATA ---
const CHALLENGES_TO_ADD = [
  {
    title: "White Belt Promotion Challenge",
    belt: "white", // The belt this challenge promotes you *from*
    prompt: "Write a Python program that does the following:\n1. Asks the user for their name and stores it in a variable.\n2. Asks the user for their favorite color and stores it in another variable.\n3. Prints a single formatted message: \"[Name]'s favorite color is [color].\"",
    testCases: [
      {
        inputs: ["Alice", "blue"],
        expectedOutput: "Alice's favorite color is blue."
      },
      {
        inputs: ["Bob", "red"],
        expectedOutput: "Bob's favorite color is red."
      }
    ]
  }
  // ... You can add your Yellow Belt Challenge here later
];

// --- 3. THE SEEDING FUNCTION ---
async function seedDatabase() {
  console.log('Starting to seed challenges...');
  const challengesCollection = db.collection('beltChallenges');

  for (const challenge of CHALLENGES_TO_ADD) {
    console.log(`Adding challenge: ${challenge.title}`);
    
    // Check if a challenge with this title already exists to avoid duplicates
    const snapshot = await challengesCollection.where('title', '==', challenge.title).get();
    if (snapshot.empty) {
      await challengesCollection.add(challenge);
    } else {
      console.log(`Challenge "${challenge.title}" already exists. Skipping.`);
    }
  }

  console.log('Challenge seeding complete! 🎉');
  process.exit(0); // This quits the script
}

// --- 4. RUN THE SCRIPT ---
seedDatabase().catch((error) => {
  console.error('Error seeding database:', error);
  process.exit(1); // This quits the script with an error
});