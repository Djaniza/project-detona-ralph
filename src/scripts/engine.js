const game = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        mistake: document.querySelector(".mistake"),
        timeLeft: document.getElementById("time-left"),
        score: document.getElementById("score"),
        lives: document.getElementById("lives"),
        modalStart: document.getElementById("instructions"),
        modalTime: document.getElementById("time-end"),
        modalLifes: document.getElementById("lifes-end"),
        closeButton: document.getElementById("start-button"),
        modalTimeButton: document.getElementById("time-end-button"),
        closeLifesButton: document.getElementById("reset-button"),
        finalPointsMessage: document.getElementById("vida-extra"),
        finalPointsMessageTime: document.getElementById("max-score")
    },
    values: {
        timerId: null,
        gameVelocity: 1000,
        countDownTimer: 1000,
        enemyPosition: 0,
        point: 0,
        lives: 5,
        currentTime: 5,
        gameStart: false,
    },
};

const moveEnemy = () => {
    if (game.values.gameStart) {
        game.values.timerId = setInterval(randomSquare, game.values.gameVelocity);
    } else {
        clearInterval(game.values.timerId);
    }
}

const resetGame = () => {
    game.values.gameStart = true;
    game.values.currentTime = 5;
    game.values.lives = 5;
    game.values.point = 0;
    game.view.lives.textContent = game.values.lives;
    game.view.score.textContent = game.values.point;
}

game.view.closeButton.onclick = () => {
    game.view.modalStart.classList.remove("animated");
    game.view.modalStart.close();
    resetGame();
    moveEnemy();
}

game.view.modalTimeButton.onclick = () => {
    game.view.modalTime.classList.remove("animated");
    game.view.modalTime.close();
    resetGame();
}

game.view.closeLifesButton.onclick = () => {
    game.view.modalLifes.classList.remove("animated");
    game.view.modalLifes.close();
    resetGame();
}

const countDown = () => {
    if (game.values.currentTime > 0) {
        game.values.currentTime--;
        game.view.timeLeft.textContent = game.values.currentTime;
    } else {
        game.values.gameStart = false;
        game.view.modalTime.classList.add("animated");
        game.view.modalTime.showModal();
    }
};

const randomSquare = () => {
    if (game.values.gameStart) {
        game.view.squares.forEach((square) => {
            square.classList.remove("enemy");
            square.classList.remove("mistake");
        });

        let randomNumber = Math.floor(Math.random() * 9);
        game.values.enemyPosition = randomNumber;
        let randomSquare = game.view.squares[randomNumber];
        randomSquare.classList.add("enemy");
    } else {
        game.values.gameStart = false;
    }
}

const addListenerHitbox = () => {
    game.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if (square.id == game.values.enemyPosition + 1 && game.values.gameStart) {
                game.values.point++;
                game.view.score.textContent = game.values.point;
                game.view.finalPointsMessage.textContent = game.values.point;
                game.view.finalPointsMessageTime.textContent = game.values.point;
                game.values.enemyPosition = null;
            } else {
                game.view.squares[square.id - 1].classList.add("mistake");
                game.view.lives.textContent = game.values.lives;
                if (game.values.lives > 0) {
                    game.values.lives--;
                } else {
                    game.values.gameStart = false;
                    game.view.modalLifes.showModal();
                    game.view.modalLifes.classList.add("animated");
                }
            }
        })
    })
};

const initialize = () => {
    game.view.modalStart.classList.add("animated");
    game.view.modalStart.showModal();
    addListenerHitbox();
    if (game.values.currentTime > 0) {
        setInterval(countDown, game.values.countDownTimer);
    }
    moveEnemy();
};

initialize();