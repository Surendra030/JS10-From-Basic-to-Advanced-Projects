const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let ongoingOperation = '';

function updateDisplay(value) {

    display.innerText = value || '0';
}



function handleInput(value) {

    if (!isNaN(value) || value === '.') {
        if (ongoingOperation.length < 16 || ongoingOperation.includes('.') && value === '.') {
            ongoingOperation += value;

            updateDisplay(ongoingOperation);
        }

    } else if (['+', '%', '-', '*', '/'].includes(value)) {
        if (ongoingOperation && !['+', '-', '*', '/', '%'].includes(ongoingOperation.slice(-1))) {
            ongoingOperation += value;

            updateDisplay(ongoingOperation);
        }
    } else if (value === 'Enter' || value === '=') {
        performCalculation();
    } else if (value === 'Escape' || value === 'C') {
        ongoingOperation = '';

        updateDisplay('0');
    } else if (value === 'Backspace' || value === '⌫') {

        ongoingOperation = ongoingOperation.slice(0, -1);

        updateDisplay(ongoingOperation);
    }


}

buttons.forEach(button => {
    button.addEventListener('click', () => handleInput(button.innerText));
});

document.addEventListener('keydown', (event) => {
    const key = event.key;
    if (!isNaN(key) || ['+', '%', '-', '*', '/', '.', '=', 'Enter', 'Backspace', 'Escape', 'C'].includes(key)) {
        handleInput(key);
        event.preventDefault();
    }
});

function performCalculation() {
    try {
        if (['+', '-', '*', '/', '%'].includes(ongoingOperation.slice(-1))) {
            ongoingOperation = ongoingOperation.slice(0, -1);
        }

        let result = eval(ongoingOperation);

        if (result.toString().length > 10) {
            result = result.toExponential(5);
        }

        ongoingOperation = result.toString();

        updateDisplay(ongoingOperation);
    } catch (error) {
        updateDisplay('Error');
        ongoingOperation = '';
    }
}