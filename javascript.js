const questions = [
    {
        question: "Where did Terry once live when pursuing a college education?",
        optionA: "Australia",
        optionB: "Sweden",
        optionC: "North Korea",
        optionD: "Japan",
        correctOption: "optionD"
    },

    {
        question: "What hidden talent did Terry have?",
      
        optionA: "Magical Talent",
        optionB: "Musical Talent",
        optionC: "Artistic Talent",
        optionD: "Comical Talent",
        correctOption: "optionC"
    },

    {
        question: "Which member of the squad likes to stay in the office rather than in the line of fire?",
        optionA: "Amy",
        optionB: "Terry",
        optionC: "Jake",
        optionD: "Charles",
        correctOption: "optionB"
    },

    {
        question: "Who disappeared after the pilot of the show and was never seen again?",
        optionA: "Letivia",
        optionB: "Detective Daniels",
        optionC: "Charles",
        optionD: "Selena",
        correctOption: "optionB"
    },

    {
        question: "What is Jake's favorite movie?",
        optionA: "Die Hard",
        optionB: "Casa Blanca",
        optionC: "10 things I hate about you",
        optionD: "Police Chronicles",
        correctOption: "optionA"
    },

    {
        question: "Which member of the precinct often uses pseudonyms?",
        optionA: "Jake",
        optionB: "Raymond",
        optionC: "Rosa",
        optionD: "Charles",
        correctOption: "optionC"
    },

    {
        question: "Which member of the squad was almost married in Season Two?",
        optionA: "Amy",
        optionB: "Rosa",
        optionC: "Ben",
        optionD: "Charles",
        correctOption: "optionB"
    },

    {
        question: "What happened at Jake and Amy's wedding in Season Five?",
        optionA: "There was a bomb threat",
        optionB: "There was an objection",
        optionC: "Scully had a heart attack",
        optionD: "Jake was not able to attend",
        correctOption: "optionA"
    },

    {
        question: "Who plays the role of Gina Linetti?",
        optionA: "Andy Samberg",
        optionB: "Selena Gomez",
        optionC: "Alicia Silverstone",
        optionD: "Chelsea PerettI",
        correctOption: "optionD"
    },

    {
        question: "What number is the precinct in the show?",
        optionA: "18th",
        optionB: "89th",
        optionC: "78th",
        optionD: "99th",
        correctOption: "optionD"
    },

    {
        question: "Where was Charles' adopted son from?",
        optionA: "Denmark",
        optionB: "Philippines",
        optionC: "Latvia",
        optionD: "China",
        correctOption: "optionC"
    },

    {
        question: "What is Gina's job in the precinct?",
        optionA: "Administrator",
        optionB: "Detective",
        optionC: "Guard",
        optionD: "Veterinarian",
        correctOption: "optionA"
    }
]


let shuffledQuestions = [] 

function handleQuestions() { 
    while (shuffledQuestions.length <= 6) {
        const random = questions[Math.floor(Math.random() * questions.length)]
        if (!shuffledQuestions.includes(random)) {
            shuffledQuestions.push(random)
        }
    }
}


let questionNumber = 1
let playerScore = 0  
let wrongAttempt = 0 
let indexNumber = 0 

function NextQuestion(index) {
    handleQuestions()
    const currentQuestion = shuffledQuestions[index]
    document.getElementById("question-number").innerHTML = questionNumber;
    document.getElementById("player-score").innerHTML = playerScore;
    document.getElementById("display-question").innerHTML = currentQuestion.question;
    document.getElementById("option-one-label").innerHTML = currentQuestion.optionA;
    document.getElementById("option-two-label").innerHTML = currentQuestion.optionB;
    document.getElementById("option-three-label").innerHTML = currentQuestion.optionC;
    document.getElementById("option-four-label").innerHTML = currentQuestion.optionD;

}


function checkForAnswer() {
    const currentQuestion = shuffledQuestions[indexNumber] 
    const currentQuestionAnswer = currentQuestion.correctOption 
    const options = document.getElementsByName("option"); 
    let correctOption = null

    options.forEach((option) => {
        if (option.value === currentQuestionAnswer) {
            correctOption = option.labels[0].id
        }
    })

    if (options[0].checked === false && options[1].checked === false && options[2].checked === false && options[3].checked == false) {
        document.getElementById('option-modal').style.display = "flex"
    }

 
    options.forEach((option) => {
        if (option.checked === true && option.value === currentQuestionAnswer) {
            document.getElementById(correctOption).style.backgroundColor = "green"
            playerScore++ 
            indexNumber++ 
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }

        else if (option.checked && option.value !== currentQuestionAnswer) {
            const wrongLabelId = option.labels[0].id
            document.getElementById(wrongLabelId).style.backgroundColor = "red"
            document.getElementById(correctOption).style.backgroundColor = "green"
            
            wrongAttempt++
            playerScore--
            indexNumber++
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }

    })
}

function handleNextQuestion() {
    checkForAnswer() 
    unCheckRadioButtons()
    setTimeout(() => {
        if (indexNumber <= 4) {
            NextQuestion(indexNumber)
        }
        else {
            handleEndGame()
        }
        resetOptionBackground()
    }, 1000);
}

function resetOptionBackground() {
    const options = document.getElementsByName("option");
    options.forEach((option) => {
        document.getElementById(option.labels[0].id).style.backgroundColor = ""
    })
}
function unCheckRadioButtons() {
    const options = document.getElementsByName("option");
    for (let i = 0; i < options.length; i++) {
        options[i].checked = false;
    }
}
function handleEndGame() {
    let remark = null
    let remarkColor = null

    
    const playerGrade = (playerScore / 5 * 100)
    document.getElementById('remarks').innerHTML = remark
    document.getElementById('remarks').style.color = remarkColor
    document.getElementById('grade-percentage').innerHTML = playerGrade
    
    document.getElementById('right-answers').innerHTML = playerScore
    document.getElementById('score-modal').style.display = "flex"

}