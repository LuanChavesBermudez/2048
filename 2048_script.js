var movimentos = 0;
var matriz;
var areaJuego;

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
    areaJuego = document.getElementById("AreaJuego");
    for (let r=0; r < 4; r++) {
        let fila = document.createElement("flex-container");
        fila.classList.add("flex-container")
        fila.id = r.toString();
        areaJuego.appendChild(fila);
        for (let c = 0; c < 4; c++) {
            let columna = document.createElement("div");
            columna.id = r.toString() + "-" + c.toString();
            fila.appendChild(columna);
        }
    }
}