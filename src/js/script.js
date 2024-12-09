const questions = [
    {
        question: "What is the largest fish in the ocean?",
        answers: [
            { text: "Tiger Shark", correct: "false"},
            { text: "Basking Shark", correct: "false"},
            { text: "Whale Shark", correct: "true"},
            { text: "Great White Shark", correct: "false"},
        ]
    },
    {
        question: "What is the largest ocean on Earth?",
        answers: [
            { text: "Atlantic Ocean", correct: "false"},
            { text: "Indian Ocean", correct: "false"},
            { text: "Southern Ocean", correct: "false"},
            { text: "Pacific Ocean", correct: "true"},
        ]
    },
    {
        question: "Which of the following is the deepest part of the ocean?",
        answers: [
            { text: "Mariana Trench", correct: "true"},
            { text: "Puerto Rico Trench", correct: "false"},
            { text: "Java Trench", correct: "false"},
            { text: "Tonga Trench", correct: "false"},
        ]
    },
    {
        question: "What percentage of the Earths surface is covered by the ocean?",
        answers: [
            { text: "50%", correct: "false"},
            { text: "60%", correct: "false"},
            { text: "70%", correct: "true"},
            { text: "80%", correct: "false"},
        ]
    },
    {
        question: "Which of these islands are located in the Pacific Ocean?",
        answers: [
            { text: "Maldives", correct: "false"},
            { text: "Galàlapagos Islands", correct: "true"},
            { text: "Seychelles", correct: "false"},
            { text: "Bermuda", correct: "false"},
        ]
    },
    {
        question: "What is the Great Barrier Reef primarily made of?",
        answers: [
            { text: "Algae", correct: "false"},
            { text: "Seaweed", correct: "false"},
            { text: "Sand", correct: "false"},
            { text: "Coral", correct: "true"},
        ]
    },
    {
        question: "Which ocean is the warmest?",
        answers: [
            { text: "Indian Ocean", correct: "true"},
            { text: "Arctic Ocean", correct: "false"},
            { text: "Pacific Ocean", correct: "false"},
            { text: "Atlantic Ocean", correct: "false"},
        ]
    },
    {
        question: "Which one of these creatures is a cephalopod?",
        answers: [
            { text: "Sea Turtle", correct: "false"},
            { text: "Seahorse", correct: "false"},
            { text: "Octopus", correct: "true"},
            { text: "Jellyfish", correct: "false"},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer__buttons");
const nextButton = document.getElementById("next__btn");
const progressText = document.getElementById("progress__text");


let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.
    question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });

    updateProgressBar();
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function updateProgressBar() {
    const totalQuestions = questions.length;
    const currentQuestion = currentQuestionIndex + 1;

    progressText.innerHTML = `Question ${currentQuestion} of ${totalQuestions}`;
}


function showScore(){
    resetState();
    questionElement.innerHTML = `You Scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
};

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();
