const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const passwordConfirmation = document.getElementById('password-confirmation');
const modal = document.getElementById('modal');
const closeModal = modal.querySelector('.close');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    checkInputs();
});

function checkInputs() {
    const usernameValue = username.value;
    const emailValue = email.value;
    const passwordValue = password.value;
    const passwordConfirmationValue = passwordConfirmation.value;

    if (usernameValue === '') {
        setErrorFor(username, 'Username requeired');
    } else {
        setSuccessFor(username);
    }

    if (emailValue === '') {
        setErrorFor(email, 'Email required');
    } else if (!checkEmail(emailValue)) {
        setErrorFor(email, 'Type a valid email.');
    } else {
        setSuccessFor(email);
    }

    if (passwordValue === '') {
        setErrorFor(password, 'Password required.');
    } else if (passwordValue.length < 7) {
        setErrorFor(password, 'The password must be at least 7 characters long');
    } else {
        setSuccessFor(password);
    }

    if (passwordConfirmationValue === '') {
        setErrorFor(passwordConfirmation, 'Password confirmation is required.');
    } else if (passwordConfirmationValue !== passwordValue) {
        setErrorFor(passwordConfirmationValue, 'The passwords do not match');
    } else {
        setSuccessFor(passwordConfirmation);
    }

    const formControls = form.querySelectorAll('.form-control');
    const formIsValid = [...formControls].every((formControl) => {
        return formControl.classList.contains('success');
    });

    if (formIsValid) {
        showModal();
    }
}

function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');

    small.innerText = message;
    formControl.className = 'form-control error';
}

function setSuccessFor(input) {
    const formControl = input.parentElement;

    formControl.className = 'form-control success';
}

function showModal() {
    modal.style.display = 'block';
}

closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

function checkEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    );
}