function print(some) {
  document.getElementById('demo').innerHTML = some;
}

function printImg(some) {
  document.getElementById('img').setAttribute('src', some);
}

const API = 'https://rickandmortyapi.com/api/character';

function fetchData(url_api, callback) {
  const xhttp = new XMLHttpRequest;

  xhttp.open('GET', url_api, true);

  xhttp.onreadystatechange = function(event) {
    if (this.readyState === 4) {
      if (this.status === 200) {
        return callback(null, JSON.parse(this.responseText));
      }
      else {
        const error = new Error('Error ' + url_api);
        return callback(error, null);
      }
    }
  }
  xhttp.send();
}

let personaje = prompt('Ingresa un numero del 0 al 19');

fetchData(API, function(error1, data) {
  if (error1) return console.error(error1);
    print(data.results[personaje].name);
    printImg(data.results[personaje].image);
})