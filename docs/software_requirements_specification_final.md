# Requirments

## Functional Requirements

### 1. User Account Management
1.  The system shall allow users to access and complete lessons without creating an account (guest mode).
2.  The system shall not save any lesson progress for users in guest mode.
3.  The system shall allow a user to register and log in using their existing Google account (Single Sign-On).
4.  The system shall, upon successful login, save the user's current belt and total XP.
5.  The system shall allow a logged-in user to log out of their account.

### 2. User Progression Dashboard
1.  The system shall provide a dedicated dashboard page, which will be populated with user-specific data only for logged-in users.
2.  The system shall display the user's current "belt" rank on the dashboard.
3.  The system shall display the user's total earned XP (Experience Points) on the dashboard.
4.  The system shall organize lessons into "belt" units (e.g., "White Belt," "Orange Belt") and display them on the dashboard.
5.  The dashboard shall serve as the primary navigation hub, allowing users to select and start lessons from the displayed units.

### 3. Lesson Module
1.  The system shall present a "Concept" pop-up or modal at the beginning of each lesson explaining the topic.
2.  The system shall present lessons containing multiple-choice questions.
3.  The system shall present lessons containing fill-in-the-blank questions.
4.  The system shall provide immediate feedback (e.g., "Correct" or "Incorrect") to the user after they submit an answer.
5.  The system shall, upon successful completion of an entire lesson, grant the user a predefined amount of XP.
6.  The system shall display a progress bar within the lesson interface to show the user's progress toward completing the current lesson.

---

## Non-Functional Requirements

### 1. Performance & Usability
1.  The system shall provide feedback to user interactions (e.g., submitting an answer) in under 500 milliseconds.
2.  The user's dashboard and lesson pages shall load, on a standard internet connection, in under 3 seconds.
3.  The application shall be designed for and functional on desktop screen resolutions (minimum width 1280px).
4.  The application shall render correctly on the latest stable versions of Google Chrome and Firefox.
5.  The application shall maintain a consistent and intuitive user interface (UI) design across all pages.

### 2. Security
1.  The system shall securely implement the Google OAuth 2.0 (Single Sign-On) protocol to authenticate users.
2.  The backend API shall use CORS (Cross-Origin Resource Sharing) to restrict access to only the deployed frontend application.
3.  The backend's Firebase Admin service account key shall not be stored in the public code repository.
4.  The frontend application shall store user authentication information in secure browser storage (e.g., `localStorage`).
5.  The backend API endpoints that modify user data shall be protected to only accept requests from authenticated sources.

### 3. Backend & Database
1.  The backend server shall be written in Node.js using the Express framework.
2.  The backend API endpoints shall return data in the JSON (JavaScript Object Notation) format.
3.  The system shall use Google Firestore as its NoSQL database for storing user and lesson data.
4.  The backend API shall be stateless (no user session data shall be stored on the server itself).
5.  All core lesson and challenge content shall be seeded into the database via a JavaScript script (`lesson_creation.js`) for maintainability.

# Artifacts
