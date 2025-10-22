
# Syntax Sensei Backend Setup Guide

This guide explains how to get the backend server running on your local machine for development and testing. THIS GUIDE WAS WRITTEN BY GEMINI IF YOU HAVE ANY ISSUES YOU RUN INTO CONTACT ME (CALEB)

## 1. Required Tools

You must install these tools first:

1.  **Node.js (LTS):** This runs the JavaScript code on your computer.
    * **Windows:** Install `nvm-windows` ([from here](https://github.com/coreybutler/nvm-windows/releases)) and then run `nvm install lts` and `nvm use lts`.
    * **Mac:** Install `nvm` ([using Homebrew](https://github.com/nvm-sh/nvm#installing-and-updating)) and then run `nvm install --lts` and `nvm use --lts`.
2.  **Postman:** This is what we use to test the API. [Download it here](https://www.postman.com/downloads/).

## 2. Project Setup

After you pull the project from GitHub, you need to install the backend's "ingredients" (packages).

```bash
# 1. Navigate into the server folder
cd server

# 2. Install all the packages listed in package.json
npm install
````

## 3\. The Secret Key (CRITICAL STEP)

The server will not run without the Firebase Admin secret key. This file is **not** on GitHub for security. You must get your own.

1.  Go to the [Syntax Sensei Firebase Console](https://console.firebase.google.com/).
2.  Click the **⚙️ Gear Icon** \> **Project settings**.
3.  Go to the **Service accounts** tab.
4.  Click **Generate new private key** (and confirm).
5.  A `.json` file will download.
6.  **Rename this file** to `serviceAccountKey.json`.
7.  **Place this file** inside the `server` folder.

The `server` folder should look like this:

```
server/
├── node_modules/
├── index.js
├── lesson_creation.js
├── ...
└── serviceAccountKey.json  <-- Your secret key
```

## 4\. Run the Server

Now you can start the main API server.

```bash
# Make sure you are in the server/ folder
node index.js
```

You should see this message:
`Backend server running at http://localhost:3001`

-----

## How to Add New Content (Lessons/Challenges)

All lessons and challenges are managed in "seeder" files in the `server` folder. Since we all share one database, **do not** add data directly in Firebase. Add it to these files.

1.  To add **new lessons**, open `server/lesson_creation.js`.

      * Add your new lesson object(s) to the `LESSONS_TO_ADD` array.
      * Save the file.
      * Run the script: `node lesson_creation.js`

2.  To add **new belt challenges**, open `server/belt_promotion_creation.js`.

      * Add your new challenge object(s) to the `CHALLENGES_TO_ADD` array.
      * Save the file.
      * Run the script: `node belt_promotion_creation.js`

These scripts are safe to run multiple times. They will check if the content already exists and will only add new items.

-----

## API Endpoints for Testing (Postman)

The server is running. You can now use Postman to test these "menu items".

**Note:** A test user with the ID `test-user-01` already exists in the database for you to use.

### Lessons & Challenges

  * **[GET]** `http://localhost:3001/`

      * (Health Check) See if the server is on.

  * **[GET]** `http://localhost:3001/api/lessons`

      * Gets all lessons.

  * **[GET]** `http://localhost:3001/api/lessons/YOUR_LESSON_ID`

      * Gets one specific lesson.

  * **[GET]** `http://localhost:3001/api/challenges/white`

      * Gets the challenge for the 'white' belt.

### User & Progress

  * **[GET]** `http://localhost:3001/api/users/test-user-01`

      * Gets the profile for the main test user.

  * **[POST]** `http://localhost:3001/api/progress`

      * Saves a user's progress.
      * **Body (JSON):** `{ "userId": "test-user-01", "lessonId": "YOUR_LESSON_ID" }`

  * **[POST]** `http://localhost:3001/api/promote`

      * Promotes a user to a new belt.
      * **Body (JSON):** `{ "userId": "test-user-01", "newBelt": "yellow" }`

<!-- end list -->