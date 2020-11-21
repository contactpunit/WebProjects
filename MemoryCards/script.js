class Cards {
    constructor() {
        this.prevBtn = document.getElementById('prev');
        this.nxtBtn = document.getElementById('next');
        this.current = document.getElementById('current');
        this.showBtn = document.getElementById('show');
        this.hideBtn = document.getElementById('hide');
        this.questionEl = document.getElementById('question');
        this.answerEl = document.getElementById('answer');
        this.addCardBtn = document.getElementById('add-card');
        this.addContainer = document.getElementById('add-container');
        this.clearBtn = document.getElementById('clear');
        this.cardsContainer = document.getElementById('cards-container');
        this.allCards = [];
        this.activeCard = 0;
        this.cardData = [];
        this.loadCards();
        this.displayCards();

        this.nxtBtn.addEventListener('click', () => {
            this.allCards[this.activeCard].className = 'card left';
            this.activeCard = this.activeCard + 1;
            if (this.activeCard > this.allCards.length - 1) {
                this.activeCard = this.allCards.length - 1
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

        this.showBtn.addEventListener('click', () => {
            this.addContainer.classList.add('show');
            this.questionEl.value = '';
            this.answerEl.value = '';
        })

        this.hideBtn.addEventListener('click', () => {
            this.addContainer.classList.remove('show');
        })

        this.addCardBtn.addEventListener('click', this.addNewCard.bind(this));
    }

    addNewCard() {
        this.loadCards();
        this.cardData.push({
            question: this.questionEl.value,
            answer: this.answerEl.value
        })
        localStorage.setItem('cards', JSON.stringify(this.cardData));
        this.addContainer.classList.remove('show');
        this.displayCards();
    }

    updateCardNumber() {
        this.current.innerText = `${this.activeCard + 1}/${this.cardData.length}`
    }

    loadCards() {
        const cards = JSON.parse(localStorage.getItem('cards'));
        this.cardData = cards === null ? [] : cards;
    }

    displayCards() {
        this.allCards = [];
        this.activeCard = 0;
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
    }
}

new Cards();
