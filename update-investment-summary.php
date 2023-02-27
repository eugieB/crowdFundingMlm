// Import required modules
const express = require('express');
const mysql = require('mysql');

// Initialize the express application
const app = express();

// Set up a connection to the mySQL database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'mlm_savings_club'
});

// Connect to the database
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('mySQL database connected');
});

// Set up middleware to parse incoming requests
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Handle member registration
app.post('/register', (req, res) => {
  // Extract the registration form data from the request body
  const { name, email, password } = req.body;

  // Insert the new member into the database
  const sql = 'INSERT INTO members (name, email, password) VALUES (?, ?, ?)';
  db.query(sql, [name, email, password], (err, result) => {
    if (err) {
      throw err;
    }
    console.log(`New member with ID ${result.insertId} registered`);
    res.redirect('/login');
  });
});

// Handle member login
app.post('/login', (req, res) => {
  // Extract the login form data from the request body
  const { email, password } = req.body;

  // Check if the member exists in the database
  const sql = 'SELECT * FROM members WHERE email = ? AND password = ?';
  db.query(sql, [email, password], (err, result) => {
    if (err) {
      throw err;
    }
    if (result.length > 0) {
      console.log(`Member with ID ${result[0].id} logged in`);
      req.session.userId = result[0].id;
      res.redirect('/dashboard');
    } else {
      res.redirect('/login?error=1');
    }
  });
});

// Handle contribution payments
app.post('/contribute', (req, res) => {
  // Extract the contribution amount from the request body
  const { amount } = req.body;

  // Update the member's account balance in the database
  const sql = 'UPDATE members SET balance = balance + ? WHERE id = ?';
  db.query(sql, [amount, req.session.userId], (err, result) => {
    if (err) {
      throw err;
    }
    console.log(`Member with ID ${req.session.userId} contributed ${amount}`);
    res.redirect('/dashboard');
  });
});

// Handle investment options
app.get('/invest/:option', (req, res) => {
  // Extract the selected investment option from the request parameters
  const { option } = req.params;

  // Calculate the projected returns for the selected option
  let returns = 0;
  if (option === 'option1') {
    returns = 1000;
  } else if (option === 'option2') {
    returns = 2000;
  } else if (option === 'option3') {
    returns = 3000;
  }

  // Update the member's investment summary in the database
const sql = 'UPDATE members SET investment_option = ?, projected_returns = ? WHERE id = ?';
db.query(sql, [option, returns, req.session.userId], (err, result) => {
  if (err) throw err;
  // Redirect to the dashboard with a success message
  req.flash('success_msg', 'Your investment selection has been updated successfully.');
  res.redirect('/dashboard');
});

    
