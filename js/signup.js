/**
 * Signup form — client-side validation and submission handling.
 */

const form = document.getElementById("signup-form");
const successMessage = document.getElementById("success-message");
const submitBtn = document.getElementById("submit-btn");

const fields = {
  fullName: {
    input: document.getElementById("full-name"),
    error: document.getElementById("full-name-error"),
    validate: validateFullName,
  },
  email: {
    input: document.getElementById("email"),
    error: document.getElementById("email-error"),
    validate: validateEmail,
  },
  password: {
    input: document.getElementById("password"),
    error: document.getElementById("password-error"),
    validate: validatePassword,
  },
  confirmPassword: {
    input: document.getElementById("confirm-password"),
    error: document.getElementById("confirm-password-error"),
    validate: validateConfirmPassword,
  },
  terms: {
    input: document.getElementById("terms"),
    error: document.getElementById("terms-error"),
    validate: validateTerms,
  },
};

function validateFullName(value) {
  const trimmed = value.trim();
  if (!trimmed) return "Full name is required.";
  if (trimmed.length < 2) return "Name must be at least 2 characters.";
  return "";
}

function validateEmail(value) {
  const trimmed = value.trim();
  if (!trimmed) return "Email is required.";
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(trimmed)) return "Enter a valid email address.";
  return "";
}

function validatePassword(value) {
  if (!value) return "Password is required.";
  if (value.length < 8) return "Password must be at least 8 characters.";
  if (!/[a-zA-Z]/.test(value)) return "Password must include at least one letter.";
  if (!/\d/.test(value)) return "Password must include at least one number.";
  return "";
}

function validateConfirmPassword(value) {
  const password = fields.password.input.value;
  if (!value) return "Please confirm your password.";
  if (value !== password) return "Passwords do not match.";
  return "";
}

function validateTerms(checked) {
  if (!checked) return "You must accept the terms to continue.";
  return "";
}

function setFieldError(field, message) {
  field.input.setAttribute("aria-invalid", message ? "true" : "false");
  field.error.textContent = message;
}

function validateField(key) {
  const field = fields[key];
  const value = field.input.type === "checkbox" ? field.input.checked : field.input.value;
  const message = field.validate(value);
  setFieldError(field, message);
  return !message;
}

function validateForm() {
  return Object.keys(fields).every(validateField);
}

function setupPasswordToggles() {
  document.querySelectorAll(".password-toggle").forEach((button) => {
    button.addEventListener("click", () => {
      const input = document.getElementById(button.dataset.target);
      const isHidden = input.type === "password";
      input.type = isHidden ? "text" : "password";
      button.textContent = isHidden ? "Hide" : "Show";
      button.setAttribute("aria-label", isHidden ? "Hide password" : "Show password");
    });
  });
}

function setupLiveValidation() {
  Object.keys(fields).forEach((key) => {
    const field = fields[key];
    const eventType = field.input.type === "checkbox" ? "change" : "input";

    field.input.addEventListener(eventType, () => {
      if (field.error.textContent || field.input.getAttribute("aria-invalid") === "true") {
        validateField(key);
      }

      if (key === "password" && fields.confirmPassword.input.value) {
        validateField("confirmPassword");
      }
    });

    field.input.addEventListener("blur", () => validateField(key));
  });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  successMessage.classList.remove("is-visible");

  if (!validateForm()) {
    const firstInvalid = Object.keys(fields).find((key) => !validateField(key));
    fields[firstInvalid].input.focus();
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = "Creating account…";

  // Simulate async signup — replace with real API call later
  setTimeout(() => {
    successMessage.classList.add("is-visible");
    form.reset();
    Object.values(fields).forEach((field) => setFieldError(field, ""));

    submitBtn.disabled = false;
    submitBtn.textContent = "Create account";
  }, 800);
});

setupPasswordToggles();
setupLiveValidation();
