**Syntax Sensei Use-Case Descriptions**

* **Use Case:** Log in with Google
    * **Actors:** Guest, Google Authentication System
    * **Description:** The Guest selects the login option. The system redirects to the Google Authentication service. On successful login, Google confirms the user's identity, and the system grants them access as a `Logged in User`.

* **Use Case:** Take Lesson
    * **Actors:** Guest, Logged in User, Admin
    * **Description:** The user selects a lesson from the progression path. The system displays the lesson content and its interactive questions. The user submits their answers and receives immediate feedback.

* **UseCase:** View Dashboard
    * **Actors:** Logged in User, Admin
    * **Description:** The user navigates to their personal dashboard. The system displays their current "belt" rank, overall progress, and a list of their completed lessons.

* **Use Case:** Take Proficiency Quiz
    * **Actors:** Logged in User, Admin
    * **Description:** The user opts to take the proficiency quiz. The system presents a series of questions. Upon completion, the system grades the quiz and places the user at the appropriate "belt" level.

* **Use Case:** Log Out
    * **Actors:** Logged in User, Admin
    * **Description:** The user selects the "log out" option. The system terminates their session and returns them to the Guest view.

* **Use Case:** Submit Coding Challenge
    * **Actors:** Logged in User, Admin
    * **Description:** The user opens the end-of-belt coding challenge. The user writes Python code in the provided IDE, runs it to check their output, and submits it for validation. The system checks their code against hidden test cases and informs them if they passed or failed.

* **Use Case:** Save Progress
    * **Actors:** Logged in User, Admin (This is an *extended* use case, not directly initiated.)
    * **Description:** This use case *extends* `Take Lesson` and `Submit Coding Challenge`. When a `Logged in User` or `Admin` completes a lesson or passes a challenge, the system automatically records this completion in the database and updates their progress.

* **UseCase:** Manage Lessons
    * **Actors:** Admin
    * **Description:** The Admin navigates to the content management panel. The Admin can create, edit, delete, or reorder lessons and their associated questions within the different "belt" sections.

* **Use Case:** Manage Proficiency Quiz
    * **Actors:** Admin
    * **Description:** The Admin navigates to the content management panel. The Admin can create, edit, or delete questions for the initial proficiency quiz.
