const textEl = document.querySelector('#text');
const wordCount = document.querySelector('#word-count');
const charCount = document.querySelector('#character-count');

textEl.addEventListener('input', () => {
    charCount.textContent = textEl.value.length;
    wordCount.textContent = textEl.value.split(' ').length;
})
