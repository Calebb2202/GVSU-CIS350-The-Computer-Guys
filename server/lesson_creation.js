// This file contains all the lesson data and will upload
// it to Firebase when run.
// To run the file, type `node lesson_creation.js` in the terminal.

const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

// --- 1. CONNECT TO FIREBASE ---
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();

// --- 2. LESSON DATA ---
// This is where you write all your content.
const LESSONS_TO_ADD = [
  {
    title: "Welcome to Python",
    lessonNum: 1,
    belt: "white",
    content: "Welcome! A 'program' is a set of instructions for a computer to follow. 'Syntax' is the set of rules, like grammar, that defines how to write those instructions. Python is a popular language known for its simple, readable syntax.",
    questions: [
      {
        type: "mcq",
        prompt: "What is a 'program'?",
        options: [
          "A set of instructions for a computer",
          "A physical computer part",
          "The grammar of a language",
          "A bug in the code"
        ],
        answer: "A set of instructions for a computer"
      },
      {
        type: "mcq",
        prompt: "The 'rules' or 'grammar' of a programming language is called its...",
        options: ["Comments", "Syntax", "Variables", "Operators"],
        answer: "Syntax"
      },
      {
        type: "fill-in-blank",
        prompt: "Python is known for its simple and readable ____.",
        answer: "syntax"
      },
      {
        type: "mcq",
        prompt: "True or False: Syntax is like the 'grammar' of a programming language.",
        options: ["True", "False"],
        answer: "True"
      }
    ]
  },
  {
    title: "Hello, World!: The print() function",
    lessonNum: 2,
    belt: "white",
    content: "The `print()` function is the most basic way to get Python to display output. You pass it data (like text) inside the parentheses, and it will show up in the console. Text, also called a 'string', must be surrounded by quotes.",
    questions: [
      {
        type: "fill-in-blank",
        prompt: "What function do you use to display text on the screen?",
        answer: "print()"
      },
      {
        type: "mcq",
        prompt: "How would you print the exact text `Hello`?",
        options: [
          "print(Hello)",
          "print(\"Hello\")",
          "display(\"Hello\")",
          "display Hello"
        ],
        answer: "print(\"Hello\")"
      },
      {
        type: "fill-in-blank",
        prompt: "Text data, which must be in quotes, is called a ____.",
        answer: "string"
      },
      {
        type: "mcq",
        prompt: "What is the output of `print(\"Python is fun\")`?",
        options: ["Error", "\"Python is fun\"", "Python is fun", "\"print()\""],
        answer: "Python is fun"
      }
    ]
  },
  {
    title: "Comments",
    lessonNum: 3,
    belt: "white",
    content: "Comments are notes in your code that Python ignores. They are for humans to read! In Python, any line that starts with a hash symbol (`#`) is a comment. They are crucial for explaining *why* your code does something, not just *what* it does.",
    questions: [
      {
        type: "fill-in-blank",
        prompt: "What symbol do you use to start a comment in Python?",
        answer: "#"
      },
      {
        type: "mcq",
        prompt: "What is the purpose of a comment?",
        options: [
          "To crash the program",
          "To be read by the computer",
          "To be read by humans",
          "To store data"
        ],
        answer: "To be read by humans"
      },
      {
        type: "mcq",
        prompt: "Which of the following is a valid Python comment?",
        options: [
          "// This is a comment",
          "",
          "# This is a comment",
          "* This is a comment"
        ],
        answer: "# This is a comment"
      },
      {
        type: "mcq",
        prompt: "True or False: Python will try to execute the code inside a comment.",
        options: ["True", "False"],
        answer: "False"
      }
    ]
  },
  {
    title: "Variables",
    lessonNum: 4,
    belt: "white",
    content: "A variable is like a box with a label. You can store data in it to use later. For example, `name = \"Alice\"` creates a variable named `name` that holds the string `\"Alice\"`. Common data types are Strings (text), Integers (whole numbers), and Floats (decimal numbers).",
    questions: [
      {
        type: "mcq",
        prompt: "What is a variable?",
        options: [
          "A math problem",
          "A container to store data",
          "A function",
          "A type of syntax"
        ],
        answer: "A container to store data"
      },
      {
        type: "fill-in-blank",
        prompt: "The data type for text (like \"Hello\") is called a ____.",
        answer: "string"
      },
      {
        type: "fill-in-blank",
        prompt: "The data type for a whole number (like 10) is called an ____.",
        answer: "integer"
      },
      {
        type: "mcq",
        prompt: "What is the data type for a decimal number like 9.99?",
        options: ["String", "Integer", "Float", "Comment"],
        answer: "Float"
      },
      {
        type: "mcq",
        prompt: "Which line of code correctly stores the number 25 in a variable named `age`?",
        options: ["25 = age", "age = 25", "age == 25", "variable age = 25"],
        answer: "age = 25"
      }
    ]
  },
  {
    title: "Basic Math",
    lessonNum: 5,
    belt: "white",
    content: "Python can be used as a powerful calculator. It uses standard math operators: `+` (addition), `-` (subtraction), `*` (multiplication), and `/` (division). The modulo operator (`%`) is special: it gives you the *remainder* of a division.",
    questions: [
      {
        type: "mcq",
        prompt: "What is the output of `print(10 + 5)`?",
        options: ["10", "5", "15", "10+5"],
        answer: "15"
      },
      {
        type: "mcq",
        prompt: "What symbol is used for multiplication?",
        options: ["x", "*", "X", "mult"],
        answer: "*"
      },
      {
        type: "fill-in-blank",
        prompt: "The `%` operator is called 'modulo'. What is the output of `10 % 3`? (Hint: It's the remainder)",
        answer: "1"
      },
      {
        type: "mcq",
        prompt: "What is the output of `print(5 * 2 + 3)`? (Hint: Order of Operations)",
        options: ["13", "25", "16", "10"],
        answer: "13"
      }
    ]
  },
  {
    title: "User Input",
    lessonNum: 6,
    belt: "white",
    content: "To make your programs interactive, you need to get to get input from the user. You do this with the `input()` function. It pauses the program, waits for the user to type something, and then returns whatever they typed *as a string*. You can also give it a prompt to show the user what to type such as 'input(\"What is your favorite color? \")'.",
    questions: [
      {
        type: "fill-in-blank",
        prompt: "What function do you use to get data from a user?",
        answer: "input()"
      },
      {
        type: "mcq",
        prompt: "What data type does the `input()` function *always* return?",
        options: ["Integer", "Float", "String", "Boolean"],
        answer: "String"
      },
      {
        type: "mcq",
        prompt: "How would you ask the user for their name and store it in a variable called `username`?",
        options: [
          "username = input(\"What is your name? \")",
          "input(\"What is your name? \") = username",
          "print(\"What is your name? \", username)",
          "username.input()"
        ],
        answer: "username = input(\"What is your name? \")"
      },
      {
        type: "fill-in-blank",
        prompt: "If you run `age = input(\"Age: \")` and the user types `30`, the variable `age` will store the ____ \"30\", not the number 30.",
        answer: "string"
      }
    ]
  },
  {
    title: "Type Casting",
    lessonNum: 7,
    belt: "white",
    content: "Because `input()` always gives you a string, you'll need to convert it if you want to do math with a number input. This is called 'type casting'. You can use `int()` to convert to an integer, `float()` to a float, and `str()` to a string.",
    questions: [
      {
        type: "mcq",
        prompt: "What is 'type casting'?",
        options: [
          "Creating a variable",
          "Naming a variable",
          "A type of error",
          "Converting data from one type to another"
        ],
        answer: "Converting data from one type to another"
      },
      {
        type: "fill-in-blank",
        prompt: "What function converts data into a whole number (an integer)?",
        answer: "int()"
      },
      {
        type: "mcq",
        prompt: "If you have `age_string = \"25\"`, how do you convert it to a whole number and store it in `age_num`?",
        options: [
          "age_num = float(age_string)",
          "age_num = str(age_string)",
          "age_num = int(age_string)",
          "age_num = age_string.to_int()"
        ],
        answer: "age_num = int(age_string)"
      },
      {
        type: "mcq",
        prompt: "What is the output of `print(\"Your age is \" + 10)`? (Hint: a string type and a int type are being added)",
        options: ["Your age is 10", "10", "\"Your age is 10\"", "An error"],
        answer: "An error"
      },
      {
        type: "fill-in-blank",
        prompt: "To fix the error in the previous question, you would write `print(\"Your age is \" + ____(10))` (Hint: we want to print, Your age is 10)",
        answer: "str"
      }
    ]
  },
  {
    title: "String Basics",
    lessonNum: 8,
    belt: "white",
    content: "You can join strings using the `+` operator, which is called 'concatenation'. A more modern and readable way is to use 'f-strings'. An f-string starts with an `f` before the quotes and lets you insert variables directly inside print statements, to do this you insert the variable of choice into curly braces `{}`.",
    questions: [
      {
        type: "mcq",
        prompt: "What is 'concatenation'?",
        options: [
          "A type of math",
          "Multiplying strings",
          "Joining strings together",
          "A syntax error"
        ],
        answer: "Joining strings together"
      },
      {
        type: "mcq",
        prompt: "What is the output of `print(\"Hello\" + \" \" + \"World\")`?",
        options: ["HelloWorld", "Hello World", "\"Hello World\"", "Error"],
        answer: "Hello World"
      },
      {
        type: "fill-in-blank",
        prompt: "A special string that starts with an `f` and lets you put variables in `{}` is called an ____.",
        answer: "f-string"
      },
      {
        type: "mcq",
        prompt: "If `name = \"Alex\"`, which f-string would print `Hello, Alex`?",
        options: [
          "f\"Hello, name\"",
          "\"Hello, {name}\"",
          "f\"Hello, {name}\"",
          "f\"Hello, {Alex}\""
        ],
        answer: "f\"Hello, {name}\""
      }
    ]
  },
  // --- ORANGE BELT LESSONS ---
  {
    title: "Booleans: True and False",
    lessonNum: 9,
    belt: "orange",
    content: "We've learned about strings, integers, and floats. The next major data type is a 'boolean'. A boolean is simple: it can only have two possible values: `True` or `False`. Notice the capital 'T' and 'F'! Booleans are the foundation of all logic and decision-making in your code.",
    questions: [
      {
        type: "mcq",
        prompt: "What is a 'boolean'?",
        options: [
          "A type of number",
          "A data type with only two values: True or False",
          "A string of text",
          "A math operator"
        ],
        answer: "A data type with only two values: True or False"
      },
      {
        type: "mcq",
        prompt: "What are the two boolean values?",
        options: ["Yes and No", "1 and 0", "True and False", "On and Off"],
        answer: "True and False"
      },
      {
        type: "mcq",
        prompt: "Which of the following is the correct syntax for the 'true' boolean value?",
        options: ["true", "`True`", "TRUE", "True"],
        answer: "True"
      },
      {
        type: "fill-in-blank",
        prompt: "A data type that can only be `True` or `False` is called a ____.",
        answer: "boolean"
      }
    ]
  },
  {
    title: "Comparison Operators",
    lessonNum: 10,
    belt: "orange",
    content: "How do we get a boolean value? By asking a question. We use 'comparison operators' to compare two values, and the result is *always* a boolean. \n`==` (Equal to)\n`!=` (NOT equal to)\n`>` (Greater than)\n`<` (Less than)\n`>=` (Greater than or equal to)\n`<=` (Less than or equal to)\nFor example, `print(5 > 3)` will output `True`.",
    questions: [
      {
        type: "mcq",
        prompt: "Which operator checks if two values are *equal*?",
        options: ["=", "==", "equals", "!="],
        answer: "=="
      },
      {
        type: "mcq",
        prompt: "Which operator checks if two values are *NOT equal*?",
        options: ["!=", "===", "<>", "not =="],
        answer: "!="
      },
      {
        type: "fill-in-blank",
        prompt: "What is the output of `print(10 < 20)`?",
        answer: "True"
      },
      {
        type: "fill-in-blank",
        prompt: "What is the output of `print(50 == 51)`?",
        answer: "False"
      },
      {
        type: "fill-in-blank",
        prompt: "The result of a comparison (like `5 > 2`) is always a ____ value.",
        answer: "boolean"
      }
    ]
  },
  {
    title: "Conditional Logic: if, elif, and else",
    lessonNum: 11,
    belt: "orange",
    content: "Now we can *use* booleans! The `if` statement lets you run code only *if* a condition is `True`. The syntax requires a colon (`:`) and for the code block underneath to be **indented** (meaning before the code lines below the if statement they needs a tab or a space). Indentation is how Python groups code. You can use `else` for code that runs if the condition is `False`. You can use `elif` (short for 'else if') to check another condition.",
    questions: [
      {
        type: "mcq",
        prompt: "What keyword do you use to start a conditional statement?",
        options: ["when", "check", "if", "for"],
        answer: "if"
      },
      {
        type: "fill-in-blank",
        prompt: "Code that runs only when the `if` condition is false goes under the ____ keyword.",
        answer: "else"
      },
      {
        type: "fill-in-blank",
        prompt: "The code block inside an `if` statement must be ____.",
        answer: "indented"
      },
      {
        type: "mcq",
        prompt: "What does `elif` stand for?",
        options: ["End loop", "Else if", "End if", "Otherwise"],
        answer: "Else if"
      },
      {
        type: "mcq",
        prompt: "If `age = 15`, what will `if age >= 18: print(\"Adult\") else: print(\"Minor\")` output?",
        options: ["Adult", "Minor", "Nothing", "An error"],
        answer: "Minor"
      }
    ]
  },
  {
    title: "Logical Operators: and, or, and not",
    lessonNum: 12,
    belt: "orange",
    content: "What if you have multiple conditions? You can combine them with 'logical operators'.\n`and`: Both conditions must be `True`. `(5 > 3) and (1 < 10)` is `True`.\n`or`: At least one condition must be `True`. `(5 > 3) or (1 > 10)` is `True`.\n`not`: Reverses the boolean value. `not True` becomes `False`.",
    questions: [
      {
        type: "mcq",
        prompt: "Which operator requires *both* conditions to be True?",
        options: ["or", "if", "and", "not"],
        answer: "and"
      },
      {
        type: "mcq",
        prompt: "Which operator requires at least *one* condition to be True?",
        options: ["or", "and", "both", "either"],
        answer: "or"
      },
      {
        type: "fill-in-blank",
        prompt: "What is the output of `print(True and False)`?",
        answer: "False"
      },
      {
        type: "fill-in-blank",
        prompt: "What is the output of `print(True or False)`?",
        answer: "True"
      },
      {
        type: "fill-in-blank",
        prompt: "What is the output of `print(not (10 == 10))`?",
        answer: "False"
      }
    ]
  },
  {
    title: "while Loops",
    lessonNum: 13,
    belt: "orange",
    content: "A 'loop' is a way to repeat code. The `while` loop will repeat a block of code (the indented part) *as long as* a condition remains `True`. A common pattern is to use a 'counter' variable that you update inside the loop. Be careful! If the condition never becomes `False`, you'll create an 'infinite loop'!",
    questions: [
      {
        type: "mcq",
        prompt: "A `while` loop repeats code as long as a condition is ____.",
        options: ["False", "True", "Indented", "A string"],
        answer: "True"
      },
      {
        type: "mcq",
        prompt: "A loop that never stops is called an ____ loop.",
        options: ["endless", "infinite", "while", "for"],
        answer: "infinite"
      },
      {
        type: "mcq",
        prompt: "What is missing from this code?\n `i = 0\n while i < 5:\n\t print(i)`",
        options: ["A colon", "Indentation", "A way to stop the loop (like i = i + 1)", "An else block"],
        answer: "A way to stop the loop (like i = i + 1)"
      },
      {
        type: "fill-in-blank",
        prompt: "How many times will\n `i = 0\n while i < 3:\n\t print(i)\n\t i = i + 1` \nprint a number?",
        answer: "3"
      }
    ]
  },
  {
    title: "for Loops",
    lessonNum: 14,
    belt: "orange",
    content: "The `for` loop is another kind of loop. Instead of looping *while* a condition is true, it loops *for each item* in a 'sequence'. The simplest sequence you already know is a string! You can loop over each character in a string. For example: `for letter in \"Hello\": print(letter)` will print H, e, l, l, o on separate lines.",
    questions: [
      {
        type: "mcq",
        prompt: "A `for` loop is designed to iterate over a ____.",
        options: ["Condition", "Sequence", "Boolean", "Variable"],
        answer: "Sequence"
      },
      {
        type: "mcq",
        prompt: "What will `\nfor char in \"Fun\":\n\tprint(char)`\n output?",
        options: ["Fun", "F, u, n", "F, then u, then n (on separate lines)", "An error"],
        answer: "F, then u, then n (on separate lines)"
      },
      {
        type: "fill-in-blank",
        prompt: "In `for x in \"Python\":`, the variable `x` is called the ____ variable.",
        answer: "loop"
      },
      {
        type: "mcq",
        prompt: "True or False: A `for` loop is better than a `while` loop when you know exactly how many times you need to loop (e.g., for every item in a sequence).",
        options: ["True", "False"],
        answer: "True"
      }
    ]
  },
  {
    title: "The range() Function",
    lessonNum: 15,
    belt: "orange",
    content: "The `for` loop is powerful when combined with the `range()` function. `range()` generates a sequence of numbers for your loop. By default, `range(5)` gives you 5 numbers, starting from 0 (0, 1, 2, 3, 4). Notice it stops *before* the number you give it! You can also give it a start and end: `range(1, 6)` gives you 1, 2, 3, 4, 5.",
    questions: [
      {
        type: "mcq",
        prompt: "What function is often used with a `for` loop to generate a sequence of numbers?",
        options: ["number()", "sequence()", "range()", "count()"],
        answer: "range()"
      },
      {
        type: "fill-in-blank",
        prompt: "The sequence generated by `range(4)` is ____.",
        answer: "0, 1, 2, 3"
      },
      {
        type: "mcq",
        prompt: "`range(10)` includes the number 10 in its sequence?",
        options: ["True", "False"],
        answer: "True"
      },
      {
        type: "mcq",
        prompt: "How would you write a `for` loop to print the numbers 1, 2, and 3?",
        options: ["for i in range(3):", "for i in range(1, 3):", "for i in range(1, 4):", "for i in range(0, 3):"],
        answer: "for i in range(1, 4):"
      }
    ]
  },
  {
    title: "The 'Off-by-One' Mistake",
    lessonNum: 16,
    belt: "orange",
    content: "One of the most common bug in programming is the 'off-by-one' mistake. This happens when your loop runs one too many, or one too few, times. This often happens because `range(5)` doesn't include 5, or when you mix up `<` and `<=` in a `while` loop. For example, `while i <= 5:` will run 6 times (for i = 0, 1, 2, 3, 4, 5)!",
    questions: [
      {
        type: "mcq",
        prompt: "What is an 'off-by-one' mistake?",
        options: [
          "A syntax error",
          "An error where your code is off the page",
          "A bug where a loop runs the wrong number of times (by one)",
          "An infinite loop"
        ],
        answer: "A bug where a loop runs the wrong number of times (by one)"
      },
      {
        type: "fill-in-blank",
        prompt: "`range(10)` generates 10 numbers, from 0 to ____.",
        answer: "9"
      },
      {
        type: "mcq",
        prompt: "How many times will this loop run? `\ni = 0\nwhile i <= 3:\n\ti = i + 1`",
        options: ["3", "4", "5", "Infinite"],
        answer: "4"
      },
      {
        type: "mcq",
        prompt: "How would you fix the loop `while i <= 3:` to only run 3 times (for i=0, 1, 2)?",
        options: ["`while i < 3:`", "`while i == 3:`", "`while i < 4:`", "`while i > 0:`"],
        answer: "`while i < 3:`"
      }
    ]
  },
  // --- BLUE BELT LESSONS ---
  {
    title: "Lists: What They Are",
    lessonNum: 17,
    belt: "blue",
    content: "So far, a variable holds just one piece of data (like `name = \"Alex\"` or `age = 20`). But what if you need to store *many* items? You use a 'List'. A list is a container that holds multiple items in order. You create a list using square brackets `[]`, separating items with commas.",
    questions: [
      {
        type: "mcq",
        prompt: "What is a list?",
        options: [
          "A variable that can only hold one number",
          "A container that holds multiple items in order",
          "A data type for a single word",
          "A type of math operator"
        ],
        answer: "A container that holds multiple items in order"
      },
      {
        type: "mcq",
        prompt: "What syntax is used to create a list?",
        options: ["()", "{}", "[]", "<>"],
        answer: "[]"
      },
      {
        type: "fill-in-blank",
        prompt: "How would you create an empty list called my_list?",
        answer: "my_list = []"
      },
      {
        type: "mcq",
        prompt: "Which of the following is a valid list of numbers?",
        options: ["[1, 2, 3]", "{1, 2, 3}", "(1, 2, 3)", "1, 2, 3"],
        answer: "[1, 2, 3]"
      }
    ]
  },
  {
    title: "List Indexing & Slicing",
    lessonNum: 18,
    belt: "blue",
    content: "To get items *out* of a list, you use their 'index'. The index is the item's position, and it **starts at 0** (just like range()). To get the first item, you use `my_list[0]`. To get the *last* item, you can use `my_list[-1]`. You can also 'slice' a list to get a new, smaller list: `my_list[1:3]` gets items from index 1 *up to, but not including,* index 3 so the 2nd value to the 4th value.",
    questions: [
      {
        type: "fill-in-blank",
        prompt: "What is the index of the *first* item in a list?",
        answer: "0"
      },
      {
        type: "mcq",
        prompt: "If `nums = [10, 20, 30, 40]`, what is `nums[1]`?",
        options: ["10", "20", "30", "An error"],
        answer: "20"
      },
      {
        type: "mcq",
        prompt: "How can you get the *last* item from any list?",
        options: ["my_list[0]", "my_list[last]", "my_list[end]", "my_list[-1]"],
        answer: "my_list[-1]"
      },
      {
        type: "mcq",
        prompt: "If `letters = ['a', 'b', 'c', 'd']`, what is `letters[0:2]`?",
        options: [
          "['a', 'b', 'c']",
          "['a', 'b']",
          "['b', 'c']",
          "['a', 'b', 'c', 'd']"
        ],
        answer: "['a', 'b']"
      }
    ]
  },
  {
    title: "List Methods",
    lessonNum: 19,
    belt: "blue",
    content: "Lists are 'mutable', which means you can change them. You can use 'methods' (functions attached to the list) to modify them.\n`.append(item)`: Adds an item to the *end* of the list.\n`.pop()`: Removes and returns the item from the *end* of the list.\n`.sort()`: Sorts the items in the list (this changes the list in-place).",
    questions: [
      {
        type: "fill-in-blank",
        prompt: "What method do you use to add an item to the end of a list?",
        answer: ".append()"
      },
      {
        type: "fill-in-blank",
        prompt: "What method do you use to remove the last item from a list?",
        answer: ".pop()"
      },
      {
        type: "mcq",
        prompt: "What does 'mutable' mean?",
        options: [
          "It cannot be changed",
          "It can be changed",
          "It can only hold numbers",
          "It is a type of error"
        ],
        answer: "It can be changed"
      },
      {
        type: "mcq",
        prompt: "What will this code output?\n`nums = [50, 10, 30]`\n`nums.sort()`\n`print(nums)`",
        options: ["[50, 10, 30]", "[10, 30, 50]", "[30, 10, 50]", "An error"],
        answer: "[10, 30, 50]"
      }
    ]
  },
  {
    title: "Looping Through Lists",
    lessonNum: 20,
    belt: "blue",
    content: "The `for` loop you learned in the Orange Belt is perfect for lists. You can use it to run a block of code for *every single item* in a list. This is much cleaner than using a `while` loop and a counter.\n\n`scores = [80, 95, 100]`\n`for score in scores:`\n`\tprint(score)`\nThis will print 80, then 95, then 100.",
    questions: [
      {
        type: "mcq",
        prompt: "What is the most common way to loop through all items in a list?",
        options: ["A while loop", "An if statement", "A for loop", "A function"],
        answer: "A for loop"
      },
      {
        type: "fill-in-blank",
        prompt: "Fill in the blank to complete this loop:\n`fruits = ['apple', 'banana']`\n`____ fruit in fruits:`\n`\tprint(fruit)`",
        answer: "for"
      },
      {
        type: "mcq",
        prompt: "What will this code output?\n`nums = [1, 2, 3]`\n`for n in nums:`\n`\tprint(n)`",
        options: [
          "1, then 2, then 3 (on separate lines)",
          "[1, 2, 3]",
          "1 2 3",
          "An error"
        ],
        answer: "1, then 2, then 3 (on separate lines)"
      },
      {
        type: "mcq",
        prompt: "True or False: A `for` loop lets you check each item in a list without you needing to know the index.",
        options: ["True", "False"],
        answer: "True"
      }
    ]
  },
  {
    title: "Dictionaries",
    lessonNum: 21,
    belt: "blue",
    content: "Lists are great, but you find items by their *number* (index 0, 1, 2...). What if you want to find items by a *word*? For that, we use a 'Dictionary'. A dictionary stores data in `key:value` pairs. You create one with curly braces `{}`.\nExample: `user = {\"username\": \"Sensei\", \"xp\": 500}`",
    questions: [
      {
        type: "mcq",
        prompt: "What syntax is used to create a dictionary?",
        options: ["[]", "()", "{}", "<>"],
        answer: "{}"
      },
      {
        type: "fill-in-blank",
        prompt: "A dictionary stores data as `____:____` pairs.",
        answer: "key:value"
      },
      {
        type: "mcq",
        prompt: "Which of the following is a valid dictionary?",
        options: [
          "[\"name\", \"alex\"]",
          "(\"name\", \"alex\")",
          "{\"name\": \"alex\"}",
          "\"name\": \"alex\""
        ],
        answer: "{\"name\": \"alex\"}"
      },
      {
        type: "fill-in-blank",
        prompt: "In `car = {\"make\": \"Ford\"}`, the *key* is ____.",
        answer: "\"make\""
      }
    ]
  },
  {
    title: "Working with Dictionaries",
    lessonNum: 22,
    belt: "blue",
    content: "To work with dictionaries, you use the keys. using the example: `user = {\"username\": \"Sensei\", \"xp\": 500}`\n**Accessing:** `user[\"username\"]` will give you \"Sensei\".\n**Adding:** `user[\"belt\"] = \"blue\"` will add a new key-value pair.\n**Updating:** If the key *already* exists, `user[\"xp\"] = 600` will update the value.\n**Deleting:** `del user[\"xp\"]` will remove the key and its value.",
    questions: [
      {
        type: "mcq",
        prompt: "If `user = {\"name\": \"Sam\"}`, what is `user[\"name\"]`?",
        options: ["Sam", "name", "user", "An error"],
        answer: "Sam"
      },
      {
        type: "mcq",
        prompt: "How would you add a new key `age` with a value of `20` to the `user` dictionary?",
        options: [
          "user.append(20)",
          "user[\"age\"] = 20",
          "user[20] = \"age\"",
          "add(user, \"age\", 20)"
        ],
        answer: "user[\"age\"] = 20"
      },
      {
        type: "mcq",
        prompt: "What happens if you assign a value to a key that already exists?",
        options: [
          "It creates a second key",
          "It causes an error",
          "It updates the value for that key",
          "It deletes the key"
        ],
        answer: "It updates the value for that key"
      },
      {
        type: "fill-in-blank",
        prompt: "What keyword do you use to *delete* a key-value pair from a dictionary?",
        answer: "del"
      }
    ]
  },
  {
    title: "Tuples: Immutable Lists",
    lessonNum: 23,
    belt: "blue",
    content: "A 'Tuple' is almost identical to a list, but with two big differences:\n1. You create them with parentheses `()`.\n2. They are 'immutable', which means they **cannot be changed** after they are created.\nYou can't `.append()` or `.pop()` or change an item. Tuples are useful for data that should never change, like coordinates `(10, 20)` or RGB colors `(255, 0, 0)`.",
    questions: [
      {
        type: "mcq",
        prompt: "What syntax is used to create a tuple?",
        options: ["[]", "()", "{}", "<>"],
        answer: "()"
      },
      {
        type: "mcq",
        prompt: "What does 'immutable' mean?",
        options: [
          "It can be changed",
          "It cannot be changed",
          "It is a type of loop",
          "It holds many items"
        ],
        answer: "It cannot be changed"
      },
      {
        type: "mcq",
        prompt: "What is the main difference between a tuple and a list?",
        options: [
          "Tuples can only hold numbers",
          "Lists are immutable",
          "Tuples are immutable",
          "There is no difference"
        ],
        answer: "Tuples are immutable"
      },
      {
        type: "mcq",
        prompt: "Will this code cause an error?\n`my_tuple = (1, 2, 3)`\n`my_tuple[0] = 5`",
        options: ["Yes", "No"],
        answer: "Yes"
      }
    ]
  },
  // --- BLACK BELT LESSONS ---
  {
    title: "Defining Functions",
    lessonNum: 24,
    belt: "black",
    content: "Up to now, our code runs from top to bottom. A 'function' is a block of reusable code that you can 'call' (run) whenever you need it. This helps you organize your code and avoid repeating yourself. You define a function with the `def` keyword, followed by a name, parentheses `()`, and a colon. The code inside must be indented. To call/run a function you do the following `function_name()`",
    questions: [
      {
        type: "fill-in-blank",
        prompt: "What keyword do you use to define a function?",
        answer: "def"
      },
      {
        type: "mcq",
        prompt: "What is the main benefit of using a function?",
        options: [
          "It makes your code run faster",
          "It's the only way to use a loop",
          "It lets you write reusable code",
          "It stores data like a variable"
        ],
        answer: "It lets you write reusable code"
      },
      {
        type: "fill-in-blank",
        prompt: "The code inside a function must be ____.",
        answer: "indented"
      },
      {
        type: "mcq",
        prompt: "Which of the following is a valid, empty function?",
        options: [
          "define my_function:",
          "def my_function():\n\tpass",
          "def my_function()",
          "function my_function():"
        ],
        answer: "def my_function():\n\tpass"
      }
    ]
  },
  {
    title: "Function Arguments",
    lessonNum: 25,
    belt: "black",
    content: "Functions are even more useful when you can pass data *into* them. The variables inside the parentheses `()` are called 'parameters'. When you call the function, the data you pass in is called an 'argument'. This lets you write one function that can do a similar job on different data. To give data to a function such as the integer 1 clairfy when you run the function so instead of `function_name()`, you do `function_name(1)`.",
    questions: [
      {
        type: "mcq",
        prompt: "A variable inside a function's definition `()` is called a...",
        options: ["Argument", "Parameter", "Return value", "Local variable"],
        answer: "Parameter"
      },
      {
        type: "mcq",
        prompt: "The data you pass *in* when you call a function is called an...",
        options: ["Argument", "Parameter", "Return value", "Local variable"],
        answer: "Argument"
      },
      {
        type: "mcq",
        prompt: "What will this code output?\n`def greet(name):`\n`\tprint(\"Hello \" + name)`\n\n`greet(\"Sensei\")`",
        options: [
          "Hello Sensei",
          "Hello name",
          "An error",
          "Hello + name"
        ],
        answer: "Hello Sensei"
      },
      {
        type: "mcq",
        prompt: "How do you define a function that takes two parameters, `a` and `b`?",
        options: [
          "def my_func(a, b):",
          "def my_func(): a, b",
          "def my_func(a b):",
          "def my_func(a + b):"
        ],
        answer: "def my_func(a, b):"
      }
    ]
  },
  {
    title: "Return Values",
    lessonNum: 26,
    belt: "black",
    content: "Functions can also send data *back* to your main code. You do this with the `return` keyword. When Python hits a `return` line, it stops executing the function and sends the value back. You can store this returned value in a variable to use later. For example if we want to return the boolean value True in a function we would add `return True` to the inside of the function.",
    questions: [
      {
        type: "fill-in-blank",
        prompt: "What keyword sends a value *out* of a function?",
        answer: "return"
      },
      {
        type: "mcq",
        prompt: "What happens when the `return` keyword is run?",
        options: [
          "The function prints the value",
          "The function stops and sends the value of the variable run back",
          "The function restarts",
          "It causes an error"
        ],
        answer: "The function stops and sends the value of the variable run back"
      },
      {
        type: "mcq",
        prompt: "What will the variable `x` be?\n`def add_five(num):`\n`\treturn num + 5`\n\n`x = add_five(10)`",
        options: ["10", "5", "15", "An error"],
        answer: "15"
      },
      {
        type: "mcq",
        prompt: "What will this code print?\n`def get_greeting(name):`\n`\treturn \"Hi, \" + name`\n`\tprint(\"Done\")`\n\n`print(get_greeting(\"Alex\"))`",
        options: ["Hi, Alex", "Hi, Alex\nDone", "Done", "An error"],
        answer: "Hi, Alex"
      }
    ]
  },
  {
    title: "Variable Scope",
    lessonNum: 27,
    belt: "black",
    content: "This is a very important concept. Variables have a 'scope', which means they only exist in certain parts of your code.\n**Local Scope:** A variable created *inside* a function is 'local'. It only exists inside that function and is destroyed when the function ends.\n**Global Scope:** A variable created *outside* any function is 'global'. It can be read from anywhere, including inside functions.",
    questions: [
      {
        type: "mcq",
        prompt: "A variable created *inside* a function is called...",
        options: ["Global", "Local", "Permanent", "temporary"],
        answer: "Local"
      },
      {
        type: "mcq",
        prompt: "A variable created *outside* all functions is called...",
        options: ["Global", "Local", "External", "Child"],
        answer: "Global"
      },
      {
        type: "mcq",
        prompt: "Will this code cause an error?\n`def my_func():`\n`\tmy_var = 10`\n\n`my_func()`\n`print(my_var)`",
        options: [
          "No, it prints 10",
          "Yes, because `my_var` is local to the function",
          "No, it prints nothing",
          "Yes, because you can't print a variable"
        ],
        answer: "Yes, because `my_var` is local to the function"
      },
      {
        type: "mcq",
        prompt: "What will this code output?\n`my_var = 10`\n`def my_func():`\n`\tprint(my_var)`\n\n`my_func()`",
        options: ["10", "An error", "Nothing", "my_var"],
        answer: "10"
      }
    ]
  },
  {
    title: "What is OOP?",
    lessonNum: 28,
    belt: "black",
    content: "OOP stands for 'Object-Oriented Programming'. It's a way to structure your code by modeling real-world 'things'. We use a **Class** as a blueprint (e.g., a blueprint for a `Car`). We use an **Object** (or 'instance') as the actual *thing* created from the blueprint (e.g., your specific `Car`). OOP helps organize complex programs by bundling data (properties) and functions (methods) together. OOP can be thought of as the ability to creat our own types of variables other than the built in types like strings and integers.",
    questions: [
      {
        type: "mcq",
        prompt: "In OOP, what is a 'Class'?",
        options: [
          "The actual piece of data",
          "A blueprint for creating objects",
          "A type of function",
          "A global variable"
        ],
        answer: "A blueprint for creating objects"
      },
      {
        type: "mcq",
        prompt: "In OOP, what is an 'Object'?",
        options: [
          "An instance, or a real thing, built from a class",
          "The `def` keyword",
          "A file of code",
          "A comment in your code"
        ],
        answer: "An instance, or a real thing, built from a class"
      },
      {
        type: "fill-in-blank",
        prompt: "If `Dog` is a Class, then a specific dog named `Fido` would be an ____.",
        answer: "object"
      },
      {
        type: "mcq",
        prompt: "What is the main goal of OOP?",
        options: [
          "To make code run as fast as possible",
          "To bundle data and its related functions together",
          "To make sure all variables are global",
          "To replace the `if` statement"
        ],
        answer: "To bundle data and its related functions together"
      }
    ]
  },
  {
    title: "Creating a Class",
    lessonNum: 29,
    belt: "black",
    content: "You create a class with the `class` keyword. Inside the class, we define a special method called `__init__` (two underscores on each side). This is the 'constructor' - it runs *automatically* every time you create a new object. The `self` keyword is the first parameter of every class method and refers to the object instance itself. We use it to store data on the object.",
    questions: [
      {
        type: "fill-in-blank",
        prompt: "What keyword do you use to define a new class?",
        answer: "class"
      },
      {
        type: "fill-in-blank",
        prompt: "What is the name of the special 'constructor' method?",
        answer: "__init__"
      },
      {
        type: "mcq",
        prompt: "What is the *first* parameter required by every method in a class?",
        options: ["it", "obj", "self", "class"],
        answer: "self"
      },
      {
        type: "mcq",
        prompt: "What does the `self` keyword represent?",
        options: [
          "The class blueprint",
          "The global scope",
          "A copy of the data",
          "The specific object instance"
        ],
        answer: "The specific object instance"
      }
    ]
  },
  {
    title: "Class Methods",
    lessonNum: 30,
    belt: "black",
    content: "Functions defined *inside* a class are called 'methods'. These are the 'actions' the object can perform. They must always take `self` as the first argument, which gives them access to the object's own data (like `self.name`). You call a method using the `object.method()` syntax.",
    questions: [
      {
        type: "mcq",
        prompt: "A function defined inside a class is called a...",
        options: ["Function", "Class", "Method", "Return value"],
        answer: "Method"
      },
      {
        type: "mcq",
        prompt: "How does a method access its own object's data?",
        options: [
          "Using `self.variable_name`",
          "Using `global.variable_name`",
          "Using `object.variable_name`",
          "It cannot access its own data"
        ],
        answer: "Using `self.variable_name`"
      },
      {
        type: "mcq",
        prompt: "What will this code print?\n`class Dog:`\n`\tdef __init__(self, name):`\n`\t\tself.name = name`\n`\tdef bark(self):`\n`\t\tprint(self.name + \" says woof!\")`\n\n`my_dog = Dog(\"Fido\")`\n`my_dog.bark()`",
        options: ["woof!", "Fido says woof!", "name says woof!", "An error"],
        answer: "Fido says woof!"
      },
      {
        type: "mcq",
        prompt: "If `my_car` is an object, how do you call its `drive` method?",
        options: [
          "drive(my_car)",
          "my_car.drive()",
          "my_car.drive",
          "Car.drive(my_car)"
        ],
        answer: "my_car.drive()"
      }
    ]
  }
];

// --- 3. THE SEEDING FUNCTION ---
async function seedDatabase() {
  console.log('Starting to seed lessons...');
  const lessonsCollection = db.collection('lessons');

  for (const lesson of LESSONS_TO_ADD) {
    
    // 1. Create the custom Document ID
    // including the lesson number and what belt it belongs to (e.g. "white-lesson-1", "blue-lesson-15", etc.)
    const docId = `lesson-${lesson.lessonNum}-${lesson.belt}`;

    // 3. Create a reference to that specific document
    const docRef = lessonsCollection.doc(docId);
    
    // 4. Check if a document with that *exact ID* already exists
    const snapshot = await docRef.get();
    
    if (!snapshot.exists) {
      // 5. If it does NOT exist, create it using .set()
      // .set() creates the document with your custom ID
      console.log(`...Adding new lesson: ${docId} (${lesson.title})`);
      await docRef.set(lesson);
    } else {
      // 6. If it already exists, skip it
      console.log(`...Lesson "${docId}" already exists. Skipping.`);
    }
  }

  console.log('Lesson seeding complete!');
  process.exit(0); // This quits the script
}

// --- 4. RUN THE SCRIPT ---
seedDatabase().catch((error) => {
  console.error('Error seeding database:', error);
  process.exit(1); // This quits the script with an error
});