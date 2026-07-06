const inputIntento = document.getElementById("inputIntento");
const btnAdivinar = document.getElementById('btnAdivinar');
const mensaje = document.getElementById('mensaje');
const contador = document.getElementById('contador');
const historial = document.getElementById('historial');
const btnReiniciar = document.getElementById('btnReiniciar');
const tarjeta = document.getElementById('game-card');

console.log("Elementos encontrados:", inputIntento);

function mostrarMensaje(texto, color) {
    mensaje.textContent = texto;
    mensaje.style.color = color;
}
mostrarMensaje("Bienvenido al juego ", "#e94560");

let numeroSecreto = Math.floor(Math.random() * 100) + 1;
let intentos = 0;
let historialIntentos = [];

console.log("(Debug) Numero secreto:", numeroSecreto);

function verificar_intento() {
    let valor =Number(inputIntento.value);

    if (isNaN(valor) || valor < 1 || valor > 100) {
    mostrarMensaje('⚠️ Ingresa un número del 1 al 100', 'orange');
    return;
}

intentos++;
contador.textContent = "Intentos:" + intentos;
// meter el valor en el historial
historialIntentos.push(valor);
historial.textContent = "Historial: " + historialIntentos.join(", ");

if (valor === numeroSecreto) {
    mostrarMensaje('🎉 ¡Correcto! Era el ' + numeroSecreto, '#00ff88');

    btnAdivinar.disabled = true;
    btnReiniciar.style.display = 'inline-block';
    // Celebración visual: la tarjeta brilla verde
    tarjeta.style.borderColor = '#00ff88';
    tarjeta.style.boxShadow = '0 0 40px rgba(0, 255, 136, 0.3)';

} else if (valor > numeroSecreto) {
    mostrarMensaje('📈 Muy alto. Intenta más bajo.', '#ff6b6b');
    mensaje.textContent += " " + obtenerPista(valor, numeroSecreto);
} else {
    mostrarMensaje('📉 Muy bajo. Intenta más alto.', '#4ecdc4');
    mensaje.textContent += " " + obtenerPista(valor, numeroSecreto);
}

inputIntento.value = "";
inputIntento.focus();
}

function reiniciar_juego() {
    numeroSecreto = Math.floor(Math.random() * 100) + 1;
    intentos = 0;
    historialIntentos = [];
    contador.textContent = "Intentos: 0";
    historial.textContent = "Historial: ";
    mostrarMensaje("¡Nuevo Juego!🎯Adivina el Número Secreto...", "#e94560");
    btnAdivinar.disabled = false;
    btnReiniciar.style.display = "none";
    inputIntento.value = "";
    inputIntento.focus();
    tarjeta.style.backgroundColor = "rgba(255, 255, 255, 0.05)";
    tarjeta.style.boxShadow = "0 8px 32px rgba(0, 0, 0, 0.4)";
    console.log("(Debug) Numero secreto:", numeroSecreto);
}

function obtenerPista(intento, secreto) {
let diferencia = Math.abs(intento - secreto);

if (diferencia <= 5) {
    return '🔥 ¡Muy cerca!';
} else if (diferencia <= 15) {
    return '♨️ Caliente';
} else if (diferencia <= 30) {
    return '🌤️ Tibio';
} else {
    return '❄️ Frío';
}
}

btnReiniciar.addEventListener("click", reiniciar_juego);
btnAdivinar.addEventListener("click", verificar_intento);


