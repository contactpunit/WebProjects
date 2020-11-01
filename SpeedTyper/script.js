class SpeedTyping {
    constructor() {
        this.word = document.querySelector('#word');
        this.text = document.querySelector('#text')
        this.time = document.querySelector('#time');
        this.score = document.querySelector('#score');
        this.endGameEl = document.querySelector('.end-game-container')
        this.settingsBtn = document.querySelector('.settings-btn')
        this.settingsForm = document.querySelector('#settings-form')
        this.settings = document.querySelector('#settings');
        this.difficultySelect = document.querySelector('#difficulty');
        this.difficultyMap = { easy: 10, medium: 5, hard: 1 };
        this.generateAndupdateWord();
        this.scoreValue = 0;
        this.timeCounter = 10;
        this.time.innerHTML = this.timeCounter + 's';
        this.difficulty = localStorage.getItem('difficulty') ? localStorage.getItem('difficulty') : this.difficultySelect.value;
        this.text.addEventListener('input', this.matchTypedWord.bind(this));
        setInterval(this.runClock.bind(this), 1000);
        this.settingsBtn.addEventListener('click', () => {
            this.settings.classList.toggle('hide');
        })
        this.settingsForm.addEventListener('change', this.setDifficulty.bind(this))
    }

    setDifficulty() {
        this.difficulty = this.difficultySelect.value;
        localStorage.setItem('difficulty', this.difficulty);
    }

    clearInput() {
        this.text.value = '';
    }

    generateAndupdateWord() {
        this.randomWord = this.createRandomWord(5);
        this.word.innerHTML = this.randomWord;
        this.clearInput();
        this.text.focus();
    }

    runClock() {
        this.timeCounter -= 1;
        this.time.innerHTML = this.timeCounter + 's';
        if (this.timeCounter === 0) {
            this.gameOver();
        }
    }

    gameOver() {
        this.endGameEl.innerHTML = `
            <h1> Time ran out </h1>
            <p>Your final score is ${this.scoreValue} </p>
            <button onclick="window.location.reload()">Reload</button>
        `;
        this.endGameEl.style.display = 'flex';
    }

    matchTypedWord(event) {
        const inputWord = event.target.value;
        if (inputWord === this.randomWord) {
            this.scoreValue += 1;
            this.score.innerHTML = this.scoreValue;
            this.generateAndupdateWord();
            this.increaseTime();
        }
    }

    increaseTime() {
        this.timeCounter += this.difficultyMap[this.difficulty];
    }

    createRandomWord(length) {
        var consonants = 'bcdfghjklmnpqrstvwxyz',
            vowels = 'aeiou',
            rand = function (limit) {
                return Math.floor(Math.random() * limit);
            },
            i, word = '', length = parseInt(length, 10),
            consonants = consonants.split(''),
            vowels = vowels.split('');
        for (i = 0; i < length / 2; i++) {
            var randConsonant = consonants[rand(consonants.length)],
                randVowel = vowels[rand(vowels.length)];
            word += (i === 0) ? randConsonant.toUpperCase() : randConsonant;
            word += i * 2 < length - 1 ? randVowel : '';
        }
        return word.toLocaleLowerCase();
    }
}

new SpeedTyping();



