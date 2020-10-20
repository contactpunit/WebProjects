class Quotes {
    constructor() {
        this.quoteContainerEl = document.querySelector('#quote-container');
        this.quoteEl = document.querySelector('#quote');
        this.authorEl = document.querySelector('#author');
        this.twitterBtn = document.querySelector('#twitter');
        this.newQuoteBtn = document.querySelector('#new-quote');
        this.loader = document.querySelector('#loader');
        this.newQuoteBtn.addEventListener('click', this.generateQuote.bind(this));
        this.quoteUrl = 'https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
        this.proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        this.connectUrl = this.proxyUrl + this.quoteUrl;
        this.loader.hidden = true;
        this.attempts = 0;
        this.maxRetryAttempts = 3;
    }

    loadModal() {
        if (this.loader.hidden) {
            this.loader.hidden = false;
            this.quoteContainerEl.hidden = true;
        }
    }

    hideModal() {
        if (!this.loader.hidden) {
            this.loader.hidden = true;
            this.quoteContainerEl.hidden = false;
        }
    }

    async generateQuote() {
        try {
            this.loadModal();
            const response = await fetch(this.connectUrl);
            const data = await response.json();
            if (!data.quoteAuthor) {
                this.authorEl.innerText = 'Unknown';
            } else {
                this.authorEl.innerText = data.quoteAuthor;
            }
            if (data.quoteText.length > 120) {
                this.quoteEl.classList.add('long-quote');
            } else {
                this.quoteEl.classList.remove('long-quote');
            }
            this.quoteEl.innerText = data.quoteText;
            this.hideModal();
        }
        catch (err) {
            console.log('problem getting  quote: ' + err)
            if (this.attempts >= this.maxRetryAttempts) {
                this.quoteEl.innerText = "Sorry couldnot retrieve new quota. Please try again later !!"
            }
            else {
                this.attempts += 1;
                this.generateQuote();
            }

        }
    }
}

const n = new Quotes();
n.generateQuote();
