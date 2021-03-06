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
    if (op == '*') {
        return mult(x, y);
    }
}

function updateDisplay(e) {
    if(displayingResult) {
        clear();
    }
    let display = document.getElementById("display");
    let input = "";
    if(e.type == "keyup") {
        input = e.key;
    } else {
        input = e.target.textContent;
    }
    console.log(e);
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
    if(displayingResult) {
        clear();
    }
    let display = document.getElementById("display");
    let displayNodes = Array.from(display.childNodes);
    if(displayNodes.length == 0) {
        alert("Invalid input: Cannot start equation with an operand");
        return;
    }
    if(displayNodes[displayNodes.length - 1].getAttribute("class") == "operand") {
        alert("Invalid input: Cannot have two operands following each other");
        return;
    }
    let content = document.createElement("p");
    content.classList.add("operand");
    let input = "";
    console.log(e);
    if(e.type == "keyup") {
        input = e.key;
    } else {
        input = e.target.textContent;
    }
    console.log(input);
    content.textContent = input;
    display.appendChild(content);
    newNum = true;
    decExists = false;
}


function getResult(e) {
    if (newNum) {
        alert("Invalid input: Equation cannot end on an operand");
        return;
    }
    if(displayingResult) {
        clear();
        return;
    }
    let display = document.getElementById("display");
    let inputs = Array.from(document.querySelectorAll(".input"));
    if(inputs.length < 2) {
        alert("Invalid input: Equation cannot only have one number");
        return;
    }
    let operands = Array.from(document.querySelectorAll(".operand"));
    if(operands.length == 0) {
        alert("Invalid input: Equation needs at least 1 operand");
        return;
    }
    let result = parseFloat(inputs[0].textContent);
    for (let i = 0; i < operands.length && !divideByZero; i++) {
        result = operate(operands[i].textContent, result, parseFloat(inputs[i + 1].textContent));
    }
    if (!divideByZero) {
        let resultDisplay = document.createElement("p");
        resultDisplay.textContent = " = " + result;
        display.appendChild(resultDisplay);
        displayingResult = true;
    } else {
        clear();
    }
}

function clear() {
    newNum = true;
    decExists = false;
    divideByZero = false;
    displayingResult = false;
    let display = document.getElementById("display");
    display.innerHTML = "";
}

function remove() {
    let display = document.getElementById("display");
    let displayNodes = Array.from(display.childNodes);
    let lastNode = displayNodes[displayNodes.length - 1];
    if(newNum || lastNode.textContent.length <= 1) {
        display.removeChild(lastNode);
    } else {
        lastNode.textContent = lastNode.textContent.substr(0, lastNode.textContent.length - 1);
    }
}

function keyboardControls(e) {
    const numberRegex = /[.0-9]/;
    const operatorRegex = /[\+\-\*\/]/;
    console.log(e.key.match(operatorRegex));
    if(e.key.match(numberRegex)) {
        updateDisplay(e);
    } else if(e.key.match(operatorRegex)) {
        updateOperand(e);
    } else if(e.key == "Enter") {
        getResult(e);
    } else if(e.key == "Backspace") {
        remove();
    } else if(e.key == "Escape") {
        clear();
    }
    
}

let newNum = true; //let true if inputs are going to be new numbers
let decExists = false;
let divideByZero = false;
let displayingResult = false;

let numbers = Array.from(document.querySelectorAll(".num"));
numbers.forEach(num => num.addEventListener("click", updateDisplay));
let ops = Array.from(document.querySelectorAll(".op"));
ops.forEach(op => op.addEventListener("click", updateOperand));
document.getElementById("equals").addEventListener("click", getResult);
document.getElementById("clear").addEventListener("click", clear);
document.getElementById("period").addEventListener("click", updateDisplay);
document.getElementById("back").addEventListener("click", remove);

document.addEventListener("keyup", keyboardControls);