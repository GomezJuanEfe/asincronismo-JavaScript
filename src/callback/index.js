function sum(num1, num2) {
  return num1 + num2;
}

function calc(num1, num2, callback) {
  return callback(num1, num2);
}

console.log(calc(6, 2, sum));

function date(callback) {
  console.log('Funcion date')
  console.log(new Date);
  setTimeout(function() {
    console.log('setTimeout');
    let date = new Date;
    callback(date);
  }, 3000)
}

function printDate(dateNow) {
  console.log('Funcion printDate')
  console.log(dateNow);
}

date(printDate);


// Otro ejemplo sencillo de Callbacks fuente: https://www.w3schools.com/js/js_callback.asp

function myDisplayer(some) {
  console.log(some);
}

function myCalculator(num1, num2, myCallback) {
  let sum = num1 + num2;
  myCallback(sum);
}

myCalculator(5, 5, myDisplayer);


// Un ejemplo un poco más complejo con funciones asíncronas - fuente: 

setInterval(myFunction, 1000);

function myFunction() {
  let d = new Date();
  console.log(
  d.getHours() + ":" +
  d.getMinutes() + ":" +
  d.getSeconds()
  );
}
