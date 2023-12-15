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
let count = 11;
let countdown;

//Questions and Options array

const quizArray = [
    {
        id: "0",
        question: "1)In a class of 140 students  numbered 1 to 140, all even numbered students opted for Mathematics course, those whose number is divisible by 3 opted for physics course and those whose number  is divisible by 5 opted for Chemistry course.  Then the number of students who did not opt for any of the three courses is ",
        options: ["102", "42", "1", "38"],
        correct: "38",
    },
    {
        id: "1",
        question: "2Two newspapers A and B are published in a city.  It is known that 25% of the city population reads A and 20% reads B while 8% reads both A and B. Further, 30% of those who Read A but not B look into advertisements and 40 % of those who read B but not A also look into advertisements, while 50% of those who read both A and B look into advertisements.  Then the percentage of the population who look into advertisements is.",
        options: [" 12.8", "13", "13.5", "13.93"],
        correct: "13.93",
    },
    {
        id: "2",
        question: "A survey shows that 73% of the persons working in an office like coffee, whereas 65%like tea. If x denotes the percentage of them, who like both coffee and tea, then x CANNOT be.",
        options: ["63", "38", "54", "36"],
        correct: "36",
    },
    {
        id: "3",
        question: "3Out of all the patients in a hospital 89% are found to be suffering from heart a ailment and 98% are suffering from lungs infection.  If K% of them are suffering from both aliments, then K can not belong to the set",
        options: ["{79, 81, 83, 85}", "{84, 87, 90, 93}", "{ 80, 83, 86, 89}	", "{84, 86, 88, 90}"],
        correct: "{84, 86, 88, 90}",
    },
    {
        id: "4",
        question: "If the 2nd 5th and 9th terms of a non-constant A.P. are in G. P., then the common ratio of this G.P. is",
        options: ["4/3", "1", "7/4", "8/5"],
        correct: "4/3",
    },
    {
        id: "5",
        question: "The sum of an infinite geometric series with positive terms is 3 and the sums of the cubes of its terms in 27/29 them the common ratio of this series is ",
        options: ["4/9", "2/9", "2/3", "1/3"],
        correct: "2/3",
    }, {
        id: "6",
        question: "The sum of all two-digit positive numbers which when divided by 7 yield 2 or 5 as remained is ",
        options: ["1365", "1256", "1465", "1356"],
        correct: "1356",
    },
    {
        id: "7",
        question: "The product of three consecutive terms of a G.P. is 512, If 4 is added to each of the first and the second of these terms, the three terms now form and A.P., Then the sum of the original three terms of the given G.P. is.",
        options: ["36", "24", "32", "28"],
        correct: "28",
    },
    {
        id: "8",
        question: "Some identical balls are arranged in rows to form an equilateral triangle.  The first row consists of one ball, the second row consists of two balls and so on.  If 99 more identical balls are added to the total number of balls used in forming the equilateral triangle, then all these balls canbe arranged in a square whose each side contains exactly 2 balls less than the number of balls each side of the triangle contains.  Then the number of balls used to form the equilateral triangle is",
        options: ["190", "225", "262", "157"],
        correct: "190",
    },
    {
        id: "9",
        question: "The number of integers greater than 6,000 that can be formed, using the gigits 3, 5, 6, 7 and 8 without repetition , is ",
        options: ["216", "192", "120", "146"],
        correct: "192",
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
            count = 11;
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
    count = 11;
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