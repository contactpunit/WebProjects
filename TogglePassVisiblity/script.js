
// const passwords = document.querySelectorAll('#current-password, #new-password');
// const toggle = document.querySelector('#show-passwords');

// toggle.addEventListener('click', event => {
//     if (toggle.checked) {
//         passwords.forEach(element => {
//             element.type = 'password';
//         })
//     }
//     else {
//         passwords.forEach(element => {
//             element.type = 'text';
//         })
//     }
// })

const passwords = document.querySelectorAll('#current-password, #new-password');
const toggle = document.querySelector('#show-passwords');

toggle.addEventListener('click', event => {
    passwords.forEach(element => {
        if (toggle.checked) {
            element.type = 'text';
        }
        else {
            element.type = 'password';
        }
    })
})
