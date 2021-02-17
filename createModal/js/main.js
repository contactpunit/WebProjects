// Start writing JavaScript here!
const modalopenBtn = document.querySelector('.jsModalButton');
modalopenBtn.addEventListener('click', (e) => {
    document.body.classList.add('modal-is-open');
})

const modalCloseBtn = document.querySelector('.jsModalClose');
modalCloseBtn.addEventListener('click', () => {
    document.body.classList.remove('modal-is-open');
})