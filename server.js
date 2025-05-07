const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const USERS_FILE = 'users.json';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// Initialize users file
function readUsers() {
  if (!fs.existsSync(USERS_FILE)) fs.writeFileSync(USERS_FILE, JSON.stringify({}));
  return JSON.parse(fs.readFileSync(USERS_FILE));
}

function saveUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

// Register route
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const users = readUsers();

  if (!username || !password) {
    return res.redirect('/register.html?error=missing');
  }

  if (users[username]) {
    return res.redirect('/register.html?error=exists');
  }

  try {
    const hashed = await bcrypt.hash(password, 10);
    users[username] = hashed;
    saveUsers(users);
    res.redirect('/login.html');
  } catch (err) {
    res.redirect('/register.html?error=server');
  }
});

const session = require('express-session');

app.use(session({
  secret: 'your-secret-key', // choose a strong secret
  resave: false,
  saveUninitialized: false
}));


// Login route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const users = readUsers();

  if (!users[username]) {
    return res.redirect('/login.html?error=invalid');
  }

  try {
    const match = await bcrypt.compare(password, users[username]);
    if (match) {
      req.session.user = username;
      return res.redirect('/index.html');
    } else {
      return res.redirect('/login.html?error=invalid');
    }
  } catch (err) {
    console.error("Login error:", err); // Logs to terminal
    return res.redirect('/login.html?error=server');
  }
});



// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
