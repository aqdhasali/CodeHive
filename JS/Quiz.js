// Creating an array and storing the questions and answers
const quizQuestions = [
    {
        question:"Which of the following is not a valid Python data type?",
        optionA:"Dictionary",
        optionB:"Set",
        optionC:"Table",
        optionD:"Tuple",
        correctOption:"optionC" 
    },
    {
        question:"What is the purpose of comments in programming?",
        optionA:"Styling the code",
        optionB:"Documentation",
        optionC:"To make it easy for the reader",
        optionD:"To explain the code block",
        correctOption:"optionB"
    },
    {
        question:"Which of the following is a data structure used to store multiple values in Python?",
        optionA:"loop",
        optionB:"variable",
        optionC:"list",
        optionD:"function",
        correctOption:"optionC"
    },
    {
        question:"Which built-in function in Python can be used to determine the length of a list?",
        optionA:"len()",
        optionB:"count()",
        optionC:"index()",
        optionD:"append()",
        correctOption:"optionA"
    },
    {
        question:"What does CSS stands for?",
        optionA:"Creative Style Sheets",
        optionB:"Colorful Style Sheets",
        optionC:"Custom Sytle Sheets",
        optionD:"Cascading Style Sheets",
        correctOption:"optionD"
    },
    {
        question:"What is the correct keyword used to define a function in Python?",
        optionA:"fun",
        optionB:"def",
        optionC:"define",
        optionD:"function",
        correctOption:"optionB"
    },
    {
        question:"Which programming language is used to develop android apps?",
        optionA:"Java",
        optionB:"Python",
        optionC:"C++",
        optionD:"JavaScript",
        correctOption:"optionA"
    },
    {
        question:"Which programming langurage is used for creating web pages?",
        optionA:"HTML AND CSS",
        optionB:"HTML",
        optionC:"CSS",
        optionD:"PHP",
        correctOption:"optionB"
    },
    {
        question:"Which programming language is used to create desktop applications?",
        optionA:"Python",
        optionB:"C#",
        optionC:"Java",
        optionD:"JavaScript",
        correctOption:"optionB"
    },
    {
        question:"What is a loop in programming?",
        optionA:"Using Functions",
        optionB:"HTML",
        optionC:"String",
        optionD:"Iteration",
        correctOption:"optionD"
    }
]

let question_num = 1 //holds the current question number
let attempt = 0 //to hold the number question the player has attempted
let score = 0  //holds the player score
let wrong_answer = 0 //amount of wrong answers picked by player
let index_num = 0 //will be used in displaying next question
let timer = 0 //the timer varibale to increase the time in seconds
let timeId;


function handleQuestion(index){
    let currentQuestion = quizQuestions[index_num]
    document.getElementById('question-number').innerHTML=question_num
    document.getElementById('player-score').innerHTML=score
    document.getElementById('display-question').innerHTML=currentQuestion.question;
    document.getElementById('option-one-label').innerHTML=currentQuestion.optionA;
    document.getElementById('option-two-label').innerHTML=currentQuestion.optionB;
    document.getElementById('option-three-label').innerHTML=currentQuestion.optionC;
    document.getElementById('option-four-label').innerHTML=currentQuestion.optionD;

}

function checkAnswer(){
    let currentQuestion = quizQuestions[index_num] //get current question

    let currentQuestionAnswer = currentQuestion.correctOption //gets the correct answer for this question
    let options = document.getElementsByName('option'); //get all the elements from the option class (the options)
    let correctOption = null
    
    //to check if the correct option matches the correct answer 
    for(let i = 0; i < options.length;i++){
        let option = options[i]
        if(option.value===currentQuestionAnswer){
            correctOption = option.labels[0].id
        }
    }

    //to check if the answer is correct or not and change the color accordingly
    for(let i = 0; i < options.length; i++){
        option = options[i]
        if(option.checked === true && option.value === currentQuestionAnswer){
            document.getElementById(correctOption).style.backgroundColor = "#2ecc71"
            attempt++
            score++
            index_num++
            question_num++
        }
        else if(option.checked === true && option.value !== currentQuestionAnswer){
            const wrongLabelId = option.labels[0].id
            document.getElementById(wrongLabelId).style.backgroundColor = "#e74c3c"
            document.getElementById(correctOption).style.backgroundColor = "#2ecc71"
            
            attempt++
            wrong_answer++
            index_num++
            question_num++  

        }
    }
}

function handleNextQuestion(){
    checkAnswer()
    unCheckRadioButtons()
   
    setTimeout(() => {
        resetOptionBackground()
        if (index_num < 10) {
            //displays next question as long as index number isn't greater than 9, remember index number starts from 0, so index 9 is question 10
            handleQuestion(index_num)

        }
        else{
            endGame()
            clearInterval(timeId)
            //ends game if index number greater than 9 meaning we're already at the 10th question
        }
    },500);
}

//sets options background back to null after display the right/wrong colors
function resetOptionBackground() {
    const options = document.getElementsByName("option");
    for(let i = 0; i < options.length ; i++){
        option = options[i]
        document.getElementById(option.labels[0].id).style.backgroundColor = ""
    }
}

// unchecking all radio buttons for next question(can be done with map or foreach loop also)
function unCheckRadioButtons() {
    const options = document.getElementsByName("option");
    for (let i = 0; i < options.length; i++) {
        options[i].checked = false;
    }
}

//function for the end game score box
function endGame(){ 
    let feedback = null
    let feedbackColor = null

    // condition check for player remark and remark color
    if (score < 4) {
        feedback = "Bad Grades, Keep Practicing."
        feedbackColor = "red"
    }
    else if (score > 4 && score < 7 ) {
        feedback = "Average Grades, You can do better."
        feedbackColor = "orange"
    }
    else if (score > 7) {
        feedback = "Excellent, Keep the good work going."
        feedbackColor = "green"
    }
    const playerGrade = (score / 10) * 100

    
    //data to display to score board
    
    document.getElementById('attempts').innerHTML = attempt
    document.getElementById('feedback').innerHTML = feedback
    document.getElementById('feedback').style.color = feedbackColor
    document.getElementById('grade-percentage').innerHTML = playerGrade
    document.getElementById('wrong-answers').innerHTML = wrong_answer
    document.getElementById('right-answers').innerHTML = score
    document.getElementById('time-taken').innerHTML = timer
    document.getElementById('endgame-container-id').style.display = "flex"
    document.getElementById('quiz-container-id').style.display = "none"
}

//closes score container, resets game 
function closeScoreModal() {
    question_num = 1
    score = 0
    wrong_answer = 0
    index_num = 0
    timer = 0
    attempt = 0
    handleQuestion(index_num)
    document.getElementById('main-container').style.display = "none"
    document.getElementById('quiz-rules-id').style.display ="flex"
    document.getElementById('start-button').style.display ="flex"
}

//Function to display to start the quiz after cliscking the start button
function startQuiz(){
    setTimer()
    document.getElementById('quiz-container-id').style.display = "flex"
    document.getElementById('main-container').style.display = "flex"
    document.getElementById('start-button').style.display ="none"
    document.getElementById('quiz-rules-id').style.display ="none"
    document.getElementById('endgame-container-id').style.display = "none"
    handleQuestion(0)
}

function setTimer(){
    timeId = setInterval(function(){
        timer++;
        document.getElementById('time').innerHTML = timer;
    
         if(timer==60){
            clearInterval(timeId);
            endGame()
         }

    },1000);
}
