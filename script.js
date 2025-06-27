console.log("Welcome to tic tac toe");

let turn = "X";
let gameover = false;
let audio = new Audio("audio.mp3");
let win = new Audio("win.wav");
let draw = new Audio("draw.wav");
let c = 0;

// Switch between X and O
const changeTurn = () => {
    return turn === "X" ? "O" : "X";
};

// Check for a win
const checkWin = () => {
    let boxtext = document.getElementsByClassName("boxtext");
    let wins = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    wins.forEach(e => {
        if (
            boxtext[e[0]].innerText === boxtext[e[1]].innerText &&
            boxtext[e[2]].innerText === boxtext[e[1]].innerText &&
            boxtext[e[0]].innerText !== ""
        ) {
            document.querySelector(".info").innerText = boxtext[e[0]].innerText + " Won!";
            gameover = true;

            // Highlight the winning cells
            e.forEach(index => {
                boxtext[index].parentElement.classList.add("winning-cell");
            });

            // Show celebration image
            let img = document.querySelector(".imgbox img");
            img.style.width = "300px";

            win.play();
        }
    });
};

// Game logic
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element => {
    let boxtext = element.querySelector(".boxtext");

    element.addEventListener("click", () => {
        if (boxtext.innerText === "" && !gameover) {
            boxtext.innerText = turn;
            boxtext.classList.add(turn.toLowerCase()); // Add glow class: 'x' or 'o'
            audio.currentTime = 0;
            audio.play();
            c++;

            checkWin();

            if (!gameover) {
                if (c === 9) {
                    document.querySelector(".info").innerText = "It's a draw! Try again";
                    draw.play();
                    gameover = true;
                } else {
                    turn = changeTurn();
                    document.querySelector(".info").innerText = "Turn for " + turn;
                }
            }
        }
    });
});

// Reset game
reset.addEventListener("click", () => {
    let boxtexts = document.querySelectorAll(".boxtext");
    boxtexts.forEach(element => {
        element.innerText = "";
        element.classList.remove("x", "o");
        element.parentElement.classList.remove("winning-cell");
    });

    turn = "X";
    c = 0;
    gameover = false;
    document.querySelector(".info").innerText = "Turn for " + turn;

    let img = document.querySelector(".imgbox img");
    img.style.width = "0px";
});
