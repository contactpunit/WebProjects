class Ball {
    constructor(canvas) {
        this.cv = canvas
        this.x = this.cv.canvas.width / 2;
        this.y = this.cv.canvas.height / 2;
        this.size = 10;
        this.speed = 4;
        this.dx = 4;
        this.dy = -4;
    }
}

class Paddle {
    constructor(canvas) {
        this.cv = canvas;
        this.x = this.cv.canvas.width / 2 - 40;
        this.y = this.cv.canvas.height - 20;
        this.w = 80;
        this.h = 10;
        this.speed = 8;
        this.dx = 0
    }

    // movePaddle() {
    //     console.log(this.constructor)
    //     this.x = this.dx;
    //     if (this.x + this.w > this.cv.canvas.width) {
    //         this.x = this.cv.canvas.width - this.w;
    //     }

    //     if (this.x === 0) {
    //         this.x = 0;
    //     }
    // }
}

class Bricks {
    constructor(canvas) {
        this.cv = canvas;
        this.brickRowCount = 9;
        this.brickColumnCount = 5;
        this.w = 70;
        this.h = 20;
        this.padding = 10;
        this.offsetX = 45;
        this.offsetY = 60;
        this.visible = true;
    }
}

class Canvas {
    constructor() {
        this.rulesBtn = document.querySelector('#rules-btn');
        this.closeBtn = document.querySelector('#close-btn');
        this.rules = document.querySelector('#rules');
        this.canvas = document.querySelector('#canvas');
        this.ctx = this.canvas.getContext('2d');
        this.score = 0;
        document.addEventListener('keydown', this.keyDown.bind(this));
        document.addEventListener('keyup', this.keyUp.bind(this));

        //event listeners
        this.rulesBtn.addEventListener('click', () => {
            this.rules.classList.add('show');
        })
        this.closeBtn.addEventListener('click', () => {
            this.rules.classList.remove('show');
        })
    }

    addPaddle(paddle) {
        this.paddle = paddle;
    }

    keyDown(event) {
        if (event.key === 'Right' || event.key === 'ArrowRight') {
            this.paddle.dx = this.paddle.speed;
        }
        else if (event.key === 'Left' || event.key === 'ArrowLeft') {
            this.paddle.dx = -this.paddle.speed;
        }
    }

    keyUp(event) {
        if (event.key === 'Right' || event.key === 'ArrowRight' || event.key === 'Left' || event.key === 'ArrowLeft') {
            this.paddle.dx = 0;
        }
    }

    addBall(ball) {
        this.ball = ball;
    }

    addBricks(bricks) {
        this.bricks = bricks;
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

    drawBricks() {
        const bricksArray = [];
        for (let i = 0; i < this.bricks.brickRowCount; i++) {
            bricksArray[i] = [];
            for (let j = 0; j < this.bricks.brickColumnCount; j++) {
                const x = i * (this.bricks.w + this.bricks.padding) + this.bricks.offsetX;
                const y = j * (this.bricks.h + this.bricks.padding) + this.bricks.offsetY;
                bricksArray[i][j] = { x, y, ...this.bricks }
            }
        }
        bricksArray.forEach(columns => {
            columns.forEach(brick => {
                this.ctx.beginPath();
                this.ctx.rect(brick.x, brick.y, brick.w, brick.h);
                this.ctx.fillStyle = brick.visible ? '#0095dd' : 'transparent';
                this.ctx.fill();
                this.ctx.closePath();
            })
        })
    }

    drawScore() {
        this.ctx.font = "20px Helvetica";
        this.ctx.fillText(`Score: ${this.score}`, this.canvas.width - 100, 30)
    }

    movePaddle() {
        this.paddle.x += this.paddle.dx;
        if (this.paddle.x + this.paddle.w > this.canvas.width) {
            this.paddle.x = this.canvas.width - this.paddle.w;
        }

        if (this.paddle.x < 0) {
            this.paddle.x = 0;
        }
    }

    update() {
        this.movePaddle();

        //All rerendering here
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawBall();
        this.drawPaddle();
        this.drawScore();
        this.drawBricks();
        requestAnimationFrame(this.update.bind(this));
    }
}

const c = new Canvas();
const b = new Ball(c);
const p = new Paddle(c);
const br = new Bricks(c);
c.addBall(b);
c.addPaddle(p);
c.addBricks(br);
c.update();