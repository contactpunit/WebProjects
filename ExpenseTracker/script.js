class ExpenseTracker {
    constructor() {
        this.moneyPlusEl = document.querySelector('#money-plus');
        this.balanceEl = document.querySelector('#balance');
        this.moneyMinusEl = document.querySelector('#money-minus');
        this.list = document.querySelector('#list');
        this.formEl = document.querySelector('#form');
        this.textEl = document.querySelector('#text');
        this.amountEl = document.querySelector('#amount');
        this.addTransBtn = document.querySelector('.btn');
        this.transactions = [];
        this.formEl.addEventListener('submit', this.addTransaction.bind(this));
        this.nextId = 0;
        this.clearInputs();
    }

    clearInputs() {
        this.textEl.value = '';
        this.amountEl.value = '';
    }

    addTransaction(event) {
        event.preventDefault();
        if (!this.textEl.value.trim() || !this.amountEl.value.trim()) {
            alert('Enter values for both transaction text and amount');
        }
        else {
            const transText = this.textEl.value;
            const amount = this.amountEl.value;
            this.nextId = this.nextId + 1;
            const transaction = {
                id: this.nextId,
                text: transText,
                amount: parseInt(amount)
            }
            this.transactions.push(transaction);
            this.addTransactionDom(transaction);
            const results = this.calculateBalance();
            this.renderBalance(results);
        }
    }

    renderBalance(args) {
        const [balance, income, expense] = [...args];
        this.balanceEl.innerText = `$${balance}`;
        this.moneyMinusEl.innerText = `$${expense.toFixed(2)}`
        this.moneyPlusEl.innerText = `$${income.toFixed(2)}`
    }

    calculateBalance() {
        const income = this.transactions
            .filter(transaction => transaction.amount > 0)
            .reduce((acc, item) => (acc += item.amount), 0);

        const expense = this.transactions
            .filter(transaction => transaction.amount < 0)
            .reduce((acc, item) => (acc += item.amount), 0);

        const balance = this.transactions
            .reduce((acc, item) => (acc += item.amount), 0);

        return [balance, income, expense]
    }

    addTransactionDom(transaction) {
        this.textEl.value = '';
        this.amountEl.value = '';
        const sign = transaction.amount < 0 ? '-' : '+';
        const newTransactionEl = document.createElement('li');
        newTransactionEl.classList.add(transaction.amount < 0 ? 'minus' : 'plus')
        newTransactionEl.innerHTML = `
        ${transaction.text} <span>${sign}$${Math.abs(transaction.amount)}</span><button class="delete-btn" onclick="this.removeTransaction(${transaction.id})">x</button>
        `;
        this.list.appendChild(newTransactionEl);
    }

    removeTransaction(transactionId) {
        const filteredTransactions = this.transactions.filter(trans => trans.id !== transactionId);
        console.log(filteredTransactions)
    }

}

const e = new ExpenseTracker()



