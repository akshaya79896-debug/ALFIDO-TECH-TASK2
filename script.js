const startButton = document.getElementById("start-btn");
const questionNumberElement = document.getElementById("question-number");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const resultElement = document.getElementById("result");

const questions = [
    {
        question: "What does HTML stand for?",
        answers: [
            { text: "Hyper Text Markup Language", correct: true },
            { text: "Hyper Tool Markup Language", correct: false },
            { text: "Hyper Text Machine Language", correct: false },
            { text: "Hyperlinks Text Markup Language", correct: false }
        ]
    },
    {
        question: "Which language is used to add interactivity to websites?",
        answers: [
            { text: "C++", correct: false },
            { text: "JavaScript", correct: true },
            { text: "SQL", correct: false },
            { text: "Bootstrap", correct: false }
        ]
    },
    {
        question: "Which JavaScript method is used to select an element by ID?",
        answers: [
            { text: "document.query()", correct: false },
            { text: "document.getElementById()", correct: true },
            { text: "document.getElements()", correct: false },
            { text: "document.select()", correct: false }
        ]
    },
    {
        question: "Which Bootstrap class creates a button?",
        answers: [
            { text: "button", correct: false },
            { text: "btn", correct: true },
            { text: "btn-group", correct: false },
            { text: "button-primary", correct: false }
        ]
    },
    {
        question: "Which symbol is used for comments in JavaScript?",
        answers: [
            { text: "<!-- -->", correct: false },
            { text: "//", correct: true },
            { text: "##", correct: false },
            { text: "/* */ only", correct: false }
        ]
    }
];

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;

    resultElement.classList.add("hidden");
    resultElement.textContent = "";

    questionNumberElement.classList.remove("hidden");
    questionElement.classList.remove("hidden");

    nextButton.textContent = "Next Question";

    showQuestion();
}

function showQuestion() {
    resetState();

    const currentQuestion = questions[currentQuestionIndex];

    questionNumberElement.textContent =
        (currentQuestionIndex + 1) + "/" + questions.length;

    questionElement.textContent = currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer.text;

        if (answer.correct) {
            button.dataset.correct = "true";
        }

        button.classList.add("btn");
        button.addEventListener("click", selectAnswer);

        answerButtons.appendChild(button);
    });
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === "true";

    if (isCorrect) {
        selectedButton.classList.add("correct");
        score++;
    } else {
        selectedButton.classList.add("wrong");
    }

    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }

        button.disabled = true;
    });

    nextButton.style.display = "inline-block";
}

function resetState() {
    nextButton.style.display = "none";

    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function showScore() {
    resetState();

    questionNumberElement.classList.add("hidden");

    questionElement.textContent =
        "You scored " + score + " out of " + questions.length + "!";

    resultElement.classList.remove("hidden");
    resultElement.textContent = "🎉 Quiz Completed!";

    nextButton.textContent = "Restart Quiz";
    nextButton.style.display = "inline-block";

    //startButton.style.display = "inline-block";
}

function handleNextButton() {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
        startButton.style.display = "none";
    }
});

startButton.addEventListener("click", () => {
    startButton.style.display = "none";
    startQuiz();
});