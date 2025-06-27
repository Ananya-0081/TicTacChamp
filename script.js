// ✅ FINAL: 1 Player vs Computer (Random AI) with Sound, Image on Win, and Sound/Text on Draw

console.log("Welcome to Tic Tac Toe");

let turn = "X";
let gameover = false;
let moveCount = 0;

let audio = new Audio("audio.mp3"); // click sound
let winSound = new Audio("win.wav"); // win sound
let drawSound = new Audio("draw.wav"); // draw sound

const changeTurn = () => (turn === "X" ? "O" : "X");

const checkWin = () => {
    let boxtext = document.getElementsByClassName("boxtext");
    let wins = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (let e of wins) {
        if (
            boxtext[e[0]].innerText === boxtext[e[1]].innerText &&
            boxtext[e[1]].innerText === boxtext[e[2]].innerText &&
            boxtext[e[0]].innerText !== ""
        ) {
            document.querySelector(".info").innerText = boxtext[e[0]].innerText + " Won";
            gameover = true;

            e.forEach(i => {
                boxtext[i].parentElement.classList.add("winning-cell");
            });

            document.querySelector(".imgbox img").style.width = "300px";
            winSound.play();
            return true;
        }
    }
    return false;
};

const checkDraw = () => {
    if (moveCount === 9 && !gameover) {
        document.querySelector(".info").innerText = "It's a draw! Try again";
        drawSound.play();
        gameover = true;
    }
};

const computerMove = () => {
    if (gameover) return;

    let boxtext = document.getElementsByClassName("boxtext");
    let emptyIndices = [];
    for (let i = 0; i < boxtext.length; i++) {
        if (boxtext[i].innerText === "") {
            emptyIndices.push(i);
        }
    }

    const tryToWinOrBlock = (player) => {
        let wins = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
        for (let line of wins) {
            let [a, b, c] = line;
            let vals = [boxtext[a].innerText, boxtext[b].innerText, boxtext[c].innerText];
            let filled = vals.filter(v => v === player).length;
            let emptyIndex = [a, b, c].find(i => boxtext[i].innerText === "");

            if (filled === 2 && emptyIndex !== undefined) return emptyIndex;
        }
        return null;
    };

    // Try to win
    let winMove = tryToWinOrBlock("O");
    if (winMove !== null) {
        boxtext[winMove].innerText = "O";
    } else {
        // Try to block X
        let blockMove = tryToWinOrBlock("X");
        if (blockMove !== null) {
            boxtext[blockMove].innerText = "O";
        } else {
            // Else random
            let randIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
            boxtext[randIndex].innerText = "O";
        }
    }

    audio.currentTime = 0;
    audio.play();
    moveCount++;

    if (!checkWin()) {
        checkDraw();
        if (!gameover) {
            turn = "X";
            document.querySelector(".info").innerText = "Turn for " + turn;
        }
    }
};

let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element => {
    let boxtext = element.querySelector(".boxtext");
    element.addEventListener("click", () => {
        if (boxtext.innerText === "" && !gameover && turn === "X") {
            boxtext.innerText = "X";
            audio.currentTime = 0;
            audio.play();
            moveCount++;

            if (!checkWin()) {
                checkDraw();
                if (!gameover) {
                    turn = "O";
                    document.querySelector(".info").innerText = "Turn for " + turn;
                    setTimeout(computerMove, 400);
                }
            }
        }
    });
});

document.getElementById("reset").addEventListener("click", () => {
    let boxtexts = document.querySelectorAll(".boxtext");
    Array.from(boxtexts).forEach(element => {
        element.innerText = "";
        element.parentElement.classList.remove("winning-cell");
    });

    turn = "X";
    moveCount = 0;
    gameover = false;
    document.querySelector(".info").innerText = "Turn for " + turn;
    document.querySelector(".imgbox img").style.width = "0px";
});
