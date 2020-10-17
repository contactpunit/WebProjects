window.addEventListener('click', event => {
    if (event.target.matches('[type=checkbox]')) {
        const targetEl = event.target
        const checkboxId = event.target.getAttribute('id');
        let passwords;
        if (checkboxId === 'show-password') {
            passwords = Array.prototype.slice.call(document.querySelectorAll('#password'));
        }
        else if (checkboxId === 'show-passwords') {
            passwords = Array.prototype.slice.call(document.querySelectorAll('#current-password, #new-password'));
        }
        toggle(passwords, targetEl)
    }

})

function toggle(passwords, targetEl) {
    passwords.forEach(element => {
        if (targetEl.checked) {
            element.type = 'text';
        }
        else {
            element.type = 'password';
        }
    });
}