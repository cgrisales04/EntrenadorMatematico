const lblPregunta = document.getElementById('lblPregunta');
const tiempo = document.getElementById('tiempo');
const lblRespuesta = document.getElementById('lblRespuesta');
const txtRespuesta = document.getElementById('txtRespuesta');
const btnResponder = document.getElementById('btnResponder');
const listHeart = document.getElementsByClassName('iconos-vidas')[0];
const btnComenzar = document.getElementById('btnComenzar');
const  contenedorItems = document.getElementsByClassName('contenedor-items')[0];
const aviso = document.getElementsByClassName('contenedor-items-perdiste')[0];

let vidas = 3;
listHeart;
let operacion = '';
let seconds = 10;
let respuesta;
let interval;

function initSeconds() {
    interval = setInterval(() => {
        tiempo.innerText = ` 00:${seconds < 10 ? '0'+seconds : seconds}`;
        if(seconds === 0){
            seconds = 10;
            stopInterval();
            generarNumeroAleatorio();
            restarVidas();
            return false;
        }
        seconds--;
    }, 1000);
}

function stopInterval() {
    if(interval){
        clearInterval(interval);
    }
}

function generarNumeroAleatorio() {
    let numero1 = Math.floor(Math.random() * (12 - 1 + 1));
    let numero2 = Math.floor(Math.random() * (12 - 1 + 1));
    let operacion = Math.floor(Math.random() * (4 - 1 + 1));

    switch (operacion) {
        case 0:
            lblPregunta.innerText = `¿Cuanto es ${numero1}+${numero2}?`;
            respuesta = numero1 + numero2;
            break;
        case 1:
            lblPregunta.innerText = `¿Cuanto es ${numero1}-${numero2}?`;
            respuesta = numero1 - numero2;
            break;
        case 2:
            lblPregunta.innerText = `¿Cuanto es ${numero1}x${numero2}?`;
            respuesta = numero1 * numero2;
            break;
        case 3:
            while (numero2 == 0 || numero1 == 0) {
                numero1 = Math.floor(Math.random() * (12 - 1 + 1));
                numero2 = Math.floor(Math.random() * (12 - 1 + 1));
            }
            lblPregunta.innerText = `¿Cuanto es ${numero1}÷${numero2}?`;
            respuesta = numero1 / numero2;
            break;
        default:
            break;
    }
    initSeconds();
}

function validarRespuesta(){
    if (+txtRespuesta.value === +respuesta) {
        lblRespuesta.innerText = respuesta;
        txtRespuesta.value = '';
        seconds = 10;
        stopInterval();
        generarNumeroAleatorio();
    }else{
        setTimeout(() => {
            txtRespuesta.style.left = `5px`;
        }, 50);
        txtRespuesta.style.right = `5px`;

        txtRespuesta.style.left = `0px`;
        txtRespuesta.style.right = `0px`;
        txtRespuesta.value = '';
    }
}

function restarVidas(){
    vidas--;
    if (vidas < 0) {
        stopInterval();
        aviso.classList.remove('ocultar');
        contenedorItems.classList.add('ocultar');
    }else{
        listHeart.children[vidas].classList.remove('fa-heart');
        listHeart.children[vidas].classList.add('fa-heart-broken');
    }
}

function comenzarJuego(){
    contenedorItems.classList.remove('ocultar');
    aviso.classList.add('ocultar');
    seconds = 10;
    vidas = 3;
    txtRespuesta.value = '';
    lblRespuesta.innerText = '';
    for(let i = 0; i < 3; i++){
        listHeart.children[i].classList.remove('fa-heart-broken');
        listHeart.children[i].classList.add('fa-heart');
    }
    generarNumeroAleatorio();
}


txtRespuesta.addEventListener("keydown", function(e){
    if(e.keyCode == 13){
        validarRespuesta();
        txtRespuesta.value = '';
    }
});
btnResponder.onclick = validarRespuesta;
btnComenzar.onclick = comenzarJuego;


generarNumeroAleatorio();