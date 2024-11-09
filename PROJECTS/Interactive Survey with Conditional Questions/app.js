const surveyQuestions = [
  {
    question: "Do you like outdoor activities?",
    type: "radio", // Multiple choice (Yes / No)
    options: ["Yes", "No"],
    nextQuestion: {
      Yes: 1, // If Yes, go to question 2
      No: 2, // If No, go to question 3
    },
  },
  {
    question: "Which outdoor activities do you enjoy?",
    type: "checkbox", // Multiple options (Hiking, Biking, Swimming, Camping)
    options: ["Hiking", "Biking", "Swimming", "Camping"],
    showIf: { previousQuestion: 0, answer: "Yes" }, // Show if question 1 was answered Yes
  },
  {
    question: "How many days a week do you exercise?",
    type: "text", // Text input (number input)
    options: [],
    showIf: { previousQuestion: 0 }, // Show after question 1, regardless of answer
  },
  {
    question: "Do you follow any specific diet?",
    type: "radio", // Multiple choice (Vegetarian, Vegan, Keto, None)
    options: ["Vegetarian", "Vegan", "Keto", "None"],
    nextQuestion: {
      Vegetarian: 4, // If Vegetarian, go to question 5
      Vegan: 4, // If Vegan, go to question 5
      Keto: 4, // If Keto, go to question 5
      None: 5, // If None, go to question 6
    },
  },
  {
    question: "Why did you choose this diet?",
    type: "text", // Text input
    options: [],
    showIf: { previousQuestion: 3, answer: ["Vegetarian", "Vegan", "Keto"] }, // Show if question 4 was answered with a specific diet
  },
  {
    question: "Do you have pets?",
    type: "radio", // Multiple choice (Yes / No)
    options: ["Yes", "No"],
    nextQuestion: {
      Yes: 6, // If Yes, go to question 7
      No: 7, // If No, go to question 8
    },
  },
  {
    question: "What type of pet do you have?",
    type: "text", // Text input
    options: [],
    showIf: { previousQuestion: 5, answer: "Yes" }, // Show if question 5 was answered Yes
  },
  {
    question: "How satisfied are you with your current work-life balance?",
    type: "rating", // Rating scale (1-5)
    options: [1, 2, 3, 4, 5],
    showIf: { previousQuestion: 5 }, // Show after question 5, regardless of answer
  },
  {
    question: "Are you interested in learning new skills or hobbies?",
    type: "radio", // Multiple choice (Yes / No)
    options: ["Yes", "No"],
    nextQuestion: {
      Yes: 8, // If Yes, go to question 9
      No: 9, // If No, go to question 10
    },
  },
  {
    question: "What new skills or hobbies are you interested in?",
    type: "text", // Text input
    options: [],
    showIf: { previousQuestion: 8, answer: "Yes" }, // Show if question 8 was answered Yes
  },
];

const ul = document.querySelector("ul");

console.log(ul);
function survey() {}

function render() {
  for (let i = 0; i < surveyQuestions.length; i++) {
    ul.innerHTML += `<li>${surveyQuestions[i].question}</li> <br>
    <input type = "${surveyQuestions[i].type}">`;

  }
}
render();
//   Buttons.Conditions
