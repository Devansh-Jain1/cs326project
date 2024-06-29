document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signupForm');
    const loginForm = document.getElementById('loginForm');
    const uploadForm = document.getElementById('uploadForm');
    const logoutButton = document.getElementById('logout');
    const usernameDisplay = document.getElementById('usernameDisplay');

    if (signupForm) {
        signupForm.addEventListener('submit', async event => {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            try {
                const response = await fetch('/auth/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username, password })
                });
                const result = await response.json();
                if (response.ok) {
                    alert('Signup successful! Please log in.');
                    window.location.href = 'login.html';
                } else {
                    alert('Signup failed: ' + result.message);
                }
            } catch (error) {
                alert('Signup failed. Please try again later.');
            }
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', async event => {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            try {
                const response = await fetch('/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username, password })
                });
                const result = await response.json();
                if (response.ok) {
                    localStorage.setItem('username', username);
                    window.location.href = 'dashboard.html';
                } else {
                    alert('Login failed: ' + result.message);
                }
            } catch (error) {
                alert('Login failed. Please try again later.');
            }
        });
    }

    if (usernameDisplay) {
        const username = localStorage.getItem('username');
        if (username) {
            usernameDisplay.textContent = username;
        } else {
            window.location.href = 'login.html';
        }
    }

    if (uploadForm) {
        uploadForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const fileInput = document.getElementById('fileInput');
            const file = fileInput.files[0];
            if (!file) {
                alert('Please select a file.');
                return;
            }

            const formData = new FormData();
            formData.append('file', file);

            try {
                const response = await fetch('/upload', {
                    method: 'POST',
                    body: formData
                });
                const result = await response.json();
                if (response.ok) {
                    alert('File uploaded successfully.');
                } else {
                    alert('File upload failed: ' + result.message);
                }
            } catch (error) {
                alert('File upload failed. Please try again later.');
            }
        });
    }

    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            localStorage.removeItem('username');
            window.location.href = 'login.html';
        });
    }
});
