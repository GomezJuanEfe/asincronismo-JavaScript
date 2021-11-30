// Hacemos la petición con XMLHttpRequest y no con Fetch porque estamos trabajando con callback

// Si trabajamo con Node hay que hacer el require de la siguiente manera...
let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
let API = 'https://rickandmortyapi.com/api/character/';

// creo la función con los parámetros url_api (opcional), callback (función que voy a llamar)
function fetchData(url_api, callback) {
  // genero la referencia para poder acceder al objeto XMLHttpRequest
  let xhttp = new XMLHttpRequest();
  // por medio del método open puedo acceder a una url y hacer la petición - param 1: request method http. param 2: url to send request. param 3: async (opt)
  xhttp.open('GET', url_api, true);
  // con el método onreadystatechage agrego un eventhandler para escuchar los cambios en el atributo readyState.
  // cuando suceda el cambio de estado en readyState voy a ejecutar una función que va a recibir un evento (que no siempre va a pasar pero es bueno establecerlo).
  xhttp.onreadystatechange = function(event) {
    // es este espacio voy a hacer una validación para ver si voy a ejecutar mi callback.
    // la primera validación es si el estado es satisfactorio (Hay 5 estados: 0: request not initialized, 1: server connection established, 2: request received, 3: processing request, 4: request finished and response is ready)
    if (xhttp.readyState === 4) {
      // ahora hago otra validación, si bien hay respuesta esta puede ser de error (200 significa que todo está OK)
      if(xhttp.status === 200) {
        // dentro de node hay un estandar en donde en el callback pasamos el error como primer valor y el segundo la info que se desencadena de la API.
        // en el segundo valor, tengo que parcear mi respuesta ya que de otra manera no lo podría utilizar como un objeto.
        return callback(null, JSON.parse(xhttp.responseText));
        // como buena práctica voy a mandar un else donde voy a mandar un error en caso de que la respuesta no sea satisfactoria.
      } else {
        // creamos el error como lo debemos hacer. Ver: https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Error y https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Control_flow_and_error_handling 
        const error = new Error('Error ' + url_api);
        return callback(error, null);
      }
    }
  }
  // por último, debemos mandar la solicitud al servidor con el método send.
  xhttp.send();
}

fetchData(API, function(error1, data1) {
  if (error1) return console.error(error1);
  fetchData(API + data1.results[0].id, function(error2, data2) {
    if (error2) return console.error(error2);
    fetchData(data2.origin.url, function(error3, data3) {
      if (error3) return console.error(error3);
      console.log(data1.info.count);
      console.log(data2.name);
      console.log(data3.dimension);
    })
  })
})