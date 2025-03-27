const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/users', async (req, res) => {
    const users = await db.getUsers();
    res.json(users);
});

app.post('/users', async (req, res) => {
    const { Username } = req.body;
    await db.createUser(Username);
    res.json({ message: "User added successfully!" });
});

app.delete('/users/:userID', async (req, res) => {
    const { userID } = req.params;
    await db.deleteUser(userID);
    res.json({ message: "User deleted successfully!" });
});

app.listen(3000, () => console.log('Server running on port 3000'));
