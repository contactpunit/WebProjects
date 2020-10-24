const quoteEl = document.querySelector('#quote');
const button = document.querySelector('button');
button.addEventListener('click', getQuote);
window.addEventListener('load', getQuote);
const quoteUrl = 'https://ron-swanson-quotes.herokuapp.com/v2/quotes';
function getQuote() {
    fetch(quoteUrl)
        .then(response => response.json())
        .then(data => {
            const quote = data[0];
            quoteEl.textContent = quote;
        })
        .catch(error => console.log(error))
}
