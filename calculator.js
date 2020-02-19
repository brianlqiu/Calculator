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