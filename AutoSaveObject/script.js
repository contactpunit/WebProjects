const nameEl = document.querySelector('#name');
const addressEl = document.querySelector('#address');
const emailEl = document.querySelector('#email');
const moreEl = document.querySelector('#more');
const button = document.querySelector('button');
const elements = [nameEl, addressEl, emailEl, moreEl];

function getLocalData() {
    const data = localStorage.getItem('FormData');
    return data ? JSON.parse(data) : {};
}

elements.forEach(element => {
    element.addEventListener('input', () => {
        const localData = getLocalData();
        localData[element.name] = element.value;
        localStorage.setItem('FormData', JSON.stringify(localData))
    })
});

window.addEventListener('load', () => {
    const localData = getLocalData();
    if (Object.keys(localData).length > 0) {
        elements.forEach(element => {
            element.value = localData[element.name];
        })
    }
})

button.addEventListener('click', (event) => {
    event.preventDefault();
    localStorage.removeItem('FormData');
    elements.forEach(element => {
        element.value = '';
    })
})