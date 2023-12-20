const emojis = [
    "🐷", "🐷", "🐸", "🐸", "🦐", "🦐", "🐵", "🐵", "🐭", "🐭", "🐞", "🐞", "🐙", "🐙", "🐢", "🐢"
];

function playSound(nameAudio) {
    let audio = new Audio(`./src/audios/${nameAudio}.m4a`);
    audio.volume = 0.2;
    audio.play();
}

const restartButton = document.querySelector('.board__reset');

function restartGame() {
    localStorage.clear();
    window.location.reload();
}

let openCards = [];
let shuffleEmojis = emojis.sort(() => Math.random() - 0.5);

function handleClick() {
    if (!this.classList.contains("boxOpen") && openCards.length < 2) {
        this.classList.add("boxOpen");
        openCards.push(this);
    }

    if (openCards.length === 2) {
        setTimeout(checkMatch, 500);
    }
}

function checkMatch() {
    if (openCards.length === 2) {
        if (openCards[0].innerHTML === openCards[1].innerHTML) {
            openCards[0].classList.add("boxMatch");
            openCards[1].classList.add("boxMatch");
            playSound('correct');
        } else {
            openCards[0].classList.remove("boxOpen");
            openCards[1].classList.remove("boxOpen");
            playSound('incorrect');
        }
        openCards = [];

        const matchedBoxes = document.querySelectorAll(".boxMatch").length;
        const totalBoxes = emojis.length;

        if (matchedBoxes === totalBoxes) {
            const victoryMessage = document.createElement("div");
            victoryMessage.textContent = "Parabéns!🏆 Você venceu!🥳";
            victoryMessage.classList.add("board__victory-message");
            document.body.appendChild(victoryMessage);
        }
    }
}

for (let i = 0; i < emojis.length; i++) {
    let box = document.createElement("div");
    box.className = "board__item";
    box.onclick = handleClick;
    box.innerHTML = shuffleEmojis[i];
    document.querySelector(".board__game").appendChild(box);
}
