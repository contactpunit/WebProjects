class ArrayMethods {
    constructor() {
        this.users = [];
        this.main = document.getElementById('main');
        this.AddUserEl = document.getElementById('add-user');
        this.doubleEl = document.getElementById('double');
        this.showMillionairesEl = document.getElementById('show-millionaires');
        this.sortEl = document.getElementById('sort');
        this.calculateWealthEl = document.getElementById('calculate-wealth');
        this.AddUserEl.addEventListener('click', this.addUser.bind(this));
        this.doubleEl.addEventListener('click', this.doubleMoney.bind(this));
        this.showMillionairesEl.addEventListener('click', this.showMillionaires.bind(this));
        this.sortEl.addEventListener('click', this.sortByRichest.bind(this));
        this.calculateWealthEl.addEventListener('click', this.entireWealth.bind(this));
    }

    async addUser() {
        const res = await fetch('https://randomuser.me/api');
        const data = await res.json();
        const userInfo = data.results[0];
        let user = {
            name: `${userInfo.name.first} ${userInfo.name.last}`,
            money: Math.floor(Math.random() * 100000)
        }
        this.users.push(user);
        this.updateDOM();
    }

    updateDOM() {
        this.main.innerHTML = '<h2><strong>Person</strong>Wealth</h2>';
        this.users.forEach(user => {
            this.createAndAppendChild(user);
        });
    }

    createAndAppendChild(reqUser) {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${reqUser.name}
                    </strong>$${this.formatMoney(reqUser.money)}`;
        this.main.appendChild(element);
    }

    formatMoney(money) {
        return (money).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
    }

    doubleMoney() {
        if (this.users) {
            this.users = this.users.map(user => {
                return { name: user.name, money: +user.money * 2 };
            });
            this.updateDOM()
        }
    }

    showMillionaires() {
        this.users = this.users.filter(user => user.money > 100000);
        this.updateDOM();
    }

    sortByRichest() {
        this.users.sort((a, b) => b.money - a.money);
        this.updateDOM();
    }

    entireWealth() {
        const result = this.users.reduce((prev, user) => (prev + user.money), 0);
        const wealthEl = document.createElement('div');
        wealthEl.classList.add('person');
        wealthEl.innerHTML = `<h3>Total Wealth:<strong>$${this.formatMoney(result)}</strong></h3>`;
        this.main.appendChild(wealthEl)
    }
}

const c = new ArrayMethods();