const getTypeOrName = function (field) {
    if (field.id.length > 0) {
        return field.id;
    }
    if (field.name.length > 0) {
        return field.name;
    }
    return null;
};

function loadHandler() {
    const FormData = localStorage.getItem('FormData') ? JSON.parse(localStorage.getItem('FormData')) : {};
    const elems = document.querySelectorAll('#save-me input, #save-me textarea, #save-me input[type=checkbox]');
    if (Object.keys(FormData).length > 0) {
        Array.prototype.slice.call(elems).forEach(element => {
            if (getTypeOrName(element)) {
                if (element.type === 'checkbox' || element.type === 'radio') {
                    element.checked = FormData[getTypeOrName(element)]
                }
                else {
                    element.value = FormData[getTypeOrName(element)]
                }
            }
        });
    }
}

function inputHandler(event) {
    if (!event.target.closest('#save-me')) return;
    if (!getTypeOrName(event.target)) return;
    const FormData = localStorage.getItem('FormData') ? JSON.parse(localStorage.getItem('FormData')) : {};
    if (event.target.type === 'checkbox' || event.target.type === 'radio') {
        FormData[getTypeOrName(event.target)] = event.target.checked;
    }
    else {
        FormData[getTypeOrName(event.target)] = event.target.value;
    }
    localStorage.setItem('FormData', JSON.stringify(FormData))
}

window.addEventListener('load', loadHandler);
document.addEventListener('input', inputHandler)

const button = document.querySelector('button');
button.addEventListener('click', (event) => {
    event.preventDefault();
    localStorage.removeItem('FormData');
})