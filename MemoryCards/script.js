class Cards {
    constructor() {
        this.prevBtn = document.getElementById('prev');
        this.nxtBtn = document.getElementById('next');
        this.current = document.getElementById('current');
        this.showBtn = document.getElementById('show');
        this.hideBtn = document.getElementById('hide');
        this.questionEl = document.getElementById('quetion');
        this.answerEl = document.getElementById('answer');
        this.addCardBtn = document.getElementById('add-card');
        this.clearBtn = document.getElementById('clear');
        this.cardsContainer = document.getElementById('cards-container');
        this.allCards = [];
        this.activeCard = 0;
        this.cardData = [
            {
                question: 'What is a programming language?',
                answer: 'A language of set of instructions'
            },
            {
                question: 'what is a variable?',
                answer: 'Variable is place to store data'
            },
            {
                question: 'What are dif types of variables in javascript?',
                answer: 'const, let and var'
            }
        ];
        this.cardData.forEach((element, index) => {
            const card = document.createElement('div');
            card.classList.add('card');
            if (index === 0) {
                card.classList.add('active')
            }
            card.innerHTML = `
                <div class="inner-card">
                    <div class="inner-card-front">
                        <p>
                            ${element.question}
                        </p>
                    </div>
                    <div class="inner-card-back">
                        <p>
                            ${element.answer}
                        </p>
                    </div>
                </div>
            `
            card.addEventListener('click', () => card.classList.toggle('show-answer'))
            this.allCards.push(card);
            this.cardsContainer.appendChild(card);
            this.updateCardNumber();
        });
        this.nxtBtn.addEventListener('click', () => {
            this.allCards[this.activeCard].className = 'card left';
            this.activeCard = this.activeCard + 1;
            if (this.activeCard > this.allCards.length -1) {
                this.activeCard = this.allCards.length -1
            }
            this.allCards[this.activeCard].className = 'card active';
            this.updateCardNumber();
        })
        this.prevBtn.addEventListener('click', () => {
            this.allCards[this.activeCard].className = 'card right';
            this.activeCard = this.activeCard - 1;
            if (this.activeCard < 0) {
                this.activeCard = 0;
            }
            this.allCards[this.activeCard].className = 'card active';
            this.updateCardNumber();
        })
    }

    updateCardNumber() {
        this.current.innerText = `${this.activeCard + 1}/${this.cardData.length}`
    }
}

new Cards();
