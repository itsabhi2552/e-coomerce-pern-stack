var password = document.getElementById('password');
var showPassword = document.getElementById('showPassword');

showPassword.addEventListener('click', () => {
    if(password.type === 'text') {
        password.type = 'password';
    } else {
        password.type = 'text';
    }
});