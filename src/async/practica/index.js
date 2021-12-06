const xhttp = new XMLHttpRequest();
const API = 'https://rickandmortyapi.com/api/character/';

const fetchData = (url_api) => {
  return new Promise ((resolve, reject) => {

    xhttp.open('GET', url_api, true);
    xhttp.onreadystatechange = (() => {
      if (xhttp.readyState === 4) {
        (xhttp.status === 200)
          ? resolve (JSON.parse(xhttp.responseText))
          : reject (new Error ('Error ', url_api))
      }
    });
    xhttp.send();
  });
}

const printText = (some) => {
  document.querySelector('#demo').innerHTML = some;
}

const printImg = (some) => {
  document.querySelector('#img').setAttribute('src', some);
}

const randomNum = Math.floor(Math.random() * (826 - 1) + 1);

console.log(`El número aleatorio es: ${randomNum}`)

const anotherFunction = async (url_api) => {
  try {
    const data = await fetchData(`${url_api}${randomNum}`);
    printText(data.name);
    printImg(data.image);
  } catch (error) {

  }
}

anotherFunction(API);