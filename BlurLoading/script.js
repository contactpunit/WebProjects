class BulrLoad {
    constructor() {
        this.loadText = document.querySelector('.loading-text');
        console.log(this.loadText.innerText)
        this.imgClass = document.querySelector('.bg');
        this.loadValue = 0;
        this.interval = setInterval(this.renderPercent.bind(this), 40);
    }

    renderPercent() {
        this.loadText.innerText = `${this.loadValue}%`
        this.loadValue += 1;
        this.loadText.style.opacity = BulrLoad.scale(this.loadValue, 0, 100, 1, 0);
        this.imgClass.style.filter = `blur(${BulrLoad.scale(this.loadValue, 0, 100, 30, 0)}px)`;
        if (this.loadValue > 100) {
            clearInterval(this.interval);
        }
    }

    static scale(num, in_min, in_max, out_min, out_max) {
        return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
    }
}

new BulrLoad()