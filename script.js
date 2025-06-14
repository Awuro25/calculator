// Calculator functionality

const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');

let currentInput = '';
let operator = '';
let operand = '';
let resultDisplayed = false;

function updateDisplay(value) {
    display.textContent = value;
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (button.classList.contains('number')) {
            if (value === 'C') {
                currentInput = '';
                operator = '';
                operand = '';
                updateDisplay('0');
                resultDisplayed = false;
            } else {
                if (resultDisplayed) {
                    currentInput = '';
                    resultDisplayed = false;
                }
                if (value === '.' && currentInput.includes('.')) return;
                currentInput += value;
                updateDisplay(currentInput);
            }
        } else if (button.classList.contains('symbol')) {
            if (currentInput === '' && value !== '-') return;
            if (operator && operand !== '') {
               
                const tempResult = calculate(Number(operand), Number(currentInput), operator);
                operand = tempResult.toString();
                updateDisplay(operand);
                currentInput = '';
            } else {
                operand = currentInput;
                currentInput = '';
            }
            operator = value;
            resultDisplayed = false;
        } else if (button.classList.contains('symbol1')) {
            if (operator && operand !== '' && currentInput !== '') {
                const tempResult = calculate(Number(operand), Number(currentInput), operator);
                updateDisplay(tempResult);
                currentInput = tempResult.toString();
                operator = '';
                operand = '';
                resultDisplayed = true;
            }
        }
    });
});

function calculate(a, b, op) {
    switch (op) {
        case '+': return a + b;
        case '−': return a - b;
        case '×': return a * b;
        case '÷': return b !== 0 ? a / b : 'Err';
        case '%': return a % b;
        case '^': return Math.pow(a, b);
        default: return b;
    }
}