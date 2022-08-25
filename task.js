const signinBtn = document.getElementById('signin__btn'); // кнопка войти
const welcomeBlock = document.getElementById('welcome');
const userId = document.getElementById('user_id');
const xhr = new XMLHttpRequest(); 
const exit = document.getElementById('exit');

if (document.cookie) {
    const pairs = document.cookie.split('; ');
    const cookie = pairs.find(p => p.startsWith('userId='));
    welcomeBlock.classList.add('welcome_active');
    userId.textContent = cookie.substring('userId='.length);
}

signinBtn.onclick = function () {
    const formData = new FormData (document.forms[0]);

    xhr.open('POST', 'https://netology-slow-rest.herokuapp.com/auth.php');
    xhr.send(formData);

    xhr.onload = () => {
        let responseServer = JSON.parse(xhr.response);

        Object.entries(responseServer).forEach(([key, value]) => {
            if (value === true) {
                welcomeBlock.classList.add('welcome_active');
            } else if (key === 'user_id') {
                userId.textContent = value;
                document.cookie = `userId=${encodeURIComponent(value)}`;

                deleteValue();
            } else {
                alert('Неверный логин или пароль');
                deleteValue();
            }
        })
    };
}

document.forms[0].addEventListener('submit', (e) => {
    e.preventDefault();
})

function deleteValue () { // удаление значений из полей ввода
    document.querySelectorAll('.control').forEach((node) => node.value = '')
}

exit.onclick = function () { // удаление куки
    const pairs = document.cookie.split('; ');
    let cookie = pairs.find(p => p.startsWith('userId='));
    document.cookie = cookie + '; expires=Thu, 01 Jan 1970 00:00:00 GMT'
    welcomeBlock.classList.remove('welcome_active');
}