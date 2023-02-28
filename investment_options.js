const investmentForm = document.getElementById('investmentForm');

investmentForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Get the selected investment option
  const option = document.querySelector('input[name="investmentOption"]:checked').value;

  // Get the investment amount
  const amount = parseInt(document.getElementById('amount').value);

  // Validate the amount
  if (amount <= 0) {
    alert('Please enter a valid investment amount.');
    return;
  }

  // Calculate the projected returns based on the selected option
  let returns;
  switch (option) {
    case 'option1':
      returns = amount * 0.05;
      break;
    case 'option2':
      returns = amount * 0.07;
      break;
    case 'option3':
      returns = amount * 0.1;
      break;
    default:
      alert('Please select an investment option.');
      return;
  }

  // Display the projected returns to the user
  alert(`Projected returns: R${returns.toFixed(2)}`);

  // Update the member's investment summary in the database
  const sql = 'UPDATE members SET investment_option = ?, projected_returns = ? WHERE id = ?';
  db.query(sql, [option, returns, req.session.userId], (err, result) => {
    if (err) throw err;
    console.log(`Investment option updated for member ${req.session.userId}.`);
  });
});
