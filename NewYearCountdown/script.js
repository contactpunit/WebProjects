function NewYear() {
    this.daysEl = document.querySelector('#days');
    this.hoursEl = document.querySelector('#hours');
    this.minutesEl = document.querySelector('#minutes');
    this.secondsEl = document.querySelector('#seconds');
    this.nextYearEl = document.querySelector('.year');
    this.loadingEl = document.querySelector('.loading');
    this.countDownEl = document.querySelector('.countdown');
}

NewYear.prototype.updateDate = function () {
    if (!this.daysEl || !this.hoursEl || !this.minutesEl || !this.secondsEl) return;
    const [nextYear, days, hours, minutes, seconds] = this.calculateTimeElements();
    this.render(nextYear, days, hours, minutes, seconds);

}

NewYear.prototype.calculateTimeElements = function () {
    const currentTime = new Date();
    const currentYear = currentTime.getFullYear();
    const nextYear = currentYear + 1;
    const diff = new Date(`January 01 ${nextYear}`) - currentTime;
    const days = Math.floor(diff / 1000 / 60 / 60 / 24);
    const hours = Math.floor((diff / 1000 / 60 / 60) % 24);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    return [nextYear, days, hours, minutes, seconds];
}

NewYear.prototype.render = function (nextYear, days, hours, minutes, seconds) {
    this.daysEl.innerHTML = days;
    this.hoursEl.innerHTML = hours;
    this.minutesEl.innerHTML = minutes;
    this.secondsEl.innerHTML = seconds;
    this.nextYearEl.innerHTML = nextYear;
}

const n = new NewYear();

setTimeout(() => {
    n.loadingEl.style.display = 'none';
    n.countDownEl.style.display = 'flex';
}, 1000)
setInterval(() => {
    n.updateDate();
}, 1000);
