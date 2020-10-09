class ExchangeRate {
    constructor() {
        this.endpoint = 'https://api.exchangerate-api.com/v4/latest';
        this.selectOneEl = document.getElementById('country-one');
        this.selectTwoEl = document.getElementById('country-two');
        this.rateEl = document.getElementById('rate');
        this.amountOneEl = document.getElementById('amount-one');
        this.amountTwoEl = document.getElementById('amount-two');
        this.swapButtonEl = document.getElementById('swap');
        this.selectOneEl.addEventListener('change', this.calculateRate.bind(this));
        this.selectTwoEl.addEventListener('change', this.calculateRate.bind(this));
        this.amountOneEl.addEventListener('input', this.calculateRate.bind(this));
        this.amountTwoEl.addEventListener('input', this.calculateRate.bind(this));
        this.swapButtonEl.addEventListener('click', this.swapElements.bind(this));
        this.calculateRate();
    }

    calculateRate() {
        const currencyOne = this.selectOneEl.value;
        const currencyTwo = this.selectTwoEl.value;
        fetch(`${this.endpoint}/${currencyOne}`)
            .then(response => response.json())
            .then(rate => {
                const convertedRate = rate.rates[currencyTwo];
                this.rateEl.innerText = `1 ${currencyOne} = ${convertedRate} ${currencyTwo}`
                this.amountTwoEl.value = (this.amountOneEl.value * convertedRate).toFixed(2);
            })
    }

    swapElements() {
        const temp = this.selectOneEl.value;
        this.selectOneEl.value = this.selectTwoEl.value;
        this.selectTwoEl.value = temp;
        this.calculateRate();
    }
}

new ExchangeRate();