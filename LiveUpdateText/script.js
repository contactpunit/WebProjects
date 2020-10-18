const textEl = document.querySelector('#text');
const span = document.querySelector('span');

textEl.addEventListener('input', () => {
    span.textContent = textEl.value.length;
})
