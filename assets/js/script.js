var startbutton = document.getElementById("start-button")
var timer = document.getElementById('timer')
var questionContainer = document.getElementById("question-container")

// var questionText = document.getElementById("question-text")

var titleEl = document.getElementById("question-title");
var startContainer = document.getElementById("start-container");
var answers = document.getElementById("answers");
var feedbackEl = document.getElementById("feedback");

var endSection = document.getElementById("end");
var endTitle = document.getElementById("end-title");
var SCORE = document.getElementById("score");
var INITIALS_INPUT = document.getElementById("input-initials");
var SUBMIT_SCORE = document.getElementById("submit-score");
var ERROR_MESSAGE = document.getElementById("error-message");

var submitButton = document.getElementById("submit-btn");
var scoreList = document.getElementById("score-list")

var timeLeft = 0
var quizTime = 0
var score = 0

var count = 90;
var countDownTimer;
var currentQuestionIndex = 0;
var myQuestions = [{
        question: "Inside which HTML element do we put the JavaScript?",
        answers: ['<style.js>', '<jss.md>', '<scripting>', '<script>'],
        correctAnswer: '<script>'
    },
    {
        question: "Choose the correct HTML element for the largest heading:",
        answers: ['<head>', '<h1>', '<h6>', '<heading>'],
        correctAnswer: '<h1>'
    }, {
        question: "What is the correct HTML element for inserting a line break?",
        answers: ['<break>', '<br>', '<br/>', '<lb>'],
        correctAnswer: '<br>'

    }, {
        question: "The condition in an if / else statement is enclosed within ____.",
        answers: ['quotes', 'curly brackets', 'paranthesis', 'square brackets'],
        correctAnswer: 'paranthesis'
    }, {
        question: "Commonly used data types DO NOT include:",
        answers: ["strings", "booleans", "alerts", "numbers"],
        correctAnswer: "alerts"
    }, {
        question: "Arrays in Javascript can be used to store",
        answers: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        correctAnswer: "all of the above"
    }, {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:?",
        answers: ['JavaScript.', 'Terminal/Bash', 'For Loops.', 'console.log.'],
        correctAnswer: "For Loops."
    }
];

/******** ENDING THE GAME ********/
function quizEnd() {

    if (titleEl === titleEl.length)
        showQuestion();
    else
        showSCORE();
    clearInterval(timer);
    startContainer(endSection);
    displayScore();
    setEndHeading();
}

function startContainer(siblingList, startContainer) {
    for (element of siblingList) {
        hideElement(element);
    }
    startContainer.classList.remove("hidden");
}

function displayScore() {
    SCORE.textContent = count;
}

function setEndHeading() {
    if (totalTime === 0) {
        endTitle.textContent = "Sorry! time out!";
    } else {
        endTitle.textContent = "Congrats! Your done!";
    }
}
//when click start button the timer starts

function startTimer() {

    countDownTimer = setInterval(function() {
        timer.innerHTML = count;
        count--;
        if (count <= 0) {
            count = 0;
            quizEnd();
            timer.innerHTML = 'Done';
            // or...
            alert("You're out of time!");
        }
    }, 1000);


}

//when the quiz starts 
function startquiz() {
    startContainer.style.display = "none";
    startTimer();
    questionContainer.style.display = "inline";
    loadNextQuestion();
}

function loadNextQuestion() {
    console.log("currentQuestionIndex =", currentQuestionIndex);
    var questionObject = myQuestions[currentQuestionIndex]
    console.log(questionObject);



    // updating question from html page
    titleEl.textContent = questionObject.question;

    answers.textContent = "";

    questionObject.answers.forEach(function(answer, index) {
        console.log(answer);
        var answerEl = document.createElement("button");
        answerEl.setAttribute("class", "choice");
        answerEl.setAttribute("value", answer);

        answerEl.textContent = index + 1 + ". " + answer;

        answerEl.onclick = function() {
            if (this.value !== myQuestions[currentQuestionIndex].correctAnswer) {
                count = count - 15;

                if (count < 0) {
                    count = 0;
                }
                timer.textContent = count;

                feedbackEl.textContent = "Wrong answer!";

            } else {
                feedbackEl.textContent = "Right answer!";
                score++
            }

            feedbackEl.setAttribute("class", "feedback");
            setTimeout(function() {
                feedbackEl.setAttribute("class", "feedback hide");
            }, 2000);

            currentQuestionIndex++;
            if (currentQuestionIndex === myQuestions.length) {
                quizEnd();
            } else {
                loadNextQuestion();
            }
        }
        answers.appendChild(answerEl);
    });


    //    Quiz End 
    function quizEnd() {

        if (titleEl === titleEl.length)
            showQuestion();
        else

            questionContainer.style.display = "none";

        endSection.classList.remove("hidden");
        clearInterval(countDownTimer);

        displayScore();
        setEndHeading();
    }



    function displayScore() {
        SCORE.textContent = count;
    }

    function setEndHeading() {
        if (count === 0) {
            endTitle.textContent = "Sorry! time out!";
        } else {
            endTitle.textContent = "Congrats! Your done!";
        }
    }

    // Create an input element for initials 
    submitButton.onclick = function() {
        SCORE.textContent = count;
        localStorage.setItem('displayScore', 'initials')
    }




    //add intials to local storage

}

startbutton.addEventListener("click", startquiz);