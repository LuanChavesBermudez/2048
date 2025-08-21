var puntaje = 0;
var matriz;
var areaJuego;

window.onload = function() {
    inicio();
}

document.addEventListener("keyup", moverTablero);

function moverTablero(evento) {
    if (evento.key == "ArrowLeft") {
        moverIzq();
    }
    if (evento.key == "ArrowRight") {
        moverDer();
    }
}

function inicio() {
    matriz = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]    
    ]
    areaJuego = document.getElementById("AreaJuego");

    //genera flex containers que funcionan como filas
    for (let f=0; f < 4; f++) {
        let fila = document.createElement("flex-container");
        fila.classList.add("flex-container")
        fila.id = f.toString();
        areaJuego.appendChild(fila);

        //genera divs dentro de los contenedores que funcionan como celdas o columnas
        for (let c = 0; c < 4; c++) {
            let celda = document.createElement("div");
            //asigna una ID unica tipo fila-columna a cada celda para encontrarla facilmente
            celda.id = f.toString() + "-" + c.toString();
            fila.appendChild(celda);
        }
    }

    actualizarTablero();
}

function actualizarTablero(){
    for (let f = 0; f < 4; f++) {
        for (let c = 0; c < 4; c++) {
            let celda = document.getElementById(f.toString() + "-" + c.toString());
            let num = matriz[f][c];
            if (num != 0) {
                celda.innerText = num;
            } else { 
                celda.innerText = "";
            }
        }
    }
}

function gameOver() {
    return true;
}

function poblarCelda() {
    let opciones = [2, 2, 2, 2, 4];
    let indiceColumna = Math.floor(Math.random() * 4);
    //si la fila superior no está llena
    if (matriz[0].indexOf(0) != -1) {
        while(matriz[0][indiceColumna] != 0){
            indiceColumna = Math.floor(Math.random() * 4);
        }
        matriz[0][indiceColumna] = opciones[Math.floor(Math.random() * opciones.length)];
        actualizarTablero();
    } else {
        gameOver();
    }
}


function moverIzq() {
    for (let f = 0; f < 4; f++) {
        //variable para recordar el ultimo numero diferente a cero
        let anterior = 0;
        let indiceAnterior = 0;
        for (let c = 0; c < 4; c++) {
            let actual = matriz[f][c];
            //si el numero actual es diferente a cero
            if (actual != 0) {
                //si ha habido un numero previo diferente a cero y es igual al actual
                if (anterior != 0 && anterior == actual) {
                    //encuentra en que indice estaba ese valor previo
                    matriz[f][indiceAnterior] = 0;
                    matriz[f][c] = 0;
                    //duplica el valor de esa celda y borra la actual (porque se fusionaron)
                    let primerCero = matriz[f].indexOf(0);
                    matriz[f][primerCero] = anterior*2;
                    //olvida el numero previo para que no se fusionen muchos en cadena
                    anterior = 0;
                    indiceAnterior = 0;
                    continue;
                }
                //si no hay valor previo almacenado
                matriz[f][c] = 0;
                let primerCero = matriz[f].indexOf(0);
                matriz[f][primerCero] = actual;
                //lo mueve lo mas a la izquierda posible y lo guarda como el ultimo valor diferente a 0
                anterior = actual;
                indiceAnterior = c;
            }
        }
    }
    //vuelve a dibujar los valores en pantalla
    actualizarTablero();
}

function moverDer() {
    for (let f = 0; f < 4; f++) {
        let anterior = 0;
        let indiceAnterior = 0;
        for (let c = 3; c >= 0; c--) {
            let actual = matriz[f][c];
            if (actual != 0) {
                if (anterior != 0 && anterior == actual) {
                    matriz[f][indiceAnterior] = 0;
                    matriz[f][c] = 0;
                    let ultimoCero = matriz[f].lastIndexOf(0);
                    matriz[f][ultimoCero] = anterior*2;
                    anterior = 0;
                    indiceAnterior = 0;
                    continue;
                }
                matriz[f][c] = 0;
                let ultimoCero = matriz[f].lastIndexOf(0);
                matriz[f][ultimoCero] = actual;
                anterior = actual;
                indiceAnterior = c;
            }
        }
    }
    actualizarTablero();
}