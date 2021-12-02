const startBtn = document.getElementById('start-btn')
const nextBtn = document.getElementById('next-btn')
const questionContent = document.getElementById('question-container')

const questionElem = document.getElementById('question')
const answersBtn = document.getElementById('answer-buttons')


let shuffledQuestions, currentQuestionIndex 

startBtn.addEventListener('click', startGame)
nextBtn.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion() 
})

function startGame(){
    console.log('Game Begins')
    startBtn.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContent.classList.remove('hide')
    setNextQuestion()
}

function setNextQuestion(){
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])

}

function showQuestion(question){ 
    questionElem.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if(answer.correct){
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answersBtn.appendChild(button)
    })
}

function resetState(){
    clearStatusClass(document.body)
    nextBtn.classList.add('hide')
    while (answersBtn.firstChild){
        answersBtn.removeChild(answersBtn.firstChild)
    }
}

function selectAnswer(e){
    const selectedBtn = e.target
    const correct = selectedBtn.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answersBtn.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1){
        nextBtn.classList.remove('hide')
    } else {
        startBtn.innerText = 'Restart'
        startBtn.classList.remove('hide')
    }
}

function setStatusClass(element, correct){
    clearStatusClass(element)
    if(correct){
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element){
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

// list of questions 
const questions = [
    {
        question: 'Who was the #1 draft pick in 2003?',
        answers: [
            { text: 'Chris Paul', correct: false },
            { text: 'Greg Oden', correct: false},
            { text: 'Tim Duncan', correct: false},
            { text: 'Lebron James', correct: true}
        ]
    },
    {
        question: 'What team drafted Ray Allen?',
        answers: [
            { text: 'SuperSonics', correct: false },
            { text: 'Timberwolves', correct: true},
            { text: 'Bucks', correct: false},
            { text: 'Lakers', correct: false}
        ]
    },
    {
        question: 'What player has the highest career 3-pt FG percentage?',
        answers: [
            { text: 'Steve Kerr', correct: true },
            { text: 'Steph Curry', correct: false},
            { text: 'Ray Allen', correct: false},
            { text: 'Reggie Miller', correct: false}

        ]
    },
    {
        question: 'What player has the most blocked shots in one season?',
        answers: [
            { text: 'Mark Eaton', correct: true },
            { text: 'Ben Wallace', correct: false},
            { text: 'Wilt Chamberlin', correct: false},
            { text: 'Robert Parish', correct: false}

        ]
    },
    {
        question: 'What team has the worst record in one season?',
        answers: [
            { text: 'Pelicans', correct: false },
            { text: '76ers ', correct: false},
            { text: 'Bobcats', correct: true},
            { text: 'Celtics', correct: false}
        ]
    }
]