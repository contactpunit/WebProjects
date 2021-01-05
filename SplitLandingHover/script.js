const container = document.querySelector('.container');
const splitLeft = document.querySelector('.left');
const splitRight = document.querySelector('.right');

splitLeft.addEventListener('mouseenter', () => {
    container.classList.add('hover-left');
    container.classList.remove('hover-right');
})

splitRight.addEventListener('mouseenter', () => {
    container.classList.add('hover-right');
    container.classList.remove('hover-left');
})

// [splitLeft, splitRight].forEach(element => {
//     element.addEventListener('mouseleave', () => {
//         container.classList.remove('hover-left');
//         container.classList.remove('hover-right');
//         console.log(container.classList)
//     })
// });

splitLeft.addEventListener('mouseleave', () => {
    container.classList.remove('hover-left')
})

splitRight.addEventListener('mouseleave', () => {
    container.classList.remove('hover-right')
})