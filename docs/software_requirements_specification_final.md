# Overview

This document covers our project's software requirments specification (SRS). Overall this document outlines a picture of the project's requirments that make it a viable product and provides detailed documentation of the functionality of the project. The document specifically contains the project's requirments and the project's artifacts which visually represent different aspects of the project.

# Software Requirments

This portion of the doccument describes our requirments for the project covering both functional and non functional. The requirments gives a gauge at how the project should function, look, and perform. Our requirments are also organized in categories of User Account Management, User Progression Dashboard, Lesson Modules, Performance & Usability, Security, and Backend & Database. 

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
| FR10 | The dashboard shall serve as the primary navigation hub, allowing users to navigate to the lessons page then select and start lessons from the displayed units. |

### Lesson Module
| ID | Requirement |
| :-------------: | :---------- |
| FR11 | The system shall present a "Concept" pop-up at the beginning of each lesson explaining the topic. |
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

# Artifacts

This section documents the representations of the project's functionalities such as diagrams (artifacts). These artifacts were developed during the before development process and were followed for organized development.

* [Use Case Diagram](../artifacts/use_case_diagram/use_case_diagram.png) (use_case_diagram.png)
* [Sequence Diagram](../artifacts/sequence_chart/syntax_sensei_sequence_diagram.png) (syntax_sensei_sequence_diagram.png)
* [Database Schema](../artifacts/database_schema/syntax_sensei_schema.png) (syntax_sensei_schema.png)
* [old Diagrams](../artifacts/old_artifacts/) (old diagrams that are now irrelevant kept for documentation purposes)
