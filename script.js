//Array of questions, choices, and correct answers
var questions = [
    {
        title: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
    {
        title: "The condition in an if / else statement is enclosed within ___",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses"
    },
    {
        title: "Arrays in JavaScript can be used to store ___",
        choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: "all of the above"
    },
    {
        title: "String values must be enclosed within ____ when being assigned to variables",
        choices: ["commas", "curly brackets", "quotes", "parentheses"],
        answer: "quotes"
    },
    {
        title:
            "A very useful tool used during development and debugging for printing content to the debugger is:",
        choices: ["JavaScript", "terminal / bash", "for loops", "console.log"],
        answer: "console.log"
    }
];

//Setting the numerical variables for the functions.. scores and timers.. 
var score = 0;
var currentQuestion = -1;
var timeLeft = 0;
var timer;

//Initiates array called highscores, holding anything in localStorage named "highscores" or starts as empty array
let highscores = JSON.parse(localStorage.getItem("highscores")) || [];

//Starts countdown timer when "Start Quiz" button is clicked
function start() {
    timeLeft = 60;
    document.getElementById("timeLeft").innerHTML = timeLeft;

    timer = setInterval(function () {
        timeLeft--;
        document.getElementById("timeLeft").innerHTML = timeLeft;
        //Ends game when time is below 0
        if (timeLeft <= 0) {
            clearInterval(timer);
            endGame();
        }
    }, 1000);

    next();
}

//Stop timer to end game 
function endGame() {
    clearInterval(timer);

    var quizContent = `
    <h2>All Done!</h2>
    <h3>You got a ` + score + ` / 5!</h3>
    <input type="text" id="name" placeholder="Initials"> 
    <button onclick="setScore()">Submit</button>`;

    document.getElementById("quizBody").innerHTML = quizContent;
}

//Store score to local storage
function setScore() {
   
    highscores.push(score);
   
    highscores.sort(function (a, b) {
      return b - a;
    });
   
    console.log(highscores);
    
    localStorage.setItem("highscores", JSON.stringify(highscores));
    
    console.log("local storage:" + localStorage.highscores[1]);
  
    localStorage.setItem("highscoreName", document.getElementById("name").value);
    getScore();
  }
  
   
function getScore() {
  let finalHighScore = localStorage.highscores[1];
  var quizContent =
    `<h2>` + localStorage.getItem("highscoreName") + `'s current highscore:</h2>
    <h1>` + finalHighScore + `</h1><br> 
    
    <button onclick="resetGame()">Go Back</button><button onclick="clearScore()">Clear Highscore</button>
    
    `;

  document.getElementById("quizBody").innerHTML = quizContent;
}

//Clear score name and value When "Clear Score" is clicked
function clearScore() {
    localStorage.setItem("highscores", "");
    localStorage.setItem("highscoreName", "");

    resetGame();
}

//Reset the game 
function resetGame() {
    clearInterval(timer);
    score = 0;
    currentQuestion = -1;
    timeLeft = 0;
    timer = null;

    document.getElementById("timeLeft").innerHTML = timeLeft;

    var quizContent = `
    <h1>
        Coding Quiz Challenge
    </h1>
    <h3>
        Try to answer the following code related questions within the time
        limit. Keep in mind that incorrect answers will penalize your time
        by ten seconds. 
    </h3>
    <button onclick="start()">Start Quiz</button>`;

    document.getElementById("quizBody").innerHTML = quizContent;
}

//Deducts 10 seconds when an incorrect answer is picked
function incorrect() {
    timeLeft -= 10;
    next();
}

//Increases score by 1 for each correct answer
function correct() {
    score += 1;
    next();
}

//Loop through questions 
function next() {
    currentQuestion++;

    if (currentQuestion > questions.length - 1) {
        endGame();
        return;
    }

    var quizContent = "<h2>" + questions[currentQuestion].title + "</h2>"

    for (var buttonLoop = 0; buttonLoop < questions[currentQuestion].choices.length; buttonLoop++) {
        var buttonCode = "<button class='answerButton' onclick=\"[ANS]\">[CHOICE]</button>";
        buttonCode = buttonCode.replace("[CHOICE]", questions[currentQuestion].choices[buttonLoop]);
        if (questions[currentQuestion].choices[buttonLoop] == questions[currentQuestion].answer) {
            buttonCode = buttonCode.replace("[ANS]", "correct()");
        } else {
            buttonCode = buttonCode.replace("[ANS]", "incorrect()");
        }
        quizContent += buttonCode
    }

    document.getElementById("quizBody").innerHTML = quizContent;
}