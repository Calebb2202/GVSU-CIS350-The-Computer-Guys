class Lesson:
    def __init__(self, title: str, description: str, goal: str, solution: str, preloaded_code: str = "", hints: list = None, review_questions: list = None, recommended_reviews: list = None):
        # Error checking
        if not isinstance(title, str):
            raise TypeError("Title must be a string")
        if not isinstance(description, str):
            raise TypeError("Description must be a string")
        if not isinstance(goal, str):
            raise TypeError("Goal must be a string")
        if not isinstance(solution, str):
            raise TypeError("Solution must be a string")
        if not isinstance(preloaded_code, str):
            raise TypeError("Preloaded code must be a string")
        if hints is not None and not isinstance(hints, list):
            raise TypeError("Hints must be a list of strings or None")
        if review_questions is not None and not isinstance(review_questions, list):
            raise TypeError("Review questions must be a list of strings or None")
        if recommended_reviews is not None and not isinstance(recommended_reviews, list):
            raise TypeError("Recommended reviews must be a list of lesson objects or None")
        
        # defining attributes
        self._title = title
        self._description = description
        self._goal = goal
        self._solution = solution
        self._preloaded_code = preloaded_code

        if hints is None:
            self._hints = []
        else:
            self._hints = hints
        if review_questions is None:
            self._review_questions = []
        else:   
            self._review_questions = review_questions
        if recommended_reviews is None:
            self._recommended_reviews = []
        else:
            self._recommended_reviews = recommended_reviews

    @property  # Returns the lesson title
    def title(self):
        return self._title

    @property  # Returns the lesson description
    def description(self):
        return self._description

    @property  # Returns the lesson goal
    def goal(self):
        return self._goal

    @property  # Returns the solution output
    def solution(self):
        return self._solution

    @property  # Returns the preloaded code
    def preloaded_code(self):
        return self._preloaded_code

    @property  # Returns the hints list
    def hints(self):
        return self._hints

    @property  # Returns the review questions list
    def review_questions(self):
        return self._review_questions

    @property  # Returns the recommended reviews list
    def recommended_reviews(self):
        return self._recommended_reviews

    # Returns a hint by index
    def get_hint(self, index: int):
        if 1 <= index <= len(self.hints):
            return self.hints[index - 1]
        return "Invalid index"

    # Gets review questions from recommended lessons
    def get_review_questions(self):
        questions = []
        for lesson_obj in self.recommended_reviews:
            questions.extend(lesson_obj.review_questions)
        return questions

    # Checks if user code matches solution
    def check_code(self, user_code: str):
        # THIS METHOD NEED TO BE IMPLEMENTED
        pass

    # Converts lesson to dictionary
    def to_dict(self):
        # THIS METHOD NEED TO BE IMPLEMENTED
        # something with a dictionary and JSON file
        pass

