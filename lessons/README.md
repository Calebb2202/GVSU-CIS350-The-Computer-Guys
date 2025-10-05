# Lesson Development
This document will outline how we went about developing the python lessons. Overall to develop lessons we decided to create a lesson class and have all of our lessons be an object of said class with attributes such as: title, description, belt, etc and methods like get_methods, hints, etc. 
# Attributes
### title (str):
This attribute holds the title of the lesson.
### description (str):
This attribute is a long string that holds the instructions for the user on what to do to complete the lesson
### goal (str):
This attribute gives a clear goal to the user for them to accomplish
### **solution (str):**
This attribute is not shown to the user. This attribute holds the output of the correct code, so if the user's output matches this string the user has completed the lesson
### **preloaded_code (str):**
This attribute can be empty or have python code inside of it. When it is not empty it will display in the code editor. It will be ultilized when lessons want users to either change existing code or complete the rest of the code. 
### **hints (list of str):**
This attribute is a list of strings. Specifically it holds 3 "hints" for each lesson. The first str helps the user along but still have them do a lot of the thinking, the second hint will dramatically help the user along with the code, then the third hint will just be the code needed to solve the problem.
### **review_questions (list of "review" objects):**
This attribute is a list of objects to the class "review". review objects are essentially short form multiple choice questions to review a topic. The review objects in this list will all be review questions correlating to the specific lesson object it's attatched to. So these review questions are used in later lessons to study on the skills needed to complete the later lesson.
### **recomended_reviews (list of "lesson" objects):**
This attribute is a list of objects to the class "lesson". These lesson objects are the topics needed to review if a user doesn't feel adequate enough to solve the current lesson. The user can then review for this lesson and they will answer the review questions for all the lesson objects in the recomended_reviews list.
# Methods
### **getter methods ():**
These methods will just return the value corresponding to the attribute for example "get_title()" returns the title attribute. There is get methods for all attributes.
### **get_hint (index:int):**
This method will be called when the user requests a hint. The input index corresponds to which hint to return from the hints attribute. 1 is the first hint in the list, 2 is the second hint, and 3 is the third and final hint
### **get_review_questions ():**
This method uses the recomended_reviews list to go through the list of lesson objects grabbing the review objects in the review_questions list of each lesson.
### **check_code (user_code:str):**
This method will check if the user's current code is the correct solution comparing the user code's output with the solution attribute. The method returns a boolean value, False if the user's code is incorrect and True if the user's code is correct.
### **to_dict ():**
This method converts lots of data about a lesson into a dictionary for the frontend to then be able to utilize easier.

