const startButton = document.getElementById('start-button')
const nextButton = document.getElementById('next-button')
const questionContainerElement = document.getElementById('question-box')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestion
let currentQuestionIndex

startButton.addEventListener('click', startGame)





function startGame() {
   startButton.classList.add('hide')
   shuffledQuestion = questions.sort(() => Math.random() - .5)
   currentQuestionIndex = 0
   questionContainerElement.classList.remove('hide')
   setNexQuestion()
}

function setNexQuestion() {
    resetState()
    showQuestion(shuffledQuestion[currentQuestionIndex])
}

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

function resetState() {
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild
        (answerButtonsElement.firstChild)
    }
}

function selectAnswer() {

}

const questions = [

    {
        question: 'what is 2 +2?',
        answers: [
            { text: '4', correct: true },
            { text: '22', correct: false }
        ]
    }
]