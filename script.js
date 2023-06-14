// --- VARIABLES ---
let number1;
let operator;
let number2;
let operatorSet = false;

// Add eventListener to buttons
const buttons = document.querySelectorAll('button');
buttons.forEach((button) => {
    button.addEventListener('click', () => {
        const display = document.getElementById('display');
        const value = button.value;
        if (display.value == "ERROR") {
            reset();
        }

        switch (value) {
            case 'C':
                reset();
                break;

            case '0': case '1': case '2': case '3': case '4': case '5':
            case '6': case '7': case '8': case '9':
                if (display.textContent == "ERROR") {
                    reset();
                    number1 = value;
                    display.textContent = value;
                } else if (number1 != undefined) {
                    if (!operatorSet) {
                        number1 += value;
                        display.textContent += value;
                    } else {
                        if (number2 == undefined) {
                            number2 = value;
                            display.textContent = number2;
                        } else {
                            number2 += value;
                            display.textContent += value;
                        }
                    }
                }  else if (number1 == undefined) {
                    number1 = value;
                    display.textContent = value;
                }
                else if (operatorSet && number2 !== undefined) {
                    number2 += value;
                    display.textContent += value;
                } else if(number2 == undefined && operatorSet) {
                    number2 = value;
                    display.textContent = value;
                }
                
                break;
            case '+': case '-': case 'x': case '/':
                operator = value;
                operatorSet = true;
                break;
            case '=':
                if (number2 == undefined || number1 == undefined) {
                    break;
                }
                if (number1 !== undefined && number2 !== undefined && operatorSet) {

                        // so as to not pass strings as arguments
                        if (floatCheck(number1)) {
                            number1 = parseFloat(number1);
                        } else {
                            number1 = parseInt(number1);
                        }
                        if (floatCheck(number2)) {
                            number2 = parseFloat(number2);
                        } else {
                            number2 = parseInt(number2);
                        }

                        const result = operate(operator, number1, number2);
                        display.textContent = result;

                        result != "ERROR" ? number1 = result : number1 = undefined;
                        number2 = undefined;
                }
                break;
        }
    })
});

// --- OPERATE --- takes an operator and 2 numbers, then calls the appropiate math function
function operate(op, num1, num2) {
    switch(op) {
        case '+':
            return add(num1, num2);
            break;
        case '-':
            return subtract(num1, num2);
            break;
        case 'x':
            return multiply(num1, num2);
            break;
        case '/':
            if (num2 == 0) {
                document.getElementById('display').textContent = "ERROR";
                reset();
                return "ERROR";
            }
            return divide(num1, num2);
            break;
    }
}

// --- BASIC MATH FUNCTIONS ---
function add(a, b) {        // ADD
    if (!floatCheck(a + b)) {
        return a + b;   // no decimals
    } else {
        return (a + b).toFixed(2);
    }
}
function subtract(a, b) {   // SUBTRACT
    if (!floatCheck(a - b)) {
        return a - b;
    } else {
        return (a - b).toFixed(2);
    }
}
function multiply(a, b) {   // MULTIPLY
    if (!floatCheck(a * b)) {
        return a * b;
    } else {
        return (a * b).toFixed(2);
    }
}
function divide(a, b) {     // DIVIDE
    if (!floatCheck(a / b)) {
        return a / b;
    } else {
        return (a / b).toFixed(2);
    }
}

// checks if a value is a float or an integer
function floatCheck(num) {
    if (num % 1 === 0) { // check for a reminder when dividing by 1
        return false;
    } else {
        return true;
    }
}

// resets display and values
function reset() {
    display.textContent = '';
    number1 = undefined;
    number2 = undefined;
    operator = undefined;
    operatorSet = false;
}