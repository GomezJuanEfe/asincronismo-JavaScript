// https://www.youtube.com/watch?v=DHvZLI7Db8E
// The basic syntax

// Defining the function
let p = new Promise((resolve, reject) => {
  if (true) {
    resolve('success');
  } else {
    reject('failed');
  }
});

// Calling the function
p.then((message) => {
  console.log('This is in the then ' + message)
}).catch((message) => {
  console.log('This is in the catch ' + message)
})



// Aquí vamos a empezar con la práctica

const print = (some) => {
  document.getElementById('demo').innerText = some;
  return 'función print ejecutada';
}

const printImg = (some) => {
  document.querySelector('#img').setAttribute('src', some);
  return 'función printImg ejecutada'
}

const char = Math.floor(Math.random()*(826-1)+1);

const API = `https://rickandmortyapi.com/api/character/${char}`;

console.log('Personaje al azar: ' + char);


const fetchData = (url_api) => {
  return new Promise((resolve, reject) => {
    const xhttp = new XMLHttpRequest;

    xhttp.open('GET', url_api, true);
    xhttp.onreadystatechange = (() => {
      if (xhttp.readyState === 4) {
        xhttp.status === 200
        ? resolve(JSON.parse(xhttp.responseText))
        : reject(new Error('Error ', url_api));
      }
    });
    xhttp.send();
  });
}

fetchData(API)
  .then(data => {
    print(`# - ${char} - ${data.name}`);
    printImg(data.image);
  })
  .catch(err => {
    console.error(err);
  })