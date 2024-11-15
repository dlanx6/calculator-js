const buttons = document.getElementById('buttons');
const display = document.getElementById('result');

// Storing of mathematical expression
let expression = "";

// Button click event
buttons.addEventListener('click', event => {
    // Button click value
    const key = event.target.value;

    // Calculate expression if equal sign is pressed
    if (key === "=" && expression) 
    {
        // replace symbols with actual arithmetic operators in JavaScript
        expression = expression.replaceAll("÷", "/").replaceAll("x", "*");
        
        // Calculate string as a mathematical expression
        const result = Function("return " + expression)();

        // Handle division by zero error, which is not possible
        if (result === Infinity) {
            console.log("1");
            display.value = "Syntax Error";
            expression = "";
        }

        // Display result
        display.value = result;
        // Allow continuation of calculation
        expression = String(result);   
    }
    else if (key === "C") // Clears the display
    {
        expression = "";
        display.value = "";
    }
    else 
    {
        // If the expression starts with not a number, then it is an error. If the input is two consecutive NaN, then it is an error.
        // integer signs for calculation is not a feature in this simple calculator, but results can still be negative.
        if ((isNaN(Number(key)) && !expression) || (isNaN(Number(key)) && isNaN(Number(expression.slice(-1))))) 
        {
            console.log("2");
            display.value = "Syntax Error";
        }
        else // If the key is a valid input, then store and display.
        {
            if (display.value === "Syntax Error")
            {
                display.value = "";
                expression = "";
            }
            expression += key;
            display.value = expression;
        }     
    }
});