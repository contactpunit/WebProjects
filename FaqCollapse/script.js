const toggleBtns = document.querySelectorAll('.faq-toggle');
console.log(toggleBtns)
toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const parent = btn.parentNode;
        parent.classList.toggle('active')
    })
})