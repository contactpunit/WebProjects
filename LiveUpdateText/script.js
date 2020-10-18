const textEl = document.querySelector('#text');
const span = document.querySelector('span');

textEl.addEventListener('input', () => {
    console.log('hehe')
    span.textContent = textEl.value.length;
})
