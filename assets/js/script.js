var startbutton = document.getElementById("start-button");
var timer = document.getElementById('timer')
var questionContainer = document.getElementById("question-container")
var questionText = document.getElementById("question-text")

var startContainer = document.getElementById("start-container");
var answers = document.getElementById("answers");
var feedbackEl = document.getElementById("feedback");

var endSection = document.getElementById("end");
var endTitle = document.getElementById("end-title");
var SCORE = document.getElementById("score");
var INITIALS_INPUT = document.getElementById("initials");
var SUBMIT_SCORE = document.getElementById("submit-score");
var ERROR_MESSAGE = document.getElementById("error-message");


var timeLeft = 0
var quizTime = 0
var score = 0

var count = 90;
var countDownTimer;
var currentQuestionIndex = 0;
var myQuestions = [{
        question: "Inside which HTML element do we put the JavaScript?",
        answers: ['<javascript>', '<js>', '<scripting>', '<script>'],
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
        question: "What is an array?",
        answers: ['Another word for a declared variable.', 'A variable with a high-level, list-like object(s)', 'A variable that will never change.', 'The sea creature that killed Steve Irwin.'],
        correctAnswer: "A variable with a high-level, list-like object(s)"
    }
];
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







function startquiz() {
    startContainer.style.display = "none";
    startTimer();
    questionContainer.style.display = "inline";
    loadNextQuestion();
}

function loadNextQuestion() {
    var questionObject = myQuestions[currentQuestionIndex]
    console.log(questionObject);


    var titleEl = document.getElementById("question-title");
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

                //play wrong sound

                feedbackEl.textContent = "Wrong answer!";
            } else {
                // play right sound

                feedbackEl.textContent = "Right answer!";
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


    /******** ENDING THE GAME ********/
    function quizEnd() {

        if (questionText < questionText.length)
            showQuestion();
        else
            showSCORE();
        clearInterval(timer);

        showElement(endSection);
        displayScore();
        setEndHeading();
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

    /******** SUBMITTING INITIALS ********/
    function processInput(event) {
        event.preventDefault();

        var initials = INITIALS_INPUT.value.toUpperCase();

        if (isInputValid(initials)) {
            var score = count;
            var highscoreEntry = getNewHighscoreEntry(initials, score);
            saveHighscoreEntry(highscoreEntry);
            window.location.href = "./highscore.html";
        }
    }

    function getNewHighscoreEntry(initials, score) {
        var entry = {
            initials: initials,
            score: score,
        }
        return entry;
    }

    function isInputValid(initials) {
        let errorMessage = "";
        if (initials === "") {
            errorMessage = "You can't submit empty initials!";
            displayFormError(errorMessage);
            return false;
        } else if (initials.match(/[^a-z]/ig)) {
            errorMessage = "Initials may only include letters."
            displayFormError(errorMessage);
            return false;
        } else {
            return true;
        }
    }

    function displayFormError(errorMessage) {
        ERROR_MESSAGE.textContent = errorMessage;
        if (!INITIALS_INPUT.classList.contains("error")) {
            INITIALS_INPUT.classList.add("error");
        }
    }

    function saveHighscoreEntry(highscoreEntry) {
        var currentScores = getScoreList();
        placeEntryInHighscoreList(highscoreEntry, currentScores);
        localStorage.setItem('scoreList', JSON.stringify(currentScores));
    }

    function getScoreList() {
        const currentScores = localStorage.getItem('scoreList');
        if (currentScores) {
            return JSON.parse(currentScores);
        } else {
            return [];
        }
    }

    function placeEntryInHighscoreList(newEntry, scoreList) {
        const newScoreIndex = getNewScoreIndex(newEntry, scoreList);
        scoreList.splice(newScoreIndex, 0, newEntry);
    }

    function getNewScoreIndex(newEntry, scoreList) {
        if (scoreList.length > 0) {
            for (let i = 0; i < scoreList.length; i++) {
                if (scoreList[i].score <= newEntry.score) {
                    return i;
                }
            }
        }
        return scoreList.length;
    }
}
startbutton.addEventListener("click", startquiz);