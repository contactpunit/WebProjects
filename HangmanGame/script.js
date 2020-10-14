class Hangman {
    constructor() {
        this.wordEl = document.querySelector('#word');
        this.wrongLettersEl = document.querySelector('#wrong-letters');
        this.finalMsgEl = document.querySelector('#final-message');
        this.playBtn = document.querySelector('#play-button');
        this.notificationCtr = document.querySelector('#notification-container');
        this.popUpContainerEl = document.querySelector('#popup-container');
        this.figurePartEl = document.querySelectorAll('.figure-part');
        this.wrongLetters = [];
        this.correctLetters = [];
        this.playWord = this.chooseRandomWord();
        window.addEventListener('keydown', this.recordAndMatchLetter.bind(this))
        this.playBtn.addEventListener('click', this.resetGame.bind(this))
    }

    resetGame() {
        this.wrongLetters.splice(0);
        this.correctLetters.splice(0);
        this.playWord = this.chooseRandomWord();
        this.figurePartEl.forEach(element => {
            element.style.display = 'none';
        });
        this.wordEl.innerHTML ='';
        this.popUpContainerEl.style.display = 'none';
    }

    recordAndMatchLetter(event) {
        if (event.keyCode >= 65 &&
            event.keyCode <= 90) {
            const enteredLetter = event.key;
            if (this.isLetterCorrect(enteredLetter)) {
                if (this.correctLetters && this.correctLetters.includes(enteredLetter)) {
                    this.displayNotification();
                }
                this.correctLetters.push(enteredLetter);
                this.displayCorrectLetters();
            }
            else {
                this.wrongLetters.push(enteredLetter);
                this.renderHangman();
            }
        }
    }

    renderHangman() {
        const errorCount = this.wrongLetters.length;
        this.figurePartEl.forEach((element, index) => {
            if (index < errorCount) {
                element.style.display = 'block';
            }
            else {
                element.style.display = 'none';
            }
        });
        if (errorCount >= this.figurePartEl.length) {
            this.displayLost();
        }
    }

    displayLost() {
        this.finalMsgEl.innerText = 'Unfortunately you lost. 😕';
        this.popUpContainerEl.style.display = 'flex';
    }

    checkAndDisplayIfWon(wordEl) {
        if (wordEl === this.playWord) {
            this.finalMsgEl.innerText = 'Congratulations !! You Won 😃';
            this.popUpContainerEl.style.display = 'flex';
        }
    }

    displayNotification() {
        this.notificationCtr.classList.add('show');
        setTimeout(() => {
            this.notificationCtr.classList.remove('show');
        }, 2000)
    }

    displayCorrectLetters() {
        this.wordEl.innerHTML = `
        ${this.playWord
                .split('')
                .map(letter => `
            <span class="letter">
            ${this.correctLetters.includes(letter) ? letter : ''}
            </span>
            `).join('')
            }`
        const wordEl = this.wordEl.innerText.replace(/\n/g, '');
        this.checkAndDisplayIfWon(wordEl);
    }

    isLetterCorrect(enteredLetter) {
        return this.playWord.includes(enteredLetter)
    }

    chooseRandomWord() {
        const words = ['programming', 'javascript', 'reactjs', 'puppetteer'];
        return words[Math.floor(Math.random() * words.length)];
    }

}

const h = new Hangman()