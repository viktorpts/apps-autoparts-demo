document.querySelector('#login form').addEventListener('submit', onLogin);

async function onLogin(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const email = formData.get('email');
    const password = formData.get('password');

    const response = await fetch('http://localhost:3030/users/login', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
        const error = await response.json();
        return alert('Error signing in:\n' + error.message);
    }

    const userData = await response.json();

    localStorage.userId = userData._id;
    localStorage.accessToken = userData.accessToken;

    window.location = '/';
}