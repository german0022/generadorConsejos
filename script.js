const $dadoButton = document.getElementById("dadoButton");
const $dadoImg = document.getElementById("dadoImg");
const $numeroConsejo = document.getElementById("numeroConsejo");
const $consejoText = document.querySelector(".consejo");

let numeroActual = 0;
let isFetching = false; // Variable para rastrear si ya hay una solicitud en proceso

dadoButton.addEventListener("click", function(){
    if (!isFetching) { // Evitar múltiples solicitudes simultáneas
        rotarImagen();
        obtenerConsejo();
        dadoButton.disabled = true; // Deshabilitar el botón mientras se obtiene el consejo
    }
});

function rotarImagen() {
    $dadoImg.classList.add('rotando');
    setTimeout(function() {
        $dadoImg.classList.remove('rotando');
    }, 500);
}

function añadirNumeroConsejo(){
    ++numeroActual;
    $numeroConsejo.textContent = `CONSEJO #${numeroActual}`;
}

document.addEventListener('DOMContentLoaded', function(){
    obtenerConsejo();
});

function obtenerConsejo() {
    isFetching = true; // Indicar que hay una solicitud en proceso
    console.log("consejo obtenido")
    
    fetch('https://api.adviceslip.com/advice')
      .then(response => response.json())
      .then(data => {
        mostrarConsejo(data);
        setTimeout(function() {
            dadoButton.disabled = false; // Habilitar el botón después de recibir el consejo
        }, 2000); // Esperar 1 segundo antes de habilitar el botón
        isFetching = false; // Restablecer el estado después de recibir el consejo
      })
      .catch(error => {
        console.error('Error al obtener el consejo:', error);
        dadoButton.disabled = false; // Habilitar el botón en caso de error
        isFetching = false; // Restablecer el estado en caso de error
      });
}

function mostrarConsejo(consejo) {
    $consejoText.textContent = consejo.slip.advice;
    añadirNumeroConsejo();
}
