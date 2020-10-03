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
        let pass1 = '';
        const elements = this.form.querySelectorAll('input');

        for (const elem of elements) {
            if (!elem.value || !elem.value.trim()) {
                this.showError(elem, elem.id + ' is required');
            }
            else {
                this.showSuccess(elem);
            }
            if (elem.id === 'email' && elem.value) {
                if (!this.validateEmail(elem)) {
                    this.showError(elem, 'email format is not valid');
                }
            }
            else if (elem.id === 'password' && elem.value) {
                pass1 = elem;
                if (!elem.value || elem.value.length < 5) {
                    this.showError(elem, 'password length should be atleat 5 characters');
                }
            }
            else if (elem.id === 'password2' && elem.value) {
                // pass2 = elem;
                if (pass1.value !== elem.value) {
                    this.showError(elem, 'passwords dont match');
                }
            }
        }
    }

    validateEmail(input) {
        const email = input.value;
        const re = /^\S+\@\S+\.\S+$/;
        return re.test((email).toString().toLowerCase());
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
    }

}

new FormValidation()
