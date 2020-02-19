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
    if(op == '+') {
        add(x, y);
    }
    if(op == '-') {
        sub(x, y);
    }
    if(op == '/') {
        div(x, y);
    }
    if(op == '*') {
        mult(x, y);
    }
}

function updateDisplay(e) {
    let display = document.getElementById(currInput);
    if(display.textContent == "0") {
        display.textContent = e.target.textContent;
    } else {
        display.textContent += e.target.textContent;
    }
}

function updateOperand(e) {
    currInput = "yDisplay";
    let display = document.getElementById("opDisplay");
    display.textContent = e.target.textContent;
}

let currInput = "xDisplay"; 

let numbers = Array.from(document.querySelectorAll(".num"));
numbers.forEach(num => num.addEventListener("click", updateDisplay));
let ops = Array.from(document.querySelectorAll(".op"));
ops.forEach(op => op.addEventListener("click", updateOperand));