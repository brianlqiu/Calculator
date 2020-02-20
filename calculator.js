function add(x, y) {
    return x + y;
}

function sub(x, y) {
    return x - y;
}

function div(x, y) {
    return x / y;
}

function mult(x, y) {
    return x * y;
}

function operate(op, x, y) {
    if (op == '+') {
        return add(x, y);
    }
    if (op == '-') {
        return sub(x, y);
    }
    if (op == '/') {
        if (y == 0) {
            alert("Invalid input: Cannot divide by 0");
            divideByZero = true;
        }
        return div(x, y);
    }
    if (op == 'x') {
        return mult(x, y);
    }
}

function updateDisplay(e) {
    let display = document.getElementById("display");
    let input = e.target.textContent;
    if(input == "." && decExists) {
        alert("Invalid input: Number cannot have more than one decimal point");
        return;
    } else {
        if (newNum) {
            let content = document.createElement("p");
            content.classList.add("input");
            content.textContent = input;
            display.appendChild(content);
            newNum = false;
        } else {
            let inputs = Array.from(document.querySelectorAll(".input"));
            let editInput = inputs[inputs.length - 1];
            editInput.textContent += input;
    
        }
        if(input == ".") {
            decExists = true;
        }
    }

}

function updateOperand(e) {
    let display = document.getElementById("display");
    let content = document.createElement("p");
    content.classList.add("operand");
    content.textContent = e.target.textContent;
    display.appendChild(content);
    newNum = true;
    decExists = false;
}


function getResult(e) {
    if (newNum) {
        alert("Invalid input: Equation cannot end on an operand");
        clear()
    }
    let display = document.getElementById("display");
    let inputs = Array.from(document.querySelectorAll(".input"));
    let operands = Array.from(document.querySelectorAll(".operand"));
    let result = parseFloat(inputs[0].textContent);
    for (let i = 0; i < operands.length && !divideByZero; i++) {
        result = operate(operands[i].textContent, result, parseFloat(inputs[i + 1].textContent));
    }
    if (!divideByZero) {
        let resultDisplay = document.createElement("p");
        resultDisplay.textContent = " = " + result;
        display.appendChild(resultDisplay);
    } else {
        clear();
    }
}

function clear() {
    newNum = true;
    decExists = false;
    divideByZero = false;
    let display = document.getElementById("display");
    display.innerHTML = "";
}


let newNum = true; //let true if inputs are going to be new numbers
let decExists = false;
let divideByZero = false;

let numbers = Array.from(document.querySelectorAll(".num"));
numbers.forEach(num => num.addEventListener("click", updateDisplay));
let ops = Array.from(document.querySelectorAll(".op"));
ops.forEach(op => op.addEventListener("click", updateOperand));
document.getElementById("equals").addEventListener("click", getResult);
document.getElementById("clear").addEventListener("click", clear);
document.getElementById("period").addEventListener("click", updateDisplay);