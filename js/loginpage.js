// Create a function to handle the login form submission
function loginFormHandler(event) {
    // Prevent the default form submission behavior
    event.preventDefault();
    // Get the username and password from the form
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    // Create a JSON object with the login credentials
    const loginCredentials = {
    username,
    password,
    };
    // Send the login credentials to the backend using a POST request
    fetch('/login', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(loginCredentials),
    })
    .then((response) => {
      // Check the response status code
    if (response.status === 200) {
        // The login was successful, so redirect the user to the dashboard
        window.location.href = '/dashboard';
    } else {
        // The login failed, so display an error message
        alert('Invalid username or password.');
    }
    })
    .catch((error) => {
      // An error occurred, so display an error message
    alert('An error occurred while logging in.');
    });
}
  // Add an event listener to the login form
document.getElementById('login-form').addEventListener('submit', loginFormHandler);
