const showPassword = document.getElementById('show-password');
const password = document.getElementById('password');

showPassword.addEventListener('change', event => {
    if (password.value) {
        if (event.target.checked) {
            password.type='text';
            console.log('okok')
        }
        else {
            password.type = 'password';
        }
    }
    
});