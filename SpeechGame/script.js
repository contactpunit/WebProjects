class SpeachGame {
    constructor() {
        this.resultEl = document.querySelector('.msg');
        this.randomNum = Math.floor(Math.random() * 100) + 1;
        console.log(this.randomNum);
        window.SpeechRecognition =
            window.SpeechRecognition || window.webkitSpeechRecognition;
        this.recognition = new window.SpeechRecognition();
        const self = this;
        this.recognition.addEventListener('result', () => {
            this.onSpeak.call(this, self);
        });
        this.recognition.addEventListener('end', this.restart);
    }

    restart = () => {
        this.recognition.start();
    }

    renderSpokenText = (message) => {
        this.resultEl.innerHTML = `
            <div>You said: </div>
            <span class="box">${message}</span>
        `;
    }

    onSpeak(self) {
        const message = event.results[0][0].transcript;
        this.renderSpokenText(message)
        this.validateText(message, self)
    }

    validateText(message, self) {
        if (Number.isNaN(+message)) {
            this.renderSpokenText(`${message}`);
            this.resultEl.innerHTML += '<div>is not a Number</div>';
        }
        else if (+message < 1 || +message > 100) {
            this.renderSpokenText(`${message}`);
            this.resultEl.innerHTML += '<div>Number should be in between 1 and 100</div>';
        }
        else if (+message > this.randomNum) {
            this.renderSpokenText(`${message}`);
            this.resultEl.innerHTML += '<div>is greater than input</div>';
        }
        else if (+message < this.randomNum) {
            this.renderSpokenText(`${message}`);
            this.resultEl.innerHTML += '<div>is less than input</div>'
        }
        else {
            this.renderSpokenText(`${message}`);
            document.body.innerHTML = `<h2>Congrats you have won the game!! <br><br>
                <button class="play-again" id="play-again">Play Again</button>`
            self.recognition.removeEventListener('end', this.restart);
            document.body.addEventListener('click', (event) => {
                if (event.target.id === 'play-again') {
                    window.location.reload();
                }
            })

        }
    }
}


const c = new SpeachGame();
c.recognition.start();