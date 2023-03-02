const form = document.querySelector('#investmentForm');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const investmentOption = document.querySelector('input[name="investmentOption"]:checked').value;
  const investmentAmount = parseInt(document.querySelector('#amount').value);
  
  let investmentReturn;
  switch (investmentOption) {
    case 'option1':
      investmentReturn = investmentAmount * 0.05;
      break;
    case 'option2':
      investmentReturn = investmentAmount * 0.07;
      break;
    case 'option3':
      investmentReturn = investmentAmount * 0.1;
      break;
    default:
      investmentReturn = 0;
  }
  
  const result = `Your investment return is $${investmentReturn.toFixed(2)}.`;
  alert(result);
});
