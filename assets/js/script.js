var startbutton = document.getElementById("start-button");
var timer = document.getElementById('timer')
var questionContainer = document.getElementById("question-container")
var questionText = document.getElementById("question-text")
var answerA = document.getElementById("a")
var answerB = document.getElementById("b")
var answerC = document.getElementById("c")
var answerD = document.getElementById("d")
var startContainer = document.getElementById("start-container");
var answers = document.getElementById("answers");
var feedbackEl = document.getElementById("feedback");

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
        answers: {
            a: '<head>',
            b: '<h1>',
            c: '<h6>',
            d: '<heading>'
        },
        correctAnswer: 'b'
    }, {
        question: "What is the correct HTML element for inserting a line break?",
        answers: {
            a: '<break>',
            b: '<br>',
            c: '<br/>',
            d: '<lb>'
        },
        correctAnswer: 'b'

    }, {
        question: "The condition in an if / else statement is enclosed within ____.",
        answers: {
            a: 'quotes',
            b: 'curly brackets',
            c: 'paranthesis',
            d: 'square brackets'
        },
        correctAnswer: 'c'
    }
];

function startTimer() {

    countDownTimer = setInterval(function() {
        timer.innerHTML = count;
        count--;
        if (count === 0) {
            stopTimer();
            timer.innerHTML = 'Done';
            // or...
            alert("You're out of time!");
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(countDownTimer);
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
    // questionText.textContent = questionObject.question
    // answerA.textContent = questionObject.answers.a
    // answerB.textContent = questionObject.answers.b
    // answerC.textContent = questionObject.answers.c
    // answerD.textContent = questionObject.answers.d

    var titleEl = document.getElementById("question-title");
    titleEl.textContent = questionObject.question;

    answers.textContent = "";

    questionObject.answers.forEach(function(answer, index) {
        var answerEl = document.createElement("button");
        answerEl.setAttribute("class", "choice");
        answerEl.setAttribute("value", answer);

        answerEl.textContent = (index + 1) + ". " + answer;

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
    });

}

startbutton.addEventListener("click", startquiz);