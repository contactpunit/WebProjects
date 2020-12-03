const rulesBtn = document.querySelector('#rules-btn');
const closeBtn = document.querySelector('#close-btn');
const rules = document.querySelector('#rules');
const canvas = document.querySelector('#canvas');

rulesBtn.addEventListener('click', () => {
    rules.classList.add('show');
})

closeBtn.addEventListener('click', () => {
    rules.classList.remove('show');
})