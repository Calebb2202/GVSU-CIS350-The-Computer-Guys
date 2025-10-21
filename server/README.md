# Syntax Sensei Backend Setup Guide

This guide explains how to get the backend server running on your local machine for development and testing. (Instructions written by Gemini please ask Caleb if any clarification is needed).

## 1. Required Tools

You must install these tools first:

1.  **Node.js (LTS):** This runs the JavaScript code on your computer.
    * **Windows:** Install `nvm-windows` ([from here](https://github.com/coreybutler/nvm-windows/releases)) and then run `nvm install lts` and `nvm use lts`.
    * **Mac:** Install `nvm` ([using Homebrew](https://github.com/nvm-sh/nvm#installing-and-updating)) and then run `nvm install --lts` and `nvm use --lts`.
2.  **Postman:** This is what we use to test the API (our "fake frontend" for testing the backend). [Download it here](https://www.postman.com/downloads/).

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

1.  Go to the [Syntax Sensei Firebase Console](https://console.firebase.google.com/). (Ask the team for the project link/ID if you can't find it).
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
├── package.json
├── ...
└── serviceAccountKey.json  <-- Your secret key
```

## 4\. Run the Server

That's it\! Now you can start the server.

```bash
# Make sure you are in the server/ folder
cd server

# Run the main server file
node index.js
```

You should see this message in your terminal:
\`Backend server running at http://localhost:3This guide explains how to get the backend server running on your local machine for development and testing.

## 1\. Required Tools

You must install these tools first:

1.  **Node.js (LTS):** This runs the JavaScript code on your computer.
      * **Windows:** Install `nvm-windows` ([from here](https://github.com/coreybutler/nvm-windows/releases)) and then run `nvm install lts` and `nvm use lts`.
      * **Mac:** Install `nvm` ([using Homebrew](https://www.google.com/url?sa=E&source=gmail&q=https://github.com/nvm-sh/nvm#installing-and-updating)) and then run `nvm install --lts` and `nvm use --lts`.
2.  **Postman:** This is what we use to test the API (our "fake frontend"). [Download it here](https://www.postman.com/downloads/).

## 2\. Project Setup

After you pull the project from GitHub, you need to install the backend's "ingredients" (packages).

```bash
# 1. Navigate into the server folder
cd server

# 2. Install all the packages listed in package.json
npm install
```

## 3\. The Secret Key (CRITICAL STEP)

The server will not run without the Firebase Admin secret key. This file is **not** on GitHub for security. You must get your own.

1.  Go to the [Syntax Sensei Firebase Console](https://console.firebase.google.com/). (Ask the team for the project link/ID if you can't find it).
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
├── package.json
├── ...
└── serviceAccountKey.json  <-- Your secret key
```

## 4\. Run the Server

That's it\! Now you can start the server.

```bash
# Make sure you are in the server/ folder
cd server

# Run the main server file
node index.js
```

You should see this message in your terminal:
`Backend server running at http://localhost:3001`

The server is now running. You can use Postman to send requests to it (e.g., `GET http://localhost:3001/api/lessons`).