class ProgressSteps {
    constructor() {
        this.progress = document.querySelector('.progress');
        this.prev = document.querySelector('#prev');
        this.next = document.querySelector('#next');
        this.circles = Array.prototype.slice.call(document.querySelectorAll('.circle'));
        this.activeCircle = document.querySelector('.circle.active');
        this.currentIndex = 0;
        this.next.addEventListener('click', () => {
            if (this.currentIndex + 2 == this.circles.length) {
                this.currentIndex = this.circles.length - 1;
                this.circles[this.currentIndex].classList.add('active');
                this.prev.disabled = false;
                this.next.disabled = true;
            }
            if (this.currentIndex + 1 >= this.circles.length) {
                this.progress.style.width = (this.currentIndex) / (this.circles.length - 1) * 100 + '%'
                this.currentIndex = this.circles.length - 1;
                return
            };
            this.currentIndex += 1;
            this.prev.disabled = false;
            this.circles[this.currentIndex].classList.add('active');
            this.progress.style.width = (this.currentIndex) / (this.circles.length - 1) * 100 + '%'
        })
        this.prev.addEventListener('click', () => {
            if (this.currentIndex <= 1) {
                this.progress.style.width = (this.currentIndex) / (this.circles.length - 1) * 100 + '%'
                this.prev.disabled = true;
            }
            this.circles[this.currentIndex].classList.remove('active');
            this.currentIndex -= 1;
            this.progress.style.width = (this.currentIndex) / (this.circles.length - 1) * 100 + '%'
            this.next.disabled = false;

        })
    }

}

new ProgressSteps()