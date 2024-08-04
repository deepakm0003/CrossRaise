const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files from the "public" directory

// In-memory store for users (Replace with a database in production)
const users = [];

// Middleware to authenticate JWT tokens
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, 'your_jwt_secret', (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

// Sign Up Endpoint
app.post('/signup', (req, res) => {
    const { name, email, mobile, password, role } = req.body;

    // Check if user already exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    // Hash the password
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Save the new user
    users.push({ name, email, mobile, password: hashedPassword, role });

    res.status(201).json({ message: 'User registered successfully' });
});

// Sign In Endpoint
app.post('/signin', (req, res) => {
    const { email, password } = req.body;

    // Find the user
    const user = users.find(user => user.email === email);
    if (!user) return res.status(401).json({ message: 'Invalid email or password' });

    // Check the password
    if (!bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate a JWT token
    const token = jwt.sign({ email: user.email, role: user.role }, 'your_jwt_secret', { expiresIn: '1h' });

    res.json({ message: 'Sign-in successful', token });
});

// Example of a protected route
app.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: 'This is a protected route', user: req.user });
});

app.listen(port, () => {
    console.log('Server running at http://localhost:3000');
});