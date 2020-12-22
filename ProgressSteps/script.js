class ProgressSteps {
    constructor() {
        this.progress = document.querySelector('.progress');
        this.prev = document.querySelector('#prev');
        this.next = document.querySelector('#next');
        this.circles = Array.prototype.slice.call(document.querySelectorAll('.circle'));
        this.activeCircle = document.querySelector('.circle.active');
        this.next.addEventListener('click', () => {
            this.currentIndex = this.circles.indexOf(document.querySelector('.circle.active'));
            if (this.currentIndex + 1 >= this.circles.length) return;
            this.circles[this.currentIndex].classList.remove('active')
            this.circles[this.currentIndex + 1].classList.add('active');
            this.prev.disabled = false;
            if (this.currentIndex + 2 >= this.circles.length) {
                this.currentIndex = this.circles.length - 1;
                this.next.disabled = true;
                return;
            }
            this.currentIndex += 1;
        })
        this.prev.addEventListener('click', () => {
            this.currentIndex = this.circles.indexOf(document.querySelector('.circle.active'));
            if (this.currentIndex === 0) return;
            this.circles[this.currentIndex].classList.remove('active');
            this.circles[this.currentIndex - 1].classList.add('active');
            this.next.disabled = false;
            if (this.currentIndex == 1) {
                this.prev.disabled = true;
                return
            }
            this.currentIndex -= 1;
        })
    }

}

new ProgressSteps()