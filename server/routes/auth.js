const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secretKey = '32412424';

const router = express.Router();
const JWT_SECRET = 'your_jwt_secret_key';

let users = [
  {
    id: 1,
    email: 'admin@example.com',
    password: bcrypt.hashSync('password', 8),
  },
];

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  console.log(req.body)
  const user = users.find(user => user.email == email);
  if (user) {
    const isMatch = bcrypt.compareSync(password, user.password);
    if (isMatch) {
      const token = jwt.sign({ id: user.id, email: user.email }, secretKey, { expiresIn: '1h' });
      return res.status(200).json({ token, status_code: "200" });
    }
  }
  return res.status(401).json({ message: 'Invalid credentials' });
});

router.post('/dashboard', (req, res) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Failed to authenticate token' });
    }
    res.json({ message: 'Welcome to the dashboard!', user: decoded });
  });
});   

module.exports = router;
