// Declare Variables
var whichQuestion = 0;
var answerChoices = ["A", "B", "C", "D"];
var gameStates = ["Start", "Quest", "Answer", "End"];
var timeLimitMax = 10;
var timeLimit = timeLimitMax;
var answerPauseTime = (4 * 1000); // number of seconds, in miliseconds to display the nswer results
var questionIntervalId;
var currentGameState = gameStates[0];

//Constructor function to allow the instation of specific objects of the same class.
//By convention, constructor functions begin with a capitol letter.
function QuestionClass(question, answerA, answerB, answerC, answerD, correctAnswer, theImg) {
    this.theQuestion = question;
    this.answers = [answerA, answerB, answerC, answerD];
    this.theAnswer = correctAnswer;
    this.answerImg = theImg;
  }

var question0 = new QuestionClass("What was Luke's lightsaber color in Return of the Jedi?", "Blue", "Red", "Green", "Yellow", "Green", "https://media1.giphy.com/media/13zjUUbVp7wAGQ/giphy.gif?cid=3640f6095bcfbaaa725362533257e4df");
var question1 = new QuestionClass("Which of these is NOT a name of one of the Rebels?", "Wedge", "Piett", "Ackbar", "Porkins", "Piett", "https://media3.giphy.com/media/QAGDV5yWFm2hW/giphy.gif?cid=3640f6095bcfb2773671336d516fd49b");
var question2 = new QuestionClass("What was Darth Vader's first name?", "Barry", "Anakin", "Ozzel", "Jek", "Anakin", "https://media1.giphy.com/media/hwj7MQ3XDPVAI/giphy.gif?cid=3640f6095bcfbba66b4e6f5145e005d2");
var question3 = new QuestionClass("Who did Darth Vader choke at the beginning of Star Wars?", "Captain Antilles", "Admiral Motti", "Admiral Ozzel", "Jek Porkins", "Captain Antilles", "https://media0.giphy.com/media/xTiIzPbiiuTeaJ9U3u/giphy.gif?cid=3640f6095bcfbcf661614471674334bd");
var question4 = new QuestionClass('What is the laser color of the tie fighters?', "Yellow", "Red", "Green", "Blue", "Green", "https://media3.giphy.com/media/N2dm3kAb9d292/giphy.gif?cid=3640f6095bcfbf4d5245437855540fc7");
var question5 = new QuestionClass('Who took down the first walker in Empire Strikes Back?', "Leia", "Luke", "Wedge", "Hobbie", "Wedge", "https://media2.giphy.com/media/3ohuPxvsfZAK2sdPDG/giphy.gif?cid=3640f6095bcfbd65413237684d582042");
var question6 = new QuestionClass("What was the name of the shuttle the rebels used to get on Endor?", "Rogue One", "Tydirium", "Iridium", "Executor", "Tydirium", "https://media1.giphy.com/media/l1ugdadBpZPHk0ONW/giphy.gif?cid=3640f6095bcfbdd941436d35556d5dcf");
var question7 = new QuestionClass("What was the name of the bounty hunter that found Han Solo?", "Zuckuss", "Boba Fett", "IG-88", "4-LOM", "Boba Fett", "https://media0.giphy.com/media/uTByurrH5ABzE6LPMp/giphy.gif?cid=3640f6095bcfbe4e716a313851a64dd7");


var listOfQuestions = [question0, question1, question2, question3, question4, question5, question6, question7];
var correctCount = 0;
var incorrectCount = 0;
var unansweredCount = 0;

//define script that must be run after page is loaded
$(document).ready(function() {

    console.log("currentGameState = " + currentGameState);
    console.log("****************************");

    // Set up Start button and add it to the DOM
    startBtn = $("<button>");
    startBtn.addClass("start-button");
    startBtn.text("Start");
    $("#start-active").append(startBtn);

    // Set up answer buttons and add them to the DOM
    for (var k = 0; k < 4; k++) {
        var ansBtn = $("<button>");
        ansBtn.addClass("empty-button " + answerChoices[k]);
        ansBtn.attr("ansLetter", answerChoices[k]);
        ansBtn.text(answerChoices[k]);
        $("#answers").append(ansBtn);
    }

    // Set up Start Over button and add it to the DOM
    startoverBtn = $("<button>");
    startoverBtn.addClass("startover-button");
    startoverBtn.text("Start Over?");
    $("#startover").append(startoverBtn);

    //Define functions
    //decrement() is used to manage displayed timer and take action when timer hits 0
    function decrement() {
        timeLimit--
        // console.log("timeLimit = " + timeLimit);
        $("#clock").text(timeLimit);

        if (timeLimit === 0) {
            clearInterval(questionIntervalId);
            unansweredCount++;
            currentGameState = gameStates[2];
            $("#answer-result").text("Out of Time!");
            $("#animated-GIF").empty();
            var gifImg = $("<img>");
            gifImg.attr("src", listOfQuestions[whichQuestion].answerImg);
            $("#animated-GIF").append(gifImg);
            $("#incorrect-ans").show;
            $("#correctAns").text(listOfQuestions[whichQuestion].theAnswer);
            $("#incorrect-ans").show();
            console.log("in decrement - listOfQuestions[whichQuestion].theAnswer = " + listOfQuestions[whichQuestion].theAnswer);
            updateDisplay();
            timeLimit = timeLimitMax;
            setTimeout(nextQuestion, answerPauseTime);
        }
    }

    //runQuestionTimer() used to initiate question timer
    function runQuestionTimer() {
        clearInterval(questionIntervalId);
        questionIntervalId = setInterval(decrement, 1000);
    }

    //updateDisplay() will choose which elements to hide/show based on the current game state
    function updateDisplay() {
        console.log("currentGameState inside updateDisplay = " + currentGameState);
        console.log("****************************");
        if (currentGameState == gameStates[gameStates.indexOf("Start")]) {
            $("#start-active").show();
            $("#timer-active").hide();
            $("#question-active").hide();
            $("#ansResult-active").hide();
            $("#results-active").hide();
        } // end if Start
        else if (currentGameState == gameStates[gameStates.indexOf("Quest")]) {
            $("#start-active").hide();
            $("#timer-active").show();
            $("#question-active").show();
            $("#ansResult-active").hide();
            $("#results-active").hide();
        } // end if Quest
        else if (currentGameState == gameStates[gameStates.indexOf("Answer")]) {
            $("#start-active").hide();
            $("#timer-active").show();
            $("#question-active").hide();
            $("#ansResult-active").show();
            $("#results-active").hide();
        } // end if Answer
        else if (currentGameState == gameStates[gameStates.indexOf("End")]) {
            $("#start-active").hide();
            $("#timer-active").show();
            $("#question-active").hide();
            $("#ansResult-active").hide();
            $("#results-active").show();
        } // end if End
    }// end function

    //initialize times
    updateDisplay();
    $("#clock").text(timeLimit);

    //displayQuestion() displays the current question, resets Game State updates 
    //the display, resets the time limit and runs the question timer
    function displayQuestion() {
        $("#question").text(listOfQuestions[whichQuestion].theQuestion);
        $(".A").text(listOfQuestions[whichQuestion].answers[0]);
        $(".B").text(listOfQuestions[whichQuestion].answers[1]);
        $(".C").text(listOfQuestions[whichQuestion].answers[2]);
        $(".D").text(listOfQuestions[whichQuestion].answers[3]);
        currentGameState = gameStates[1];
        updateDisplay();
        timeLimit = timeLimitMax;
        runQuestionTimer();
    }

    //resetQuestions() puts the game back to the starting position
    function resetQuestions() {
        whichQuestion = 0;
        timeLimit = timeLimitMax;
        currentGameState = gameStates[0];
        updateDisplay();
        correctCount = 0;
        incorrectCount = 0;
        unansweredCount = 0;
        clearInterval(questionIntervalId);
        }

    startBtn.on("click", displayQuestion);

    startoverBtn.on("click", resetQuestions);
    
    $(".empty-button").on("click", function() {
        var thisAnswer = this.textContent;
        clearInterval(questionIntervalId);
        console.log("this = " + this.textContent);
        console.log("thisAnswer = " + thisAnswer);
        console.log("listOfQuestions[whichQuestion].theAnswer = " + listOfQuestions[whichQuestion].theAnswer);
        console.log("*************************");
        if (thisAnswer == listOfQuestions[whichQuestion].theAnswer) {
            correctCount++;
            currentGameState = gameStates[2];
            console.log("in if then correctCount = " + correctCount);
            $("#answer-result").text("Correct!");
            $("#animated-GIF").empty();
            var gifImg = $("<img>");
            gifImg.attr("src", listOfQuestions[whichQuestion].answerImg);
            $("#animated-GIF").append(gifImg);
            $("#incorrect-ans").hide();
            updateDisplay();
            setTimeout(nextQuestion, answerPauseTime);
        }
        else {
            incorrectCount++;
            currentGameState = gameStates[2];
            console.log("in else incorrectCount = " + incorrectCount);
            $("#answer-result").text("Nope!");
            $("#correctAns").text(listOfQuestions[whichQuestion].theAnswer);
            $("#animated-GIF").empty();
            var gifImg = $("<img>");
            gifImg.attr("src", listOfQuestions[whichQuestion].answerImg);
            $("#animated-GIF").append(gifImg);
            $("#incorrect-ans").show();
            updateDisplay();
            setTimeout(nextQuestion, answerPauseTime);
        }
    })

    function nextQuestion() {
        // clearInterval(pauseInterval);
        whichQuestion++;
        if (whichQuestion >= listOfQuestions.length) {
            currentGameState = gameStates[3];
            $("#correct-count").text(correctCount);
            $("#incorrect-count").text(incorrectCount);
            $("#unanswered-count").text(unansweredCount);
            updateDisplay();
            clearInterval(questionIntervalId);
            console.log("nextQuestion clearInterval(pauseIntervalID) executed");
        }
        else {
            timeLimit = timeLimitMax;
            $("#clock").text(timeLimit);
            clearInterval(questionIntervalId);
            currentGameState = gameStates[1];
            displayQuestion();
        }    
        updateDisplay();
    }

        //initialize times
        updateDisplay();
        $("#clock").text(timeLimit);

}); 