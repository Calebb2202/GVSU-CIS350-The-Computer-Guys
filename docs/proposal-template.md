**Team name:** The Computer Guys

**Team members:** Aiden, Caleb, Dmitry, Poom


# Introduction

Our Project is named "Syntax Sensei", it is a Python Programming language learning website. Users will follow lessons to learn Python starting basic and getting increasingly difficult. The lessons are created by AI but are verified to be accurate and helpful by our team. The project will focus on gamefying the learning similar to Duolingo but for coding.

### **Features:**
# Overview

This document defines the features, goals, and constraints for the "Syntax Sensei" project. Its purpose is to provide a clear, shared understanding for the development team of what the software will do and how it will perform.

# Software Requirments
## Functional Requirements

### User Account Management
| ID | Requirement |
| :-------------: | :---------- |
| FR1 | The system shall allow users to access and complete lessons without creating an account (guest mode). |
| FR2 | The system shall not save any lesson progress for users in guest mode. |
| FR3 | The system shall allow a user to register and log in using their existing Google account (Single Sign-On). |
| FR4 | The system shall, upon successful login, save the user's current belt and total XP. |
| FR5 | The system shall allow a logged-in user to log out of their account. |

### User Progression Dashboard
| ID | Requirement |
| :-------------: | :---------- |
| FR6 | The system shall provide a dedicated dashboard page, which will be populated with user-specific data only for logged-in users. |
| FR7 | The system shall display the user's current "belt" rank on the dashboard. |
| FR8 | The system shall display the user's total earned XP (Experience Points) on the dashboard. |
| FR9 | The system shall organize lessons into "belt" units (e.g., "White Belt," "Orange Belt") and display them on the dashboard. |
| FR10 | The dashboard shall serve as the primary navigation hub, allowing users to select and start lessons from the displayed units. |

### Lesson Module
| ID | Requirement |
| :-------------: | :---------- |
| FR11 | The system shall present a "Concept" pop-up or modal at the beginning of each lesson explaining the topic. |
| FR12 | The system shall present lessons containing multiple-choice questions. |
| FR13 | The system shall present lessons containing fill-in-the-blank questions. |
| FR14 | The system shall provide immediate feedback (e.g., "Correct" or "Incorrect") to the user after they submit an answer. |
| FR15 | The system shall, upon successful completion of an entire lesson, grant the user a predefined amount of XP. |
| FR16 | The system shall display a progress bar within the lesson interface to show the user's progress toward completing the current lesson. |


## Non-Functional Requirements

### Performance & Usability
| ID | Requirement |
| :-------------: | :---------- |
| NFR1 | The system shall provide feedback to user interactions (e.g., submitting an answer) in under 500 milliseconds. |
| NFR2 | The user's dashboard and lesson pages shall load, on a standard internet connection, in under 3 seconds. |
| NFR3 | The application shall be designed for and functional on desktop screen resolutions (minimum width 1280px). |
| NFR4 | The application shall render correctly on the latest stable versions of Google Chrome and Firefox. |
| NFR5 | The application shall maintain a consistent and intuitive user interface (UI) design across all pages. |

### Security
| ID | Requirement |
| :-------------: | :---------- |
| NFR6 | The system shall securely implement the Google OAuth 2.0 (Single Sign-On) protocol to authenticate users. |
| NFR7 | The backend API shall use CORS (Cross-Origin Resource Sharing) to restrict access to only the deployed frontend application. |
| NFR8 | The backend's Firebase Admin service account key shall not be stored in the public code repository. |
| NFR9 | The frontend application shall store user authentication information in secure browser storage (e.g., `localStorage`). |
| NFR10 | The backend API endpoints that modify user data shall be protected to only accept requests from authenticated sources. |

### Backend & Database
| ID | Requirement |
| :-------------: | :---------- |
| NFR11 | The backend server shall be written in Node.js using the Express framework. |
| NFR12 | The backend API endpoints shall return data in the JSON (JavaScript Object Notation) format. |
| NFR13 | The system shall use Google Firestore as its NoSQL database for storing user and lesson data. |
| NFR14 | The backend API shall be stateless (no user session data shall be stored on the server itself). |
| NFR15 | All core lesson and challenge content shall be seeded into the database via a JavaScript script (`lesson_creation.js`) for maintainability. |

 
# Anticipated Technologies/Tech Stack

| Category | Tools & Technologies |
| :--- | :--- |
| **Frontend** | React, Vite, ContextAPI |
| **Backend** | Node.js, Express.js |
| **Database** | Firebase |
| **Languages** | HTML, CSS, JavaScript |
| **Tools** | VS Code, Git, GitHub, Postman, npm |

# Method/Approach

We plan to use the Phased Development model for our project. This is because we want to push out different features of the app over time. Once we have all our functional and non functional requirements and a general design we all agree on, we will first create lessons. After we create lessons, we will create saved progress starting with the users cached information. Then we will implement a login feature to store the users progress and achievements. We have other things that we would like to push out as well, but these are core functionalities.

# Estimated Timeline

### Phase 1: Design User Interactivity (Oct1-Oct5 )
Create a flow charts and UML diagrams for how the user intreacts with our website and how the general design of our website will flow. This also includes finializing our core requirements both functional and non-functional.
### Phase 2: UI prototypes and Familiarize with Technology: (Oct5-Oct12)
This phase is dedicated for the frontend developers to design a pleasant user interface utilizing something like Figma Design and changing the GUI prototype based on user feedback. Then for backend developers they are to familiarize themselves with the python libraries and other technologies as well as understanding the UML diagrams and flow charts will translate to developement.
### Phase 3: Developement (Oct12-Oct26)
Developement will begin. Backend will create the core basic functionalities of the website. Frontend will start developing the GUI focusing on primarily getting a quick working GUI so that Backend developers can test their functionalites on a GUI in the near future.
### Phase 4: Styling and Backend compatibility (Oct26-Nov9)
Backend developers will further develope functionality and test the compatibility with
### Phase 5: Lessons and security (Nov9-Nov23)
Any lose ends will be tied up in the functionality side. Then in this phase we will primarily focus on creating all of the lessons that the users will need to get a good grasp on the programming language Python. We will also focus on verifying our website will be secure for the user.
### Phase 6: Testing, Bug Fixing, and Final GUI changes (Nov23-Nov30)
In this phase we should have finished developement by now so we have now moved onto writiing test cases for our project and fixing bugs that arise
### Phase 7: Finalizing the Project for Release (Nov30-DueDate)
In this final phase we will finalize the product preparing it for release and submission.

# Estimated Timeline (Revised Oct 19)

### Phase 1: Planning & Requirements (Oct 1 - Oct 19)
* **Goal:** Finalize the SRS, tech stack, and UML diagrams. All high-level planning is complete.

### Phase 2: Project Setup & Core Services (Oct 20 - Oct 29)
* **Goal:** Get the project's "skeleton" running for both frontend and backend.
* **Frontend:**
    * Set up the React + Vite project in the GitHub repo.
    * Build the main static components (Navbar, Footer, Homepage).
    * Set up page routing (e.g., for `/login`, `/dashboard`, `/lesson`).
* **Backend:**
    * Set up the Node.js + Express server.
    * Set up the Firebase project (Auth and Firestore).
    * Implement Google SSO (login/logout) and create the "users" collection in Firestore.

### Phase 3: Parallel Feature Development (Oct 30 - Nov 21)
* **Goal:** This is the main build phase where all features are built and connected simultaneously.
* **Frontend (Task 1):**
    * Build the UI for the Dashboard, Lesson Page, and Proficiency Quiz.
    * Use plain CSS to style all pages to match your vision.
* **Backend (Task 2):**
    * Build all REST API endpoints for lessons (e.g., `GET /api/lessons`, `POST /api/submit-answer`).
    * Implement the progression logic (saving progress, updating belt rank).
* **Content (Task 3):**
    * (Can be done by anyone) Write all lesson text, questions, and answers and load them into the Firebase database.
* **Integration (Task 4):**
    * Frontend and Backend teams work together to connect the React UI to the API. This is not a separate phase; it should happen *continuously* during this period.

### Phase 4: High-Risk Feature (Nov 16 - Nov 30)
* **Goal:** Build the single most complex feature: the Belt Promotion Challenge.
* **Description:** This phase overlaps with Phase 3. One or two developers should focus *only* on this task.
* **Tasks:**
    * Build the IDE-like UI in React.
    * Create the "sandboxed" backend service that safely runs Python code.
    * Implement the logic for checking the user's code output against hidden test cases.

### Phase 5: Testing, Bug Fixing, & Feature Freeze (Dec 1 - Dec 5)
* **Goal:** Stop adding new features and stabilize the project.
* **Description:** NO NEW FEATURES. The entire team's focus shifts to testing every part of the application.
* **Tasks:**
    * Test all use cases (logging in, completing a lesson, passing a belt, etc.).
    * Fix all critical bugs.
    * Ensure all content is loaded and correct.

### Phase 6: Final Submission (Dec 6)
* **Goal:** Package and submit the project.
* **Tasks:**
    * Finalize all documentation.
    * Prepare for the project presentation/demo.
    * Submit the code.

# Anticipated Problems

### Creating an IDE Inside our Website
We think that creating an IDE for python inside of our web app and verifying all the logic works will be a difficult task.

### GUI design
When creating a GUI there are lots of possibilities to consider such as Functionality, Ease of Use, Style of GUI, and the Speed our GUI functions at.

### Security 
We think that the security of our project could be an issue especially for a project just being developed over the semester
