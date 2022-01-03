const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn =  document.getElementById('clear-btn');

// Formula object depending on operator
const calculation = {
    '+': (firstOperand,  currentDisplayValue) => Number(firstOperand) + Number(currentDisplayValue),
    '-': (firstOperand,  currentDisplayValue) => firstOperand - currentDisplayValue,
    '/': (firstOperand,  currentDisplayValue) => firstOperand / currentDisplayValue,
    '*': (firstOperand,  currentDisplayValue) => firstOperand * currentDisplayValue}

let currentDisplayValue = '';
let firstOperand = '';
let operator = '';

function updateDisplayValue() {
    calculatorDisplay.textContent = currentDisplayValue;
}

function addDecimal() {
if(!currentDisplayValue.includes(".")) {
    currentDisplayValue = currentDisplayValue + ".";
    updateDisplayValue();
}}

function sendNumberValue(number) {
// If current display Value = 0, replace it, if not add number
if(currentDisplayValue == 0) {
currentDisplayValue = number.toString();}
else { 
currentDisplayValue = currentDisplayValue + number.toString();
}    
updateDisplayValue();
}

function operatorSelect(sign) {
// Return Value of calculation
if((sign === "=" || firstOperand !== '') && !!operator && !!currentDisplayValue) {
currentDisplayValue = calculation[operator](firstOperand, currentDisplayValue)
updateDisplayValue();
operator = '';
// Asign next Operator if
} if (sign !== "=") {
operator = sign; 
}
// After Calulation, currentDisplayValue
if(currentDisplayValue !== '') {
firstOperand = currentDisplayValue;    
currentDisplayValue = '';
}}

function resetAll() {
    calculatorDisplay.textContent = '0';
    currentDisplayValue = '0';
    firstOperand = '';
    operator = '';
}

// Add Event Listeners - All buttons except clear
inputBtns.forEach((inputBtn) => {
if(inputBtn.classList.length === 0) {
 inputBtn.addEventListener('click', () => sendNumberValue(inputBtn.value));
} else if (inputBtn.classList.contains('operator')) {
    inputBtn.addEventListener('click', () => operatorSelect(inputBtn.value));  
} else if (inputBtn.classList.contains('decimal')) {
    inputBtn.addEventListener('click', () => addDecimal());
}
})

// Clear Calculator Event Listener
clearBtn.addEventListener('click', resetAll);