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
          "To be read by other humans",
          "To store data"
        ],
        answer: "To be read by other humans"
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
        prompt: "What is the output of `print(20 / 4)`?",
        answer: "5.0"
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
    content: "To make your programs interactive, you need to get to get input from the user. You do this with the `input()` function. It pauses the program, waits for the user to type something, and then returns whatever they typed *as a string*.",
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
    content: "Because `input()` always gives you a string, you'll need to convert it if you want to do math. This is called 'type casting'. You can use `int()` to convert to an integer, `float()` to a float, and `str()` to a string.",
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
        prompt: "If you have `age_string = \"25\"`, how do you convert it to a number and store it in `age_num`?",
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
        prompt: "What is the output of `print(\"Your age is \" + 10)`?",
        options: ["Your age is 10", "10", "\"Your age is 10\"", "An error"],
        answer: "An error"
      },
      {
        type: "fill-in-blank",
        prompt: "To fix the error in the previous question, you would write `print(\"Your age is \" + ____(10))`",
        answer: "str"
      }
    ]
  },
  {
    title: "String Basics",
    lessonNum: 8,
    belt: "white",
    content: "You can join strings using the `+` operator, which is called 'concatenation'. A more modern and readable way is to use 'f-strings'. An f-string starts with an `f` before the quotes and lets you embed variables directly inside curly braces `{}`.",
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
  }
];

// --- 3. THE SEEDING FUNCTION ---
async function seedDatabase() {
  console.log('Starting to seed lessons...');
  const lessonsCollection = db.collection('lessons');

  for (const lesson of LESSONS_TO_ADD) {
    console.log(`Checking lesson: ${lesson.title}`);
    
    // Check if a lesson with this title already exists to avoid duplicates
    const snapshot = await lessonsCollection.where('title', '==', lesson.title).get();
    
    if (snapshot.empty) {
      console.log(`...Adding new lesson: ${lesson.title}`);
      await lessonsCollection.add(lesson);
    } else {
      console.log(`...Lesson "${lesson.title}" already exists. Skipping.`);
    }
  }

  console.log('Lesson seeding complete! 🎉');
  process.exit(0); // This quits the script
}

// --- 4. RUN THE SCRIPT ---
seedDatabase().catch((error) => {
  console.error('Error seeding database:', error);
  process.exit(1); // This quits the script with an error
});