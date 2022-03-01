// const variables
const startButton = document.getElementById('start-button')
const questionContainerElement = document.getElementById('question-box')
const questioinElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let randomQuestions
let currentQuestionInex

// press start button
startButton.addEventListener('click', startQuiz)

// start game function. --> onlcick hide start button, reveal container and start question function
function startQuiz() {
    startButton.classList.add('hide')
    questionContainerElement.classList.remove('hide')
    randomQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionInex = 0
    setNextQuestion()
}

// questioin function
function setNextQuestion() {
    showQuestion( randomQuestions[currentQuestionInex])
}

function showQuestion(questions) {
    questioinElement.innerText = questions.questions
}

// question and answer array 
const questions = [
    {
        questions: 'what is 2 + 2',
        answers: [
            {text: '4', correct: true},
            {text:'22', correct: false},
        ]
    }
]



function selectAnswer() {

}