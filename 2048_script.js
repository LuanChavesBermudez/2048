var celdas = [];
var movimentos = 0;
var matriz;

window.onload = function() {
    inicio();
}

function inicio() {
    matriz = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]

    for (let i = 1; i < 17; i++) {
        const celda = document.getElementById(i);
        celdas.push(celda);
    }
    console.log(celdas);
    for (let r = 0; r < 16; r++) {
        celdas.at(r).textContent = "";
    }
}