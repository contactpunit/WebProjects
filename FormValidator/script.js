class FormValidation {
    constructor() {
        this.form = document.getElementById('form');
        this.usernameEl = document.getElementById('username');
        this.emailEl = document.getElementById('email');
        this.passwordEl = document.getElementById('password');
        this.password2El = document.getElementById('password2');
        this.form.addEventListener('submit', this.eventHandler.bind(this));
    }

    eventHandler(event) {
        event.preventDefault();
        const elements = this.form.querySelectorAll('input');
        for (const elem of elements) {
            if (!elem.value || !elem.value.trim()) {
                this.showError(elem, elem.id + ' is required');
            }
            else {
                this.showSuccess(elem);
            }
        }
    }

    showError(input, message) {
        const formControl = input.parentElement;
        formControl.className = 'form-control error';
        const small = formControl.querySelector('small');
        small.innerText = message;
    }

    showSuccess(input) {
        const formControl = input.parentElement;
        formControl.className = 'form-control success';
        // const small = formControl.querySelector('small');
    }

}

new FormValidation()
