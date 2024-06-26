document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const loadReminderButton = document.getElementById('loadReminderButton');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            // Perform login validation here
            if (username === 'admin' && password === 'admin') {
                localStorage.setItem('username', username);
                window.location.href = 'home.html';
            } else {
                alert('Invalid username or password');
            }
        });
    }
    
    if (loadReminderButton) {
        loadReminderButton.addEventListener('click', function() {
            const reminderDiv = document.getElementById('reminder');
            reminderDiv.innerHTML = '<p>This is your reminder!</p>';
        });
    }
});
