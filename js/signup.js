'use strict';

function validateFullName(value) {
  const trimmed = value.trim();

  if (!trimmed) {
    return { valid: false, message: 'Full name is required.' };
  }

  if (trimmed.length < 2) {
    return { valid: false, message: 'Full name must be at least 2 characters.' };
  }

  if (!/^[A-Za-z\s]+$/.test(trimmed)) {
    return { valid: false, message: 'Full name may only contain letters and spaces.' };
  }

  return { valid: true, message: '' };
}

function validateEmail(value) {
  const trimmed = value.trim();

  if (!trimmed) {
    return { valid: false, message: 'Email is required.' };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
    return { valid: false, message: 'Please enter a valid email address.' };
  }

  return { valid: true, message: '' };
}

function validatePassword(value) {
  if (!value) {
    return { valid: false, message: 'Password is required.' };
  }

  if (value.length < 8) {
    return { valid: false, message: 'Password must be at least 8 characters.' };
  }

  if (!/[A-Z]/.test(value)) {
    return { valid: false, message: 'Password must contain at least one uppercase letter.' };
  }

  if (!/[a-z]/.test(value)) {
    return { valid: false, message: 'Password must contain at least one lowercase letter.' };
  }

  if (!/[0-9]/.test(value)) {
    return { valid: false, message: 'Password must contain at least one number.' };
  }

  return { valid: true, message: '' };
}

function validateConfirmPassword(password, confirmPassword) {
  if (!confirmPassword) {
    return { valid: false, message: 'Please confirm your password.' };
  }

  if (confirmPassword !== password) {
    return { valid: false, message: 'Passwords do not match.' };
  }

  return { valid: true, message: '' };
}

function validateTerms(checked) {
  if (!checked) {
    return { valid: false, message: 'You must accept the terms and conditions.' };
  }

  return { valid: true, message: '' };
}

function setFieldState(input, errorEl, result) {
  if (result.valid) {
    input.setAttribute('aria-invalid', 'false');
    input.classList.remove('field-error');
    errorEl.textContent = '';
  } else {
    input.setAttribute('aria-invalid', 'true');
    input.classList.add('field-error');
    errorEl.textContent = result.message;
  }

  return result.valid;
}

function initSignupForm() {
  const form = document.getElementById('signup-form');
  const successEl = document.getElementById('form-success');

  const elements = {
    fullNameInput: document.getElementById('full-name'),
    emailInput: document.getElementById('email'),
    passwordInput: document.getElementById('password'),
    confirmPasswordInput: document.getElementById('confirm-password'),
    termsInput: document.getElementById('terms'),
  };

  const fieldMap = {
    fullName: {
      input: elements.fullNameInput,
      error: document.getElementById('full-name-error'),
      validate: () => validateFullName(elements.fullNameInput.value),
    },
    email: {
      input: elements.emailInput,
      error: document.getElementById('email-error'),
      validate: () => validateEmail(elements.emailInput.value),
    },
    password: {
      input: elements.passwordInput,
      error: document.getElementById('password-error'),
      validate: () => validatePassword(elements.passwordInput.value),
    },
    confirmPassword: {
      input: elements.confirmPasswordInput,
      error: document.getElementById('confirm-password-error'),
      validate: () =>
        validateConfirmPassword(
          elements.passwordInput.value,
          elements.confirmPasswordInput.value
        ),
    },
    terms: {
      input: elements.termsInput,
      error: document.getElementById('terms-error'),
      validate: () => validateTerms(elements.termsInput.checked),
    },
  };

  const fieldOrder = ['fullName', 'email', 'password', 'confirmPassword', 'terms'];

  function validateField(fieldKey) {
    const field = fieldMap[fieldKey];
    return setFieldState(field.input, field.error, field.validate());
  }

  function validateAllFields() {
    const results = {};
    let allValid = true;

    for (const fieldKey of fieldOrder) {
      results[fieldKey] = validateField(fieldKey);
      if (!results[fieldKey]) {
        allValid = false;
      }
    }

    return { allValid, results };
  }

  function focusFirstInvalid(results) {
    for (const fieldKey of fieldOrder) {
      if (!results[fieldKey]) {
        fieldMap[fieldKey].input.focus();
        break;
      }
    }
  }

  function hideSuccessMessage() {
    successEl.textContent = '';
    successEl.hidden = true;
  }

  function showSuccessMessage(message) {
    successEl.textContent = message;
    successEl.hidden = false;
  }

  function resetFieldStates() {
    fieldOrder.forEach((fieldKey) => {
      const { input, error } = fieldMap[fieldKey];
      input.setAttribute('aria-invalid', 'false');
      input.classList.remove('field-error');
      error.textContent = '';
    });
  }

  fieldOrder.forEach((fieldKey) => {
    const { input } = fieldMap[fieldKey];

    input.addEventListener('blur', () => {
      validateField(fieldKey);
    });

    input.addEventListener('input', () => {
      hideSuccessMessage();

      if (input.getAttribute('aria-invalid') === 'true') {
        validateField(fieldKey);
      }

      if (fieldKey === 'password' && elements.confirmPasswordInput.value) {
        validateField('confirmPassword');
      }
    });

    if (input.type === 'checkbox') {
      input.addEventListener('change', () => {
        hideSuccessMessage();
        validateField(fieldKey);
      });
    }
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    hideSuccessMessage();

    const { allValid, results } = validateAllFields();

    if (!allValid) {
      focusFirstInvalid(results);
      return;
    }

    showSuccessMessage('Account created successfully! Welcome to FlyRank.');
    form.reset();
    resetFieldStates();
  });
}

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', initSignupForm);
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    validateFullName,
    validateEmail,
    validatePassword,
    validateConfirmPassword,
    validateTerms,
  };
}
