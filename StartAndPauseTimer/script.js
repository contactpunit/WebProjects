var timerClick = function (selector, { timer, ...remaining } = {}) {
    this.elem = document.querySelector(selector);
    this.startBtn = document.querySelector('.start');
    this.restartBtn = document.querySelector('.restart');
    this.timer = timer || 60;
    this.counter = this.timer;
    this.state = 'start';
    this.intervalHandle = '';
    this.startBtn.addEventListener('click', this.start.bind(this));
    this.restartBtn.addEventListener('click', this.restart.bind(this));
};

timerClick.prototype.restart = function () {
    this.elem.innerHTML = '';
    this.clear();
    this.counter = this.timer;
};

timerClick.prototype.start = function () {
    if (this.counter <= 0) return;
    if (this.counter === this.timer && this.counter !== 0) {
        this.render('start', 'Pause');
        this.elem.innerHTML = '';
        this.setExpiryInterval();
    }
    else {
        if (this.state === 'start') {
            this.render('pause', 'Start');
            window.clearInterval(this.intervalHandle);
        }
        else if (this.state === 'pause') {
            this.render('start', 'Pause');
            this.setExpiryInterval();
        }
    }

}

timerClick.prototype.setExpiryInterval = function () {
    this.intervalHandle = window.setInterval(() => {
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(`${this.counter}`));
        this.elem.appendChild(li);
        this.counter -= 1;
        if (this.counter === 0) {
            this.clear();
        }
    }, 1000);
}

timerClick.prototype.render = function (state, innerText) {
    this.state = state;
    this.startBtn.innerText = innerText;
}

timerClick.prototype.clear = function () {
    window.clearInterval(this.intervalHandle);
    this.startBtn.innerText = 'Start';
    this.state = 'start';
}

const t = new timerClick('ul', {
    timer: 4
});