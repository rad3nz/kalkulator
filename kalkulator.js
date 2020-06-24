alert("Terima Kasih telah menggunakan kalkulator ini!")
console.log("Hai!")

const calculator = {
    displayNumber: '0',
    operator: null,
    firstNumber: null,
    waitingForSecondNumber: false,
}
function updateDisplay() {
    document.querySelector("#displayNumber").innerText = calculator.displayNumber;
};

function clearCalculator() {
    calculator.displayNumber = '0';
    calculator.operator = null;
    calculator.firstNumber = null;
    calculator.waitingForSecondNumber = false;
}

function inputDigit(digit) {
    if (calculator.waitingForSecondNumber && calculator.firstNumber === calculator.displayNumber) {
        calculator.displayNumber = digit;
    } else {
        if (calculator.displayNumber === '0') {
        calculator.displayNumber = digit;
        } else {
        calculator.displayNumber += digit;
        }
    }    
}
// fungsi negative operator
function inverseNumber() {
    if (calculator.displayNumber === '0') {
        return;
    }
    calculator.displayNumber = calculator.displayNumber * -1;
}
/* Fungsi Operator: menyimpan operator dan firstNumber dengan nilai displayNumber 
saat ini pada object calculator, hanya jika properti waitingForSecondNumber bernilai false */
function handleOperator(operator) {
    if (!calculator.waitingForSecondNumber) {
        calculator.operator = operator;
        calculator.waitingForSecondNumber = true;
        calculator.firstNumber = calculator.displayNumber;
    } else {
        alert("Operator sudah ditetapkan")
    }
}
// fungsi kalkulasi operator
function performCalculation() {
    
    // mengecek keadaan operator sudah ada atau belum
    if (calculator.firstNumber == null || calculator.operator == null) {
        alert("Kamu belum menentukan operator");
        return;
    }

    let result = 0;
    if (calculator.operator === "+") {
        result = parseInt(calculator.firstNumber) + parseInt(calculator.displayNumber);
    } else {
        result = parseInt(calculator.firstNumber) - parseInt(calculator.displayNumber);
    }

    // objek yang akan dikirimkan sebagai argumen fungsi putHistory()
    const history = {
        firstNumber: calculator.firstNumber,
        secondNumber: calculator.displayNumber,
        operator: calculator.operator,
        result: result
    }
    
    putHistory(history);
    calculator.displayNumber = result;
    renderHistory();
}


const buttons = document.querySelectorAll(".button");
for (let button of buttons) {
    button.addEventListener('click',function(event) {
    // Mendapatkan objek element yang diklik
     const target = event.target;
    // panggil clear button jika keadaan button terpenuhi
     if (target.classList.contains('clear')) {
           clearCalculator();
           updateDisplay();
           return;
       }
    // panggil negative button jika keadaan button terpenuhi
       if (target.classList.contains('negative')) {
           inverseNumber();
           updateDisplay();
           return;
       }
    // panggil equal button jika keadaan button terpenuhi
       if (target.classList.contains('equals')) {
           performCalculation();
           updateDisplay();
           return;
       }
    // panggil operator button jika keadaan button terpenuhi
       if (target.classList.contains('operator')) {
           handleOperator(target.innerText);
           updateDisplay();
           return;
       }

     inputDigit(target.innerText);
     updateDisplay()   
    });
}