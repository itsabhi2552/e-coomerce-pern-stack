var isNumber = (string) => /^[1-9]*$/.test(string);
var isUpperCase = (string) => /^[A-Z]*$/.test(string);
var isLowerCase = (string) => /^[a-z]*$/.test(string);

var password_flag = false;
var confirm_password_flag = false;

var submit_btn = document.getElementById('submit');
var password = document.getElementById('password');
var password_msg = document.getElementById('password-msg');
var confirm_password = document.getElementById('confirm-password');

function checkLength(pass) {
    if (pass.length >= 8) {
        return true;
    }
    password_msg.innerText = 'minimum 8 character long';
    return false;
}

function checkNumber(pass) {
    for (let i = 0; i < pass.length; i++) {
        if (isNumber(pass[i])) {
            return true;
        }
    }

    password_msg.innerText = 'One number atleast';
    return false;
}

function checkUppercase(pass) {
    for (let i = 0; i < pass.length; i++) {
        if (isUpperCase(pass[i])) {
            return true;
        }
    }

    password_msg.innerText = 'One uppercase letter atleast';
    return false;
}

function checkLowercase(pass) {
    for (let i = 0; i < pass.length; i++) {
        if (isLowerCase(pass[i])) {
            return true;
        }
    }

    password_msg.innerText = 'One lowercase letter atleast';
    return false;
}

function checkConstraints(pass) {
    return checkLength(pass) && checkNumber(pass) && checkUppercase(pass) && checkLowercase(pass);
}

password.addEventListener('input', () => {
    if (password.value.length !== 0) {
        if (checkConstraints(password.value)) {
            password_flag = true;
            password_msg.innerText = '';
        } else {
            password_flag = false;
        }
    } else {
        password_flag = false;
        password_msg.innerText = '';
    }

    if (password_flag && confirm_password.value === password.value) {
        submit_btn.disabled = false;
    } else {
        if(password_flag && confirm_password.value.length != 0) {
            password_msg.innerText = 'Password do not match';
        }
        submit_btn.disabled = true;
    }
});

confirm_password.addEventListener('input', () => {
    if (confirm_password.value.length !== 0) {
        if (password_flag) {
            if (confirm_password.value === password.value) {
                submit_btn.disabled = false;
                password_msg.innerText = '';
                confirm_password_flag = true;
            } else {
                submit_btn.disabled = true;
                confirm_password_flag = false;
                password_msg.innerText = 'Password do not match';
            }
        }
    } else {
        submit_btn.disabled = true;
        password_msg.innerText = '';
        confirm_password_flag = false;
    }
});