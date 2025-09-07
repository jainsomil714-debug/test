const div2 = document.querySelectorAll(".div2");
const reset = document.getElementById("reset");
const message = document.getElementById("message");

let currentPlayer = "X";
let gameActive = true;

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function updateTurnHighlight() {
    const p1 = document.getElementById("person1");
    const p2 = document.getElementById("person2");

    if (currentPlayer === "X") {
        p1.classList.add("active");
        p2.classList.remove("active");
    } else {
        p2.classList.add("active");
        p1.classList.remove("active");
    }
}

function checkWinner() {
    for (let pattern of winPatterns) {
        let pos1 = div2[pattern[0]].innerText;
        let pos2 = div2[pattern[1]].innerText;
        let pos3 = div2[pattern[2]].innerText;

        if (pos1 !== "" && pos1 === pos2 && pos2 === pos3) {
            div2[pattern[0]].classList.add("winner");
            div2[pattern[1]].classList.add("winner");
            div2[pattern[2]].classList.add("winner");

            message.textContent = (pos1 === "X" ? "Person 1" : "Person 2") + " Wins! 🎉";
            gameActive = false;
            return true;
        }
    }

    let filled = [...div2].every(box => box.innerText !== "");
    if (filled) {
        message.textContent = "It's a Draw! 🤝";
        gameActive = false;
        return true;
    }

    return false;
}

function handleClick(e) {
    const cell = e.target;

    if (!gameActive || cell.innerText !== "") return;

    cell.innerText = currentPlayer;

    if (checkWinner()) return;

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    message.textContent = (currentPlayer === "X" ? "Person 1's Turn" : "Person 2's Turn");
    updateTurnHighlight();
}

function resetGame() {
    div2.forEach((box) => {
        box.innerText = "";
        box.classList.remove("winner");
    });
    currentPlayer = "X";
    gameActive = true;
    message.textContent = "Person 1's Turn";
    updateTurnHighlight();
}
div2.forEach((box) => box.addEventListener("click", handleClick));
reset.addEventListener("click", resetGame);
message.textContent = "Person 1's Turn";
updateTurnHighlight();
