var timerClick = function (selector, { timer, template } = {}) {
    this.elem = document.querySelector(selector);
    this.timer = timer || 60;
    if (!template) return;
    this.template = template;
};

timerClick.prototype.start = function () {
    const button = document.querySelector('button');
    button.addEventListener('click', this.template.bind(this))
}

const t = new timerClick('ul', {
    timer: 10,
    template: function () {
        let counter = this.timer;
        this.elem.innerHTML = '';
        const printValue = window.setInterval(() => {
            let li = document.createElement('li');
            li.appendChild(document.createTextNode(`${counter}`));
            this.elem.appendChild(li);
            counter -= 1;
            if (counter === 0) {
                window.clearInterval(printValue)
            }
        }, 1000)
    }
});

t.start();
