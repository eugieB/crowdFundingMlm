// Function to toggle the mobile navigation menu
function toggleMenu() {
  var menu = document.getElementById("mobile-nav");
  if (menu.style.display === "block") {
    menu.style.display = "none";
  } else {
    menu.style.display = "block";
  }
}

// Function to validate the registration form
function validateRegistrationForm() {
  var name = document.forms["registration-form"]["name"].value;
  var email = document.forms["registration-form"]["email"].value;
  var password = document.forms["registration-form"]["password"].value;
  var confirm_password = document.forms["registration-form"]["confirm_password"].value;

  if (name == "") {
    alert("Please enter your name");
    return false;
  }
  if (email == "") {
    alert("Please enter your email");
    return false;
  }
  if (password == "") {
    alert("Please enter a password");
    return false;
  }
  if (confirm_password == "") {
    alert("Please confirm your password");
    return false;
  }
  if (password != confirm_password) {
    alert("Passwords do not match");
    return false;
  }
}

// Function to handle contribution payments
function makeContribution() {
  var amount = document.getElementById("contribution-amount").value;
  // Send the amount to the server for processing
  // Redirect to a confirmation page after successful processing
}

// Function to handle investment options
function selectInvestmentOption(option) {
  // Highlight the selected option and display additional information
  // Update the investment summary with the selected option and projected returns
}

// Function to handle user login
function login() {
  var email = document.getElementById("login-email").value;
  var password = document.getElementById("login-password").value;
  // Send the email and password to the server for authentication
  // Redirect to the user dashboard after successful login
}

// Function to handle user logout
function logout() {
  // Remove any user-specific data from the session
  // Redirect to the homepage
}
