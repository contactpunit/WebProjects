const boxes = document.querySelectorAll('.box');

window.addEventListener('scroll', () => {
    const triggerHeight = window.innerHeight / 4 * 3;
    boxes.forEach(box => {
        const boxTop = box.getBoundingClientRect().top;
        if (boxTop < triggerHeight) {
            box.classList.add('show');
        }
        else {
            box.classList.remove('show');
        }
    })
})