const calculator = document.getElementById('calculator-container');
const display = document.getElementById('result');

// Storing of mathematical expression
let expression = "";

// Button click event
calculator.addEventListener('click', event => {
    // Button click value
    const key = event.target.value;

    // Calculate expression if equal sign is pressed
    if (key === "=") 
    {
        // replace symbols with actual arithmetic operators in JavaScript
        expression = expression.replace("÷", "/").replace("x", "*");

        try {
            // Alternative for eval(), since it can inject code
            const result = Function("return " + expression)();

            // Handle division by zero error, which is not possible
            if (result === Infinity) {
                throw new Error();
            }

            // Display result
            display.value = result;
            // Allow continuation of calculation
            expression = String(result);
        }
        catch (e) {
            display.value = "Syntax Error";
            expression = "";
        }
    }
    else if (key === "C") // Clears the display
    {
        expression = "";
        display.value = "";
    }
    else 
    {
        // If the expression starts with not a number, then it is an error. If the input is two consecutive NaN, then it is an error.
        // integer signs is not a feature in this simple calculator
        if ((isNaN(Number(key)) && !expression) || (isNaN(Number(key)) && isNaN(Number(expression.slice(-1))))) 
        {
            display.value = "Syntax Error";
        }
        else // If the key is a valid input, then store and display.
        {
            if (display.value === "Syntax Error")
            {
                display.value = "";
            }
            expression += key;
            display.value = expression;
        }     
    }
});