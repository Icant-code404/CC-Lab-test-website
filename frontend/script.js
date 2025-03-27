const API_URL = 'http://your-ec2-ip:3000/users';

// Fetch and display users
async function getUsers() {
    const response = await fetch(API_URL);
    const users = await response.json();
    document.getElementById('user-list').innerHTML = users.map(user => 
        `<li>${user.UserID} - ${user.Username} <button onclick="deleteUser('${user.UserID}')">Delete</button></li>`).join('');
}

// Create a new user
async function createUser() {
    const username = document.getElementById('username').value;
    await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Username: username })
    });
    getUsers();
}

// Delete a user
async function deleteUser(userID) {
    await fetch(`${API_URL}/${userID}`, { method: 'DELETE' });
    getUsers();
}

getUsers();  // Load users on page load
