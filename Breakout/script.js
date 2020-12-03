class BreakOut {
    constructor() {
        this.rulesBtn = document.querySelector('#rules-btn');
        this.closeBtn = document.querySelector('#close-btn');
        this.rules = document.querySelector('#rules');
        this.canvas = document.querySelector('#canvas');
        this.ctx = canvas.getContext('2d');
        this.score = 0;

        //event listeners
        this.rulesBtn.addEventListener('click', () => {
            this.rules.classList.add('show');
        })
        this.closeBtn.addEventListener('click', () => {
            this.rules.classList.remove('show');
        })

        // Draw items on canvas
        this.drawBall();
        this.drawPaddle();
        this.drawScore();
    }

    get ball() {
        return {
            x: this.canvas.width / 2,
            y: this.canvas.height / 2,
            size: 10,
            speed: 4,
            dx: 4,
            dy: -4
        }
    }

    get paddle() {
        return {
            x: this.canvas.width / 2 - 40,
            y: this.canvas.height - 20,
            w: 80,
            h: 10,
            speed: 8,
            dx: 0
        }
    }

    drawBall() {
        this.ctx.beginPath();
        this.ctx.arc(this.ball.x, this.ball.y, this.ball.size, 0, Math.PI * 2)
        this.ctx.fillStyle = '#0095dd';
        this.ctx.fill();
        this.ctx.closePath();
    }

    drawPaddle() {
        this.ctx.beginPath();
        this.ctx.rect(this.paddle.x, this.paddle.y, this.paddle.w, this.paddle.h);
        this.ctx.fillStyle = '#0095dd';
        this.ctx.fill();
        this.ctx.closePath();
    }

    drawScore() {
        this.ctx.font = "20px Helvetica";
        this.ctx.fillText(`Score: ${this.score}`, this.canvas.width - 100, 30)

    }
}

new BreakOut()