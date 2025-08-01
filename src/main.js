import './style.css';

const form = document.getElementById('myForm');
const fields = ['email', 'country', 'postal', 'password', 'confirmPassword'];
const errorMessages = {
  email: 'Please enter a valid email.',
  country: 'Country name must be English letters.',
  postal: 'Postal code must be 5 digits.',
  password: 'Password must be at least 6 characters.',
  confirmPassword: 'Passwords do not match.',
};

function validateField(id) {
  const input = document.getElementById(id);
  const error = document.getElementById(id + 'Error');
  let message = '';

  if (input.validity.valueMissing) {
    message = errorMessages[id];
  } else if (id === 'postal' && input.validity.patternMismatch) {
    message = errorMessages[id];
  } else if (id === 'email' && input.validity.typeMismatch) {
    message = errorMessages[id];
  } else if (id === 'country' && input.validity.patternMismatch) {
    message = errorMessages[id];
  } else if (id === 'password' && input.validity.tooShort) {
    message = errorMessages[id];
  } else if (id === 'confirmPassword') {
    const pw = document.getElementById('password').value;
    if (input.value !== pw) {
      message = errorMessages[id];
    }
  }

  input.setCustomValidity(message);
  error.textContent = message;
}

fields.forEach((id) => {
  const input = document.getElementById(id);
  // input.addEventListener('input', () => validateField(id));
  input.addEventListener('blur', () => validateField(id));
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  let hasError = false;

  fields.forEach((id) => {
    validateField(id);
    const input = document.getElementById(id);
    // checkValidity() 包含原生驗證與自訂錯誤的所有錯誤判斷。
    if (!input.checkValidity()) {
      hasError = true;
    }
  });

  const successMessage = document.getElementById('successMessage');
  if (!hasError) {
    successMessage.textContent = 'High five! 🙌 Form looks good!';
    form.reset();
    fields.forEach(
      (id) => (document.getElementById(id + 'Error').textContent = '')
    );
  } else {
    successMessage.textContent = '';
  }
});
