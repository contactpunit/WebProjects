const quoteEl = document.querySelector('#quote');
const button = document.querySelector('button');
const maxLen = 50;
const oldQuotes = [];
button.addEventListener('click', getQuote);
const quoteUrl = 'https://ron-swanson-quotes.herokuapp.com/v2/quotes';
function getQuote() {
    console.log(oldQuotes);
    fetch(quoteUrl)
        .then(response => response.json())
        .then(data => {
            const quote = data[0];
            if (oldQuotes.indexOf(quote) == -1) {
                if (oldQuotes.length >= maxLen) {
                    oldQuotes.shift();
                }
                oldQuotes.push(quote);
            }
            else {
                getQuote();
            }
            quoteEl.textContent = quote;
        })
        .catch(error => {
            console.log(error)
            quoteEl.textContent = 'Something went wrong. Try again !!'
        })
}
getQuote();
