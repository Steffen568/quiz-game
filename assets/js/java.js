// Const Variables
const startButton = document.getElementById('start-button')
const nextButton = document.getElementById('next-button')
const questionContainerElement = document.getElementById('question-box')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const scoreContainer = document.getElementById('scoreContainer')
const countDownElement = document.getElementById('countdown');
const starterContainerElement = document.getElementById('starterC')

// Let Variables
let shuffledQuestion
let currentQuestionIndex
let timeSeconds = 100;
let maxScoreStorage = 10;

// Local Storage Object
let highScores = JSON.parse(localStorage.getItem('highScores')) 

// Event Listeners
startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNexQuestion()
})


// start game function > hides startbutton > reveals questioin container > gives random question > starts quizCountdown
function startGame() {
   startButton.classList.add('hide')
   starterContainerElement.classList.add('hide')
   shuffledQuestion = questions.sort(() => Math.random() - 0.5)
   currentQuestionIndex = 0
   questionContainerElement.classList.remove('hide')
// scoreContainer.innerHTML = ''
   quizCountdown()
   setNexQuestion()
}

// Countdown function 
function quizCountdown() {
    countDownElement.innerHTML = `Time Left: ${timeSeconds}`;
    if (timeSeconds <= 0) {
        gameOver();
    } else {
        timeSeconds -= 1;
        runningTimer = setTimeout(quizCountdown, 1000);
    }
}

// reveals next random quesiton in array and calls resetState
function setNexQuestion() {
    resetState()
    showQuestion(shuffledQuestion[currentQuestionIndex])
}

// generates answer buttons from array and captures input
function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('button')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
        
};

// trasition state between question answered and next question revealed >  hides next button
function resetState() {
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild
        (answerButtonsElement.firstChild)
    }
}

// Answer function and data collection > stores input data and reveals next button if there are questions left in the array
function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    answerCollector(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        answerCollector(button, button.dataset.correct)
    })
    if (shuffledQuestion.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        gameOver()
    } 
    
}

// adds time if answer is correct > subracts time if wrong
function answerCollector(element, correct) {
    if (correct) {
        timeSeconds = timeSeconds + 10;
    } else {
        timeSeconds = timeSeconds - 10;
    }
} 

// End Game function > freezes timer > calls showStats()
function gameOver() {
    clearInterval(runningTimer);
    showStats()
}

// reveals scoreContainer > gives final score and creates prompt to input name for local storage
function showStats() {
    finalScore = timeSeconds;
    if (finalScore < 0) {
        finalScore = 0;
    }
    questionElement.innerText = ''
    scoreContainer.classList.remove('hide')
    answerButtonsElement.classList.add('hide')
    scoreContainer.innerHTML = `Your score is ${finalScore}! <div id="init">Name: <input type="text" name="initials" id="initials" placeholder="Enter Your Name"><button id="save-btn" class="save-btn btn" onclick="submitScores(event)">Save</button>`
    userName = document.getElementById('initials')
    saveButton = document.getElementById('save-button')
    saveButton.addEventListener('click', submitScores)
}

// local storage function > pushes input and orders highScoresList >  turns object into string for highScoresList
function submitScores(e) {
    var score = {
        score: finalScore,
        name: userName.value
    }
    highScores.push(score);
    highScores.sort((a, b) => b.score - a.score)
    highScores.splice(maxScoreStorage)
    localStorage.setItem('highScores', JSON.stringify(highScores))
    displayScores()
}

// creates list header > and list items from user input to be show in highScores 
function displayScores() {
    clearInterval(runningTimer)
    countDownElement.innerHTML = ''
    scoreContainer.innerHTML = `<h2>Top 10 High Scores</h2><ul id="highScoresList"></ul>`
    scoreContainer.classList.add('question-box')
    var scoreList = document.getElementById('highScoresList')
    scoreList.innerHTML = highScores
    .map(score => {
        return `<li class="scoresList">${score.name} - ${score.score}</li>`
    })
    .join('')
}


// Question Array
const questions = [

    {
        question: 'Is cereal considered a soup?',
        answers: [
            { text: 'Yes', correct: false },
            { text: 'No', correct: true }
            
        ]
    },
    {
        question: 'If cats could talk, would they lie to you?',
        answers: [
            { text: 'Yes', correct: true },
            { text: 'No', correct: false }
            
        ]
    },
    {
        question:  'Who are the real villans in StarWars, the Jedi or the Empire?',
        answers: [
            { text: 'The Jedi, they are extreamists, and can read minds which is an invasion of privacy.', correct: true },
            { text: 'The Empire, they wear too much black and the sith are scary', correct: false }
            
        ]
    },
    {
        question: 'Is it ethical to be a Dallas Cowboys fan?(selecting the wrong answer may or may not drop your credit score)',
        answers: [
            { text: 'No, Jerry Jones is a bad man. ATT stadium is ugly and lacks anything resembleing a home field advantage. ', correct: true },
            { text: 'Yes, I enjoy not winning anything significant since 1995 ', correct: false }
        ]
    }
]