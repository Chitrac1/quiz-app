const questions=[
    {
        question:"Which is the national bird of india?",
        answers:[
            {text: "ostrich", correct: false},
            {text: "Indian Peafowl", correct: false},
            {text: "Peacock", correct: true},
            {text: "eagle", correct: false}
        ]
    },
    {
        question:"What is the capital of india?",
        answers:[
            {text: "Punjab", correct: false},
            {text: "New Delhi", correct: true},
            {text: "Haryana", correct: false},
            {text: "Kerala", correct: false}
        ]
    },
    {
        question:"What is the largest state in India by area? ",
        answers:[
            {text: "Punjab", correct: false},
            {text: "Rajasthan", correct: true},
            {text: "Haryana", correct: false},
            {text: "Kerala", correct: false}
        ]
    },
    {
        question:"What is the national animal of India? ",
        answers:[
            {text: "Lion", correct: false},
            {text: "Elephant", correct: false},
            {text: "Cheetah", correct: false},
            {text: "Royal Benagl Tiger", correct: true}
        ]
    },
    {
        question:"How many days are there in a week?",
        answers:[
            {text: "2 days", correct: false},
            {text: "7 days", correct: true},
            {text: "4 days", correct: false},
            {text: "6 days", correct: false}
        ]
    }

];

const questionElement= document.getElementById("question");
const answerButton= document.getElementById("answer-button");
const previousButton=document.getElementById("previous-btn");
const nextButton=document.getElementById("next-btn");

let currentQuestionIndex= 0;
let score= 0;

function startQuiz(){
    currentQuestionIndex= 0;
    score= 0;
    nextButton.innerHTML="next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion= questions[currentQuestionIndex];
    let questionNo= currentQuestionIndex +1;
    questionElement.innerHTML= questionNo + "." +currentQuestion.question;

    currentQuestion.answers.forEach(answer =>{
        const button= document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click",selectAnswer)
    });
}

function resetState(){
    nextButton.style.display="none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
}
}

function selectAnswer(e){
    const selectedbtn= e.target;
    const isCorrect= selectedbtn.dataset.correct==="true";
    if(isCorrect){
        selectedbtn.classList.add("correct");
        score++;
    }
    else{
        selectedbtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct==="true"){
            button.classList.add("correct");
        }
        button.disabled="true";
    });
    nextButton.style.display="block";
}

function showScore(){
    resetState();
    questionElement.innerHTML= `you scored ${score} out of ${questions.length}!`
    nextButton.innerHTML="Play Again";
    nextButton.style.display="block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length)
    {
        showQuestion();
    }
    else{
        showScore();
    }
}

nextButton.addEventListener("click" ,()=> {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();