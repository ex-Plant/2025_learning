
window.onload = function() {
  console.log(`app started`);
  calculator.init()
}

function handleButtonClick(text) {
  switch (text) {
    case "=":
      calculator.evaluate();
      break;

    case "C":
      calculator.input.value = "";
      break;

    default:
      calculator.addToInput(text)
  }
}

const calculator = {
  buttons: undefined,
  input: undefined,

  init: function() {
    this.buttons = window.document.getElementsByTagName(`button`)
    this.input = document.getElementById(`input`)
    for (let i = 0; i < this.buttons.length; i++) {
      let el = this.buttons[i];
      // el.addEventListener("click", this.buttonClick)
      // el.addEventListener('click', (e) => this.buttonClick(e)); // Use arrow function
      el.addEventListener('click', this.buttonClick.bind(this)); // Bind to calculator
    }
  },

  buttonClick: function(e) {
    let divHtmlText = e.target.innerHTML;
    // this.addToInput(divHtmlText) //this.addToInput is not a function because
    // of this context
    // When buttonClick is called as an event handler,
    // the context (this) refers to the DOM element that triggered the event, not the calculator object.
    handleButtonClick( divHtmlText)

  },

  addToInput: function(str) {
    this.input.value += str;
  },

  evaluate: function() {
    calculator.input.value = math.evaluate(calculator.input.value)
  }
}

const THIS = `
  The issue with calling this.addToInput(divHtmlText) within the buttonClick method is due to the context (this) in which the method is executed. When buttonClick is called as an event handler, the context (this) refers to the DOM element that triggered the event, not the calculator object.

  Solution 1: Use .bind()
  You can bind the buttonClick method to the calculator object so that this inside buttonClick (code.js:35:3-40:4) always refers to the calculator object.

`
const newCalc = {
  init: function() {
    this.buttons = window.document.getElementsByTagName('button');
    this.input = document.getElementById('input');
    for (let i = 0; i < this.buttons.length; i++) {
      let el = this.buttons[i];
      el.addEventListener('click', this.buttonClick.bind(this)); // Bind to calculator
    }
  }
}


const SOLUTION2 = `
  Solution 2: Use an Arrow Function
`

const calcWithArrow = {
  init: function() {
    this.buttons = window.document.getElementsByTagName('button');
    this.input = document.getElementById('input');
    for (let i = 0; i < this.buttons.length; i++) {
      let el = this.buttons[i];
      el.addEventListener('click', (e) => this.buttonClick(e)); // Use arrow function
    }
  }

}
