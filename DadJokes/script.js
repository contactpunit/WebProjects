class Jokes {
    constructor() {
        this.url = 'https://icanhazdadjoke.com/';
        this.jokeEl = document.querySelector('.joke');
        this.button = document.querySelector('.btn');
        this.button.addEventListener('click', this.getJoke.bind(this))
    }

    getJoke() {
        fetch(this.url, {
            headers: {
                'Accept': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 200) {
                    this.jokeEl.innerHTML = data.joke
                }
            })
    }
}

new Jokes()