const questions = [
    {
        question: "What is the primary purpose of a proxy firewall in a network?",
        answers: [
            { text: "To directly store and retrieve data from a database without requiring user authentication.", correct: false},
            { text: "To optimize application performance by reducing CPU usage on servers.", correct: false},
            { text: "To act as an intermediary between external users and internal resources, filtering traffic and enforcing security policies.", correct: true},
            { text: "To monitor and log user activity without blocking any suspicious traffic.", correct: false},
        ]
    },
    {
        question: "What happens when the command chmod 600 ~/.ssh/id_rsa is executed?",
        answers: [
            { text: "It makes the file publicly accessible by all users.", correct: false},
            { text: "It gives read and write permissions to the file's owner, restricting others.", correct: true},
            { text: "It removes all permissions for the owner of the file.", correct: false},
            { text: "It changes the file into an executable program.", correct: false},
        ]
    },
    {
        question: "Which of the following is NOT a characteristic of RESTful APIs?",
        answers: [
            { text: "Requirement for server-side session management.", correct: true},
            { text: "Statelessness.", correct: false},
            { text: "Resource identification through URLs.", correct: false},
            { text: "Uniform interface.", correct: false},
        ]
    },
    {
        question: "What is the main purpose of the strace tool in Linux?",
        answers: [
            { text: "To trace system calls and signals made by a process. ", correct: true},
            { text: "To monitor CPU usage and memory allocation.", correct: false},
            { text: "To compile and build software applications.", correct: false},
            { text: "To encrypt files and directories for secure storage.", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

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

function showScore(){
    resetState();
    questionElement.innerHTML = "You scored ${score} out of ${questions.length}!";
    nextButton.innerHTML = "Try Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}


nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});


startQuiz();
