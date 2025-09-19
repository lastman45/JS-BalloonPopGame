const startScreen = document.getElementById("start-screen");
const endScreen = document.getElementById("end-screen");
const startBtn = document.getElementById("start-btn");
const baloonContainer = document.getElementById("baloon-container");
const scoreboard = document.getElementById("scoreboard");
const timeDisplay = document.getElementById("time");
const scoreDisplay = document.getElementById("score");
const finalScoreDisplay = document.getElementById("final-score");

let gameInterval;
let timeInterval;
let timeLeft = 30;
let score = 0;
let gameRunning = false;

function createBaloon(){
    if(!gameRunning) return;
    const baloon = document.createElement("div");
    baloon.classList.add("baloon");
    baloon.textContent = "🎈";

    baloon.style.left = Math.random() * (window.innerWidth - 50) + "px";

    const duration = Math.random() * 3 + 4;
    baloon.style.animationDuration = duration + "s";

    baloon.addEventListener("click", () => {
        baloon.remove();
        score++;
        scoreDisplay.textContent = score;
    });

    baloon.addEventListener("animationend", () => {
        baloon.remove();
    });

    baloonContainer.appendChild(baloon);
}

function startGame(){
    startScreen.style.display = "none";
    scoreboard.style.display = "block";
    gameRunning = true;

    //Creating Ballons
    gameInterval = setInterval(createBaloon, 400);

    //Start CountDown Timer
    timeInterval = setInterval(() => {
        timeLeft--;
        timeDisplay.textContent = timeLeft;

        if(timeLeft <= 0){
            endGame();
        }
    }, 1000);
}

function endGame(){
    gameRunning = false;
    clearInterval(gameInterval);
    clearInterval(timeInterval);

    scoreboard.style.display = "none";
    endScreen.style.display = "flex";
    finalScoreDisplay.textContent = score;
}

startBtn.addEventListener("click", startGame);