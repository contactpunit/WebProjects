const container = document.getElementById('container');
const para = document.getElementById('text');
const totalTime = 7500;
const breatheTime = (totalTime / 5) * 2;
const holdTime = totalTime / 5;

function breathAnimation() {
    para.innerText = 'Breathe In!'
    container.classList.remove('shrink')
    container.classList.add('grow')
    setTimeout(() => {
        para.innerText = 'Hold!'
        setTimeout(() => {
            para.innerText = 'Breathe Out!'
            container.classList.remove('grow')
            container.classList.add('shrink')
        }, holdTime)
    }, breatheTime)
}

setInterval(breathAnimation, totalTime)

breathAnimation()