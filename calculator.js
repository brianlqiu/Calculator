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
    let intX = parseInt(x);
    let intY = parseInt(y);;
    if(op == '+') {
        return add(intX, intY);
    }
    if(op == '-') {
        return sub(intX, intY);
    }
    if(op == '/') {
        return div(intX, intY);
    }
    if(op == 'x') {
        return mult(intX, intY);
    }
}

function updateDisplay(e) {
    let display = document.getElementById("display");
    if(newNum) {
        let content = document.createElement("p");
        content.classList.add("input");
        content.textContent = e.target.textContent;
        display.appendChild(content);
        newNum = false;
    } else {
        let inputs = Array.from(document.querySelectorAll(".input"));
        let editInput = inputs[inputs.length - 1];
        editInput.textContent += e.target.textContent;

    }
    
}

function updateOperand(e) {
    let display = document.getElementById("display");
    let content = document.createElement("p");
    content.classList.add("operand");
    content.textContent = e.target.textContent;
    display.appendChild(content);
    newNum = true;
}

/*
function getResult(e) {
    let display = document.getElementById("result");
    let operand = document.getElementById("opDisplay").textContent;
    let x = document.getElementById("xDisplay").textContent;
    let y = document.getElementById("yDisplay").textContent;
    display.textContent = operate(operand, x, y);
}

function clear(e) {
    currInput = "xDisplay";
    let tbc = Array.from(document.querySelectorAll(".tbc"));
    tbc.forEach(display => display.textContent = "");
    let op = document.getElementById("opDisplay");
    op.textContent = "+";
}
*/
let newNum = true; //let true if inputs are going to be new numbers
 

let numbers = Array.from(document.querySelectorAll(".num"));
numbers.forEach(num => num.addEventListener("click", updateDisplay));
let ops = Array.from(document.querySelectorAll(".op"));
ops.forEach(op => op.addEventListener("click", updateOperand));
/*document.getElementById("equals").addEventListener("click", getResult);
document.getElementById("clear").addEventListener("click", clear);*/