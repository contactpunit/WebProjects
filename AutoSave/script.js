const nameEl = document.querySelector('#name');
const addressEl = document.querySelector('#address');
const emailEl = document.querySelector('#email');
const moreEl = document.querySelector('#more');
const button = document.querySelector('button');
const elements = [nameEl, addressEl, emailEl, moreEl];

elements.forEach(element => {
    element.addEventListener('input', () => {
        localStorage.setItem(element.name, element.value)
    })
});

window.addEventListener('load', () => {
    elements.forEach(element => {
        element.value = localStorage.getItem(element.name) || '';
    })
})
button.addEventListener('click', (event) => {
    event.preventDefault();
    elements.forEach(element => {
        localStorage.removeItem(element.name);
        element.value = '';
    })
})