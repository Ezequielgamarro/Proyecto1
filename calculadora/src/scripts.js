console.log("hola")

let runningTotal = 0;
let buffer = "0";
let previousOperator;

const screen = document.querySelector('.screen');

function buttonClick(value){
    if(isNaN(value)){
        handleSymbol(value);
    }else{
        handleNumber(value);
    }
    screen.innerText = buffer;
}

function handleSymbol(symbol){
    switch(symbol){
        case 'C':
           buffer = '0';
           runningTotal = 0;
           break;
        case '=':
            if(previousOperator === null){
                return
            }
            flushOperation(parseInt(buffer));
            previousOperator = null;
            buffer = runningTotal;
            runningTotal = 0;
            break;
        case '←':
            if (buffer.length === 1) {
                buffer = '0';

            } else{
                buffer = buffer.toString(0, buffer.length - 1);
            }
            break;
        case '+':
        case '-':
        case 'x':
        case '÷':
            handleMath(symbol);
            break;          

    }
}

function handleMath(symbol){
    if (buffer === '0') {
        return;
        
    }

    const intBuffer = parseInt(buffer);

    if (runningTotal === 0) {
        runningTotal = intBuffer;
    }else{
        flushOperation(intBuffer);
    }
    previousOperator = symbol;
    buffer = '0' ;
}

function flushOperation(intBuffer){
    if (previousOperator === '+') {
        runningTotal += intBuffer;
    }else if(previousOperator === '-'){
        runningTotal -= intBuffer;
    }else if(previousOperator === 'x'){
        runningTotal *= intBuffer;
    }else if(previousOperator === '÷'){
        runningTotal /= intBuffer;
    }
}

function handleNumber(numberString){
    if (buffer === "0") {
        buffer = numberString;
    } else {
        buffer += numberString;
    }
}

function init(){
    /* document.querySelector('.calc-button').addEventListener('click', function(event){
        buttonClick(event.target.innerText);
        console.log('btn clicked', event)
    }) */

    // Array.prototype.slice.call() convierte un elemento a ARRAY. En este caso queremos convertir el elemento que devuelve "document.getElementsByClassName('calc-button')", que es un HTML Collection.
    const buttons = Array.prototype.slice.call( document.getElementsByClassName('calc-button') );
    
    // recorremos el array buttons usando la funcion forEach
    buttons.forEach(function (button) {
        button.addEventListener('click', function(event) {
            buttonClick(event.target.innerText);
            console.log('btn clicked');
        })
    })
}

init();

