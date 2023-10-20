const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        mistake: document.querySelector(".mistake"),
        timeLeft: document.getElementById("time-left"),
        score: document.getElementById("score"),
        lives: document.getElementById("lives")
    },
    values: {
        timerId: null,
        gameVelocity: 1000,
        enemyPosition: 0,
        point: 0,
        lives: 5,
    }
};

const randomSquare = () => {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
        square.classList.remove("mistake");
    });

    let randomNumber = Math.floor(Math.random() * 9);
    state.values.enemyPosition = randomNumber;
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy")
}

const moveEnemy = () => {
    state.values.timerId = setInterval(randomSquare, state.values.gameVelocity)
}

const addListenerHitbox = () => {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if(square.id == (state.values.enemyPosition + 1)) {
                state.values.point++
                state.view.score.textContent = state.values.point;
                state.values.enemyPosition = null;
            } else {
                state.view.squares[square.id - 1].classList.add("mistake");
                state.values.lives--
                state.view.lives.textContent = state.values.lives
            }
        })
    })
};

const initialize = () => {
    addListenerHitbox();
    moveEnemy();
};

initialize();