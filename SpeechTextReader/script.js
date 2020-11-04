class SpeachReader {
    constructor() {
        this.main = document.querySelector('main');
        this.voicesSelectList = document.querySelector('#voices');
        this.readBtn = document.querySelector('#read');
        this.toggleBtn = document.querySelector('#toggle');
        this.textEl = document.querySelector('#text');
        this.close = document.querySelector('.close');
        this.message = new SpeechSynthesisUtterance();
        this.toggleBtn.addEventListener('click', () => {
            const textbox = document.querySelector('.text-box');
            textbox.classList.toggle('show');
        })
        this.close.addEventListener('click', () => {
            const textbox = document.querySelector('.text-box');
            textbox.classList.remove('show');
        })

        this.data = [
            {
                image: './img/drink.jpg',
                text: "I'm Thirsty"
            },
            {
                image: './img/food.jpg',
                text: "I'm Hungry"
            },
            {
                image: './img/tired.jpg',
                text: "I'm Tired"
            },
            {
                image: './img/hurt.jpg',
                text: "I'm Hurt"
            },
            {
                image: './img/happy.jpg',
                text: "I'm Happy"
            },
            {
                image: './img/angry.jpg',
                text: "I'm Angry"
            },
            {
                image: './img/sad.jpg',
                text: "I'm Sad"
            },
            {
                image: './img/scared.jpg',
                text: "I'm Scared"
            },
            {
                image: './img/outside.jpg',
                text: 'I Want To Go Outside'
            },
            {
                image: './img/home.jpg',
                text: 'I Want To Go Home'
            },
            {
                image: './img/school.jpg',
                text: 'I Want To Go To School'
            },
            {
                image: './img/grandma.jpg',
                text: 'I Want To Go To Grandmas'
            }
        ];
        this.renderImages();
        this.populateVoicesOption();
        speechSynthesis.addEventListener('voiceschanged', this.populateVoicesOption.bind(this));
    }

    populateVoicesOption() {
        const voices = speechSynthesis.getVoices();
        voices.forEach(voice => {
            const option = document.createElement('option');
            option.value = voice.name;
            option.innerText = `${voice.name} ${voice.lang}`
            this.voicesSelectList.appendChild(option);
        })
    }

    renderImages() {
        this.data.forEach(element => {
            const divEl = document.createElement('div');
            const { image, text } = element;
            divEl.classList.add('box');
            divEl.innerHTML = `
                <img src="${image}" alt="${text}" />
                <p class=info>${text}</p>
            `
            divEl.addEventListener('click', () => {
                this.imageOnClickActions(divEl, text);
            })
            this.main.appendChild(divEl)
        })
    }

    imageOnClickActions(divEl, text) {
        divEl.classList.add('active');
        this.message.text = text;
        speechSynthesis.speak(this.message);
        divEl.classList.remove('active');
    }
}

new SpeachReader()