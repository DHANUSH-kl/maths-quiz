//References
let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 25;
let countdown;

//Questions and Options array

const quizArray = [
    {
        id: "0",
        question: "What is the formula for electric potential energy (U) in an electric field ?",
        options: [" U = QV", "U = CV^2", "U = 1/2 CV^2", "U = Q/C"],
        correct: "U = QV",
    },
    {
        id: "1",
        question: " What is the derivative of the function \(f(x) = 3x^2 + 2x - 1\) with respect to \(x\) ?",
        options: ["(6x + 2)", "(3x^2 + 2x)", "(6x - 2)", "(6x + 1)"],
        correct: "(6x + 2)",
    },
    {
        id: "2",
        question: "What is the SI unit of magnetic field strength ?",
        options: ["Tesla", "Weber", "Henry", " Ampere per meter"],
        correct: " Ampere per meter",
    },
    {
        id: "3",
        question: "  The eigen values of a 2x2 identity matrix are :",
        options: ["0,1", "1,1", "0,0,", "1,-1"],
        correct: "1,1",
    },
    {
        id: "4",
        question: " In a nuclear reactor, which particles initiate the chain reaction ?",
        options: ["Neutrons", "Electrons", "Protons", "Alpha particles"],
        correct: "Neutrons",
    },
    {
        id: "5",
        question: "If (A) and (B) are matrices, which of the following is true about the product (AB) if (A) is a 3x2 matrix and (B) is a 2x4 matrix ?",
        options: ["(AB) is not defined", "(AB) is a 3x4 matrix", "(AB) is a 2x2 matrix", "(AB) is a 2x4 matrix"],
        correct: "(AB) is a 2x2 matrix",
    }, {
        id: "6",
        question: "What phenomenon is responsible for the creation of rainbow colors in a prism ? ",
        options: ["Diffraction", "Refraction", "Dispersion", "Reflection"],
        correct: "Dispersion",
    },
    {
        id: "7",
        question: "In linear algebra, the rank of a matrix is :",
        options: ["The determinant of the matrix", "The number of rows in the matrix", "The maximum number of linearly independent rows or columns", " The sum of all elements in the matrix"],
        correct: "The maximum number of linearly independent rows or columns",
    },
    {
        id: "8",
        question: "What is the SI unit of inductance ?",
        options: ["Henry", "Farad", "Ohm", "Volt-second"],
        correct: "Henry",
    },
    {
        id: "9",
        question: " In probability theory, what is the complement of an event A ?",
        options: ["Event A itself", "The intersection of events A and B", "The union of events A and B", "The event not A"],
        correct: "The event not A",
    },
    {
        id: "10",
        question: " What is the energy source that powers the sun ?",
        options: ["Nuclear fission", "Nuclear fusion", "Chemical reactions", "Gravitational potential energy"],
        correct: "Gravitational potential energy",
    },
    {
        id: "11",
        question: "What type of bonding is present in methane (CH₄) ?",
        options: ["Ionic", "Covalent", "Metallic", "Coordinate"],
        correct: "Covalent",
    },
    {
        id: "12",
        question: "Which of the following is a noble gas ?",
        options: ["Oxygen", "Nitrogen", "Helium", "Fluorine"],
        correct: "Helium",
    },
    {
        id: "13",
        question: "The pH of a neutral solution is :",
        options: ["0", "7", "14", "1"],
        correct: "7",
    },
    {
        id: "14",
        question: "The process of conversion of a liquid into a gas at its boiling point is called :",
        options: ["Evaporation", "Condensation", "Sublimation", "Vaporization"],
        correct: "Vaporization",
    },
    {
        id: "15",
        question: "What is the electron configuration of chlorine ?",
        options: ["1s² 2s² 2p⁶ 3s² 3p⁶ 4s² 3d¹⁰ 4p⁵", "1s² 2s² 2p⁶ 3s² 3p⁶ 4s² 3d¹⁰ 4p⁴", "1s² 2s² 2p⁶ 3s² 3p⁶ 4s¹ 3d¹⁰ 4p⁶", "1s² 2s² 2p⁶ 3s² 3p⁶ 4s² 3d¹⁰ 4p⁶"],
        correct: "1s² 2s² 2p⁶ 3s² 3p⁶ 4s¹ 3d¹⁰ 4p⁶",
    },
    {
        id: "16",
        question: "Which of the following elements exhibits the highest electronegativity ?",
        options: ["Fluorine", "Oxygen", "Nitrogen", "Chlorine"],
        correct: "Fluorine",
    },
    {
        id: "17",
        question: "The Nernst equation is related to which aspect of electrochemistry ?",
        options: ["Faraday's laws", "Electrolysis", "Galvanic cells", " Rate of reaction"],
        correct: "Galvanic cells",
    },
    {
        id: "18",
        question: "Which of the following elements exhibits the highest electronegativity ?",
        options: ["Fluorine", "Oxygen", "Nitrogen", "Chlorine"],
        correct: "Fluorine",
    },
    {
        id: "19",
        question: "What comes next in the sequence: 2, 6, 12, 20, _?",
        options: ["26", "28", "30", "32"],
        correct: "28",
    },
    {
        id: "20",
        question: "What is the missing number in the series: 8, 27, _, 125, 216 ?",
        options: ["36", "64", "81", "100"],
        correct: "81",
    },
    {
        id: "21",
        question: "If the day after tomorrow is a Sunday, what day is it today ?",
        options: ["Monday", "Tuesday", "Wednesday", "Thursday"],
        correct: "Tuesday",
    },
    {
        id: "22",
        question: "What is the next shape in the pattern: Square, Circle, Triangle, Square, _?",
        options: ["Circle", "Rectangle", "Pentagon", "Hexagon"],
        correct: "Circle",
    },
    {
        id: "23",
        question: "If a shirt costs $20 after a 25% discount, what was its original price?",
        options: ["$15", "$25", "$22.50", "$30"],
        correct: "$30",
    },
    {
        id: "24",
        question: "If 8 – 3 = 24, 6 – 2 = 16, 9 – 7 = 14, what is 5 – 4?",
        options: ["5", "6", "7", "8"],
        correct: "6",
    },
    
];

//Restart Quiz
restart.addEventListener("click", () => {
    initial();
    displayContainer.classList.remove("hide");
    scoreContainer.classList.add("hide");
});

//Next Button
nextBtn.addEventListener(
    "click",
    (displayNext = () => {
        //increment questionCount
        questionCount += 1;
        //if last question
        if (questionCount == quizArray.length) {
            //hide question container and display score
            displayContainer.classList.add("hide");
            scoreContainer.classList.remove("hide");
            //user score
            userScore.innerHTML =
                "Your score is " + scoreCount + " out of " + questionCount;
        } else {
            //display questionCount
            countOfQuestion.innerHTML =
                questionCount + 1 + " of " + quizArray.length + " Question";
            //display quiz
            quizDisplay(questionCount);
            count = 25;
            clearInterval(countdown);
            timerDisplay();
        }
    })
);

//Timer
const timerDisplay = () => {
    countdown = setInterval(() => {
        count--;
        timeLeft.innerHTML = `${count}s`;
        if (count == 0) {
            clearInterval(countdown);
            displayNext();
        }
    }, 1000);
};

//Display quiz
const quizDisplay = (questionCount) => {
    let quizCards = document.querySelectorAll(".container-mid");
    //Hide other cards
    quizCards.forEach((card) => {
        card.classList.add("hide");
    });
    //display current question card
    quizCards[questionCount].classList.remove("hide");
};

//Quiz Creation
function quizCreator() {
    //randomly sort questions
    quizArray.sort(() => Math.random() - 0.5);
    //generate quiz
    for (let i of quizArray) {
        //randomly sort options
        i.options.sort(() => Math.random() - 0.5);
        //quiz card creation
        let div = document.createElement("div");
        div.classList.add("container-mid", "hide");
        //question number
        countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";
        //question
        let question_DIV = document.createElement("p");
        question_DIV.classList.add("question");
        question_DIV.innerHTML = i.question;
        div.appendChild(question_DIV);
        //options
        div.innerHTML += `
    <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
     <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
      <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
       <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
    `;
        quizContainer.appendChild(div);
    }
}

//Checker Function to check if option is correct or not
function checker(userOption) {
    let userSolution = userOption.innerText;
    let question =
        document.getElementsByClassName("container-mid")[questionCount];
    let options = question.querySelectorAll(".option-div");

    //if user clicked answer == correct option stored in object
    if (userSolution === quizArray[questionCount].correct) {
        userOption.classList.add("correct");
        scoreCount++;
    } else {
        userOption.classList.add("incorrect");
        //For marking the correct option
        options.forEach((element) => {
            if (element.innerText == quizArray[questionCount].correct) {
                element.classList.add("correct");
            }
        });
    }

    //clear interval(stop timer)
    clearInterval(countdown);
    //disable all options
    options.forEach((element) => {
        element.disabled = true;
    });
}

//initial setup
function initial() {
    quizContainer.innerHTML = "";
    questionCount = 0;
    scoreCount = 0;
    count = 25;
    clearInterval(countdown);
    timerDisplay();
    quizCreator();
    quizDisplay(questionCount);
}

//when user click on start button
startButton.addEventListener("click", () => {
    startScreen.classList.add("hide");
    displayContainer.classList.remove("hide");
    initial();
});

//hide quiz and display start screen
window.onload = () => {
    startScreen.classList.remove("hide");
    displayContainer.classList.add("hide");
};