#!/usr/bin/env node

/**
 * Node.js CLI Calculator Application
 * 
 * Supported Operations:
 * - Addition (+)
 * - Subtraction (-)
 * - Multiplication (*)
 * - Division (/)
 */

const readline = require('readline');

// Create interface for user input/output
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Store the current calculation state
let currentValue = 0;
let previousValue = 0;
let operation = null;
let shouldResetDisplay = false;

/**
 * Perform arithmetic operation
 * @param {number} prev - Previous value
 * @param {number} current - Current value
 * @param {string} op - Operation (+, -, *, /)
 * @returns {number|null} Result of the operation, or null if division by zero
 */
function calculate(prev, current, op) {
  switch (op) {
    case '+':
      return prev + current;
    case '-':
      return prev - current;
    case '*':
      return prev * current;
    case '/':
      if (current === 0) {
        return null;
      }
      return prev / current;
    default:
      return current;
  }
}

/**
 * Display the calculator menu and handle user input
 */
function showCalculator() {
  console.clear();
  console.log('╔════════════════════════════════╗');
  console.log('║     Node.js CLI Calculator     ║');
  console.log('╚════════════════════════════════╝\n');
  console.log(`Display: ${currentValue}\n`);
  console.log('Operations:');
  console.log('  [+] Addition');
  console.log('  [-] Subtraction');
  console.log('  [*] Multiplication');
  console.log('  [/] Division');
  console.log('  [c] Clear');
  console.log('  [q] Quit\n');

  rl.question('Enter a number or operation: ', (input) => {
    const trimmed = input.toLowerCase().trim();

    if (trimmed === 'q') {
      console.log('Goodbye!');
      rl.close();
      return;
    }

    if (trimmed === 'c') {
      currentValue = 0;
      previousValue = 0;
      operation = null;
      shouldResetDisplay = false;
      showCalculator();
      return;
    }

    if (trimmed === '+' || trimmed === '-' || trimmed === '*' || trimmed === '/') {
      if (operation && !shouldResetDisplay) {
        currentValue = calculate(previousValue, currentValue, operation);
      }
      previousValue = currentValue;
      operation = trimmed;
      shouldResetDisplay = true;
      showCalculator();
      return;
    }

    const num = parseFloat(trimmed);
    if (!isNaN(num)) {
      if (shouldResetDisplay) {
        currentValue = num;
        shouldResetDisplay = false;
      } else {
        currentValue = num;
      }
      showCalculator();
      return;
    }

    if (trimmed === '=') {
      if (operation) {
        currentValue = calculate(previousValue, currentValue, operation);
        operation = null;
        shouldResetDisplay = true;
      }
      showCalculator();
      return;
    }

    console.log('Invalid input. Please try again.');
    showCalculator();
  });
}

// Start the calculator (only in CLI mode, not during tests)
if (require.main === module) {
  showCalculator();
}

// Export for testing
module.exports = { calculate };
