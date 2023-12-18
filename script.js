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
        question: "2Two newspapers A and B are published in a city.  It is known that 25% of the city population reads A and 20% reads B while 8% reads both A and B. Further, 30% of those who Read A but not B look into advertisements and 40 % of those who read B but not A also look into advertisements, while 50% of those who read both A and B look into advertisements.  Then the percentage of the population who look into advertisements is.",
        options: [" 12.8", "13", "13.5", "13.93"],
        correct: "13.93",
    },
    {
        id: "2",
        question: "What is the SI unit of magnetic field strength ?",
        options: ["Tesla", "Weber", "Henry", " Ampere per meter"],
        correct: " Ampere per meter",
    },
    {
        id: "3",
        question: "3Out of all the patients in a hospital 89% are found to be suffering from heart a ailment and 98% are suffering from lungs infection.  If K% of them are suffering from both aliments, then K can not belong to the set",
        options: ["{79, 81, 83, 85}", "{84, 87, 90, 93}", "{ 80, 83, 86, 89}	", "{84, 86, 88, 90}"],
        correct: "{84, 86, 88, 90}",
    },
    {
        id: "4",
        question: " In a nuclear reactor, which particles initiate the chain reaction ?",
        options: ["Neutrons", "Electrons", "Protons", "Alpha particles"],
        correct: "Neutrons",
    },
    {
        id: "5",
        question: "The sum of an infinite geometric series with positive terms is 3 and the sums of the cubes of its terms in 27/29 them the common ratio of this series is ",
        options: ["4/9", "2/9", "2/3", "1/3"],
        correct: "2/3",
    }, {
        id: "6",
        question: "What phenomenon is responsible for the creation of rainbow colors in a prism ? ",
        options: ["Diffraction", "Refraction", "Dispersion", "Reflection"],
        correct: "Dispersion",
    },
    {
        id: "7",
        question: "The product of three consecutive terms of a G.P. is 512, If 4 is added to each of the first and the second of these terms, the three terms now form and A.P., Then the sum of the original three terms of the given G.P. is.",
        options: ["36", "24", "32", "28"],
        correct: "28",
    },
    {
        id: "8",
        question: "What is the SI unit of inductance ?",
        options: ["Henry", "Farad", "Ohm", "Volt-second"],
        correct: "Henry",
    },
    {
        id: "9",
        question: "The number of integers greater than 6,000 that can be formed, using the gigits 3, 5, 6, 7 and 8 without repetition , is ",
        options: ["216", "192", "120", "146"],
        correct: "192",
    },
    {
        id: "10",
        question: " What is the energy source that powers the sun ?",
        options: ["Nuclear fission", "Nuclear fusion", "Chemical reactions", "Gravitational potential energy"],
        correct: "Gravitational potential energy",
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