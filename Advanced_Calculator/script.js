const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let clearOnNextInput = false; // Flag to clear display after pressing '='

// Function to safely append the clicked button's value to the display
function appendToDisplay(value) {
    if (display.value === 'Error' || clearOnNextInput) {
        display.value = '';
        clearOnNextInput = false;
    }
    display.value += value;
}

// Function to clear the display
function clearDisplay() {
    display.value = '';
    clearOnNextInput = false;
}

// Function to remove the last character (DEL)
function backspace() {
    if (clearOnNextInput) {
        clearDisplay();
    } else {
        display.value = display.value.slice(0, -1);
    }
}

// Function to calculate the result
function calculate() {
    let expression = display.value;
    // Replace 'x' with '*' for math.js, and ^ with ** for power
    expression = expression.replace(/x/g, '*'); 

    try {
        // Use math.evaluate from math.js for robust calculation
        // It handles functions like sin(), cos(), log(), and operator precedence
        let result = math.evaluate(expression);

        // Check for invalid results (e.g., division by zero, non-finite)
        if (isNaN(result) || !isFinite(result)) {
            display.value = 'Error';
        } else {
            // Display the result, limit decimal places for cleanliness
            // Convert back to String
            display.value = Number(result.toFixed(10)).toString();
            clearOnNextInput = true; // Flag to clear on next number input
        }
    } catch (e) {
        // Handle syntax errors (e.g., unmatched parenthesis, invalid function call)
        display.value = 'Error';
        clearOnNextInput = true;
    }
}

// Attach event listeners to all buttons
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');

        if (button.classList.contains('clear')) {
            clearDisplay();
        } else if (button.classList.contains('backspace')) {
            backspace();
        } else if (button.classList.contains('equal-btn')) {
            calculate();
        } else if (value) {
            // Append the data-value for all number/operator/function buttons
            appendToDisplay(value);
        }
    });
});