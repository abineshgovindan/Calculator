class Calculator{
    constructor(previousOperandTextElement, currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
         this.clear();

    }

    clear(){
        this.currentOperand ='';
        this.previousOperand ='';
        this.operation = undefined;

    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1)


    }

    appendNumber(number){
        if(number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString();


    }

    chooseOperation(operation){
        if(this.currentOperand === '')return
        if(this.previousOperand !== ''){
            this.compute();
             
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand= ''
        
        


    } 

    compute(){
      
        let comutation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
  
        if(isNaN(prev) || isNaN(current))return
        switch(this.operation){
            case '+':
                comutation =prev + current
                break
            case '-':
                comutation =prev - current
                break
            case '*':
                comutation =prev * current
                break
            case '÷':
                comutation =prev / current
                break
            default:
                return
        }
        this.currentOperand = comutation
        console.log(comutation)
        this.operation = undefined
        this.previousOperand =''


    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
       const integerDigits = parseFloat(stringNumber.split('.')[0])
       const decimalDigits = stringNumber.split('.')[1]
       let intergerDisplay
       if(isNaN(integerDigits)){
        intergerDisplay =''
       }else{
        intergerDisplay = integerDigits.toLocaleString('en', {
            maxiumumFractionDigits: 0})

        }
        if(decimalDigits != null){

            return`${integerDigits}.${decimalDigits}`

        }else{
            return intergerDisplay
        }

       

    }

    updateDisplay(){
        this.currentOperandTextElement.innerText = 
        this.getDisplayNumber(this.currentOperand)
        if(this.operation != null){
             this.previousOperandTextElement.innerText = `
                ${this.getDisplayNumber(this.previousOperand)} ${this.operation}`

        }
        else{
            this.previousOperandTextElement.innerText =''
        }
       

    }
}





const numberButtons =document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[ data-opreation]')
const equalsButton =document.querySelector('[data-equals]')
const deleteButton =document.querySelector('[data-delete]')
const allClearButton =document.querySelector('[data-all-clear]')
const previousOperandTextElement =document.querySelector('[data-previous-opreand]')
const currentOperandTextElement =document.querySelector('[ data-current-opreand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(button => {
    button.addEventListener('click', () =>{
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})


operationButtons.forEach(button => {
    button.addEventListener('click', () =>{
        calculator.chooseOperation(button.innerText)
         
        calculator.updateDisplay()
    })
})

allClearButton.addEventListener('click', () =>{
    calculator.clear();
    calculator.updateDisplay();
   
})


equalsButton.addEventListener('click', () =>{
    calculator.compute();
    calculator.updateDisplay();
   
})

deleteButton.addEventListener('click', () =>{
    calculator.delete();
    calculator.updateDisplay();
   
})
