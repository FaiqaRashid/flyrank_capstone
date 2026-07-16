'use strict';

const {
  validateFullName,
  validateEmail,
  validatePassword,
  validateConfirmPassword,
  validateTerms,
} = require('./signup.js');

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (!condition) {
    failed += 1;
    console.error('FAIL:', message);
    return;
  }

  passed += 1;
  console.log('PASS:', message);
}

function assertInvalid(result, expectedMessage) {
  assert(result.valid === false, `expected invalid: ${expectedMessage}`);
  assert(result.message === expectedMessage, `message is "${result.message}"`);
}

function assertValid(result) {
  assert(result.valid === true, 'expected valid result');
  assert(result.message === '', 'expected empty message');
}

console.log('\n--- Full name validation ---\n');

assertInvalid(validateFullName(''), 'Full name is required.');
assertInvalid(validateFullName('   '), 'Full name is required.');
assertInvalid(validateFullName('A'), 'Full name must be at least 2 characters.');
assertInvalid(validateFullName('John123'), 'Full name may only contain letters and spaces.');
assertInvalid(validateFullName('J0hn'), 'Full name may only contain letters and spaces.');
assertValid(validateFullName('Jo'));
assertValid(validateFullName('  Jane Doe  '));

console.log('\n--- Email validation ---\n');

assertInvalid(validateEmail(''), 'Email is required.');
assertInvalid(validateEmail('   '), 'Email is required.');
assertInvalid(validateEmail('notanemail'), 'Please enter a valid email address.');
assertInvalid(validateEmail('user@'), 'Please enter a valid email address.');
assertInvalid(validateEmail('user@domain'), 'Please enter a valid email address.');
assertInvalid(validateEmail('user@domain.'), 'Please enter a valid email address.');
assertValid(validateEmail('user@domain.com'));
assertValid(validateEmail('  user@domain.com  '));

console.log('\n--- Password validation ---\n');

assertInvalid(validatePassword(''), 'Password is required.');
assertInvalid(validatePassword('Short1'), 'Password must be at least 8 characters.');
assertInvalid(validatePassword('password1'), 'Password must contain at least one uppercase letter.');
assertInvalid(validatePassword('PASSWORD1'), 'Password must contain at least one lowercase letter.');
assertInvalid(validatePassword('Password'), 'Password must contain at least one number.');
assertValid(validatePassword('Password1'));

console.log('\n--- Confirm password validation ---\n');

assertInvalid(validateConfirmPassword('Password1', ''), 'Please confirm your password.');
assertInvalid(validateConfirmPassword('Password1', 'Password2'), 'Passwords do not match.');
assertValid(validateConfirmPassword('Password1', 'Password1'));

console.log('\n--- Terms validation ---\n');

assertInvalid(validateTerms(false), 'You must accept the terms and conditions.');
assertValid(validateTerms(true));

console.log(`\n--- Results: ${passed} passed, ${failed} failed ---\n`);

if (failed > 0) {
  process.exit(1);
}
