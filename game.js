const gameDiv = document.getElementById('game');
const userInput = document.getElementById('userInput');
const submitButton = document.getElementById('submit');

class Game {
    constructor() {
        this.level = 0; // Текущий уровень
        this.memes = [
            "images/meme1.jpg", // Уровень 1
            "images/meme2.jpg", // Уровень 2
            "images/meme3.webp", // Уровень 3
            "images/meme4.webp", // Уровень 4
            "images/meme5.webp", // Уровень 5
            "images/meme6.png", // Уровень 6
        ]; 
        this.start();
    }

    start() {
        this.level = 1;
        this.renderLevel();
    }

    renderLevel() {
        switch (this.level) {
            case 1:
                this.render("Уровень 1: Вы в аудитории. Ваш друг находится в другой части колл-центра(нгуэу). Какой путь вы выберете? Введите '1' для обхода, '2' для прямого пути.");
                break;
            case 2:
                this.render("Уровень 2: Вы уже коридоре. Слухи о том, что Лариса Юрьевна здесь. Как вы будете действовать? Введите '1' для того, чтобы спрятаться, '2' чтобы продолжать.");
                break;
            case 3:
                this.render("Уровень 3: Вы увидели своего друга. Он в беде.  Введите '1' чтобы помочь ему, '2' чтобы уйти.");
                break;
            case 4:
                this.render("Уровень 4: Лариса Юрьевна заметила вас! Как вы будете реагировать? Введите '1' чтобы сбежать, '2' чтобы притвориться.");
                break;
            case 5:
                this.render("Уровень 5: Вам нужно решить, сливать друга или быть изгоем. Введите '1' для предательства, '2' для честности(изгой).");
                break;
            case 6:
                this.render("Уровень 6: Поздравляем, вы прошли экзамен или попали в камеру пыток, в зависимости от вашего выбора.");
                break;
                case 7:
                this.render("Уровень 7: Вы сдаите 23 пересдачу? Введите '1' нет,я изгой '2' да,я ведь не изгой ");
                break;
            default: 
                this.render("Игра завершена.");
        }
        this.displayMeme();
    }

    displayMeme() {
        const meme = document.createElement("img");
        meme.src = this.level <= this.memes.length ? this.memes[this.level - 1] : "";
        meme.alt = "Мем";
        meme.classList.add("meme");
        gameDiv.appendChild(meme);
    }

    validateChoice(choice) {
        switch (this.level) {
            case 1:
                if (choice === '1') {
                    this.level++;
                    this.renderLevel();
                } else {
                    this.gameOver("Вы не успели. Лариса Юрьевна вас поймала!");
                }
                break;
            case 2:
                if (choice === '1') {
                    this.level++;
                    this.renderLevel();
                } else {
                    this.gameOver("Вас заметили и отправили на пересдачу!");
                }
                break;
            case 3:
                if (choice === '1') {
                    this.level++;
                    this.renderLevel();
                } else {
                    this.gameOver("Вы оставили друга в беде, и он не смог сдать экзамен.");
                }
                break;
            case 4:
                if (choice === '1') {
                    this.gameOver("Вы сбежали, но ваш друг остался. Вам теперь придется объяснять преподавателю.");
                } else {
                    this.level++;
                    this.renderLevel();
                }
                break;
            case 5:
                if (choice === '1') {
                    this.gameOver("Вы предали друга, но остались в безопасности.");
                } else {
                    this.gameOver("Вы честны, но в итоге вас поймали!");
                }
                break;
            case 6:
                this.renderVictory("Сигмабой!");
                break;
            default:
                this.render("Игра завершена.");
        }
    }

    renderVictory(message) {
        gameDiv.innerHTML = `<h2>${message}</h2>`;
        const sigma = document.createElement("img");
        sigma.src = "images/sigma.webp"; // Путь к изображению "Сигмабой"
        sigma.alt = "Сигмабой";
        gameDiv.appendChild(sigma);
    }

    gameOver(reason) {
        const gameOverMessage = `${reason} Игра окончена!`;
        gameDiv.innerHTML = gameOverMessage;
        
        const cryingCat = document.createElement("img");
        cryingCat.src = "images/cryingcat.webp"; // Путь к изображению плачущего кота
        cryingCat.alt = "Плачущий кот";
        gameDiv.appendChild(cryingCat);
        
        submitButton.disabled = true; // Блокируем кнопку в конце игры
    }

    render(message) {
        gameDiv.innerHTML = message;
    }
}

const game = new Game();

submitButton.addEventListener('click', () => {
    const inputValue = userInput.value;
    userInput.value = '';
    
    game.validateChoice(inputValue);
});