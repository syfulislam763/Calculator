let previousOperand = document.querySelector('.previous-operand')
let currentOperand = document.querySelector('.current-operand')
let dataAllClear = document.getElementById('data-all-clear')
let dataDelete = document.getElementById('data-delete')
let dataEquals = document.getElementById('data-equals')
let dataOperations = document.querySelectorAll(".data-operation")
let numbers = document.querySelectorAll('.data-number')
let currentValue = ''



dataAllClear.addEventListener('click', function(event){
    previousOperand.textContent = 'Previous'
    currentOperand.textContent = 'Current'
    currentValue = ''
    addClassForDot()
    addClassInOperators()
})



dataDelete.addEventListener('click', function(event){
    let arr = currentValue.split('')
    if(arr[arr.length-1] === ' '){
        arr.pop()
        arr.pop()
    }else{
        arr.pop()
    }
    currentValue = arr.join('')
    if(currentValue === ''){
        previousOperand.textContent = 'Previous'
    }
    currentOperand.textContent = currentValue
    addClassInOperators()
    addClassForDot()
})



dataEquals.addEventListener('click', function(event){
    previousOperand.textContent = currentValue
    let value = replaceDivisionSymbol(currentValue)
    try{
        let result = eval(value)
        if((result + '').includes('.')){
            currentValue = result.toFixed(2)
        }else{
            currentValue = result + ''
        }
        currentOperand.textContent = currentValue
    }catch(e){
        currentOperand.textContent = 'Unexpected input'
        currentValue = ''
        previousOperand.textContent = ''
    }
})



numbers.forEach(num => {
    num.addEventListener('click', function(event){
        let n = event.target.textContent.trim()
        let element = event.target
        if(event.target.classList.contains('data-number')){
            currentValue += n
            currentOperand.textContent = currentValue
        }
        preventRepeatOfDot(n, element)
        addClassInOperators()
    })
})



dataOperations.forEach(operator => {
    operator.addEventListener('click', function(event){
        if(event.target.classList.contains('data-operation')){
            let o = event.target.textContent.trim()
            currentValue += ' ' + o + ' '
            currentOperand.textContent = currentValue
        }
        removeClassFromOperators()
        addClassForDot()
    })
})













function replaceDivisionSymbol(value){
    if(value.includes('÷')){
        let indexArray = []
        let strArray = value.split('')
        for(let i = 0; i < strArray.length; i++){
            if(value[i] === '÷'){
                indexArray.push(i)
            }
        }
        for(let v of indexArray){
            strArray[v] = '/'
        }
        return strArray.join('')
    }else{
        return value
    }
}

function removeClassFromOperators(){
    dataOperations.forEach(opera => {
        opera.className = ''
    })
} 

function addClassInOperators(){
    dataOperations.forEach(opera => {
        opera.className = 'data-operation'
    })
}

function preventRepeatOfDot(n, element){
    if(n === '.'){
        element.className = ''
    }
}

function addClassForDot(){
    numbers.forEach(number => {
        number.className = 'data-number'
    })
}