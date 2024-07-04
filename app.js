document.addEventListener('DOMContentLoaded', async function() {
    const signupForm = document.getElementById('signupForm');
    const loginForm = document.getElementById('loginForm');
    const calendarDiv = document.getElementById('calendar');
    if (signupForm) {
        signupForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission

            // Get form data
            const formData = new FormData(signupForm);
            const username = formData.get('username');
            const password = formData.get('password');

            // Save data to localStorage
            localStorage.setItem('username', username);
            localStorage.setItem('password', password);

            // Optionally, you can redirect or show a success message
            alert('Signed up successfully!');
            window.location.replace('home.html');

            // Clear the form fields
            signupForm.reset();
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission

            // Get form data
            const formData = new FormData(loginForm);
            const username = formData.get('username');
            const password = formData.get('password');

            // Retrieve stored data from localStorage
            const storedUsername = localStorage.getItem('username');
            const storedPassword = localStorage.getItem('password');

            // Validate credentials
            if (username === storedUsername && password === storedPassword) {
                alert('Login successful!');
                // Redirect to home.html
                window.location.replace('home.html');
            } else {
                alert('Invalid username or password.');
            }

            // Clear the form fields
            loginForm.reset();
        });
    }

    try {
        // Fetch events from backend
        const response = await fetch('api/events');
        if (!response.ok) {
            throw new Error('Failed to retrieve events');
        }
        const events = await response.json();

        // Display events in calendarDiv
        events.forEach(event => {
            const eventDiv = document.createElement('div');
            eventDiv.classList.add('event');
            eventDiv.textContent = `${event.name} (Date: ${new Date(event.date).toLocaleString()})`;
            calendarDiv.appendChild(eventDiv);
        });
    } catch (error) {
        console.error('Error fetching events:', error);
        calendarDiv.textContent = 'Failed to retrieve events';
    }
});
