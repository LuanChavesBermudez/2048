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

    //genera dos valores iniciales aleatorios
    poblarCelda();
    poblarCelda();

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

function hayCampo() {
    for (let f = 0; f < 3; f++){
        if (matriz[f].indexOf(0) != -1){
            return true;
        }
    }
    return false;
}

function gameOver() {
    return true;
}

function poblarCelda() {
    let opciones = [2, 2, 2, 2, 4];
    let indiceFila = Math.floor(Math.random() * 4);
    let indiceColumna = Math.floor(Math.random() * 4);
    if (hayCampo()) {
        while(matriz[indiceFila][indiceColumna] != 0){
            indiceFila = Math.floor(Math.random() * 4);
            indiceColumna = Math.floor(Math.random() * 4);
        }
        matriz[indiceFila][indiceColumna] = opciones[Math.floor(Math.random() * opciones.length)];
    } else {
        gameOver();
    }
}


function moverIzq() {
    let seMovio = false;
    for (let f = 0; f < 4; f++) {
        //variable para recordar el ultimo numero diferente a cero
        let anterior = 0;
        for (let c = 0; c < 4; c++) {
            let actual = matriz[f][c];
            //si el numero actual es diferente a cero
            if (actual != 0) {
                //si ha habido un numero previo diferente a cero y es igual al actual
                if (anterior != 0 && anterior == actual) {
                    //encuentra en que indice estaba ese valor previo
                    let indiceAnterior = matriz[f].indexOf(anterior);
                    matriz[f][indiceAnterior] = 0;
                    matriz[f][c] = 0;
                    //duplica el valor de esa celda y borra la actual (porque se fusionaron)
                    let primerCero = matriz[f].indexOf(0);
                    matriz[f][primerCero] = anterior*2;
                    //olvida el numero previo para que no se fusionen muchos en cadena
                    anterior = 0;
                    seMovio = true;
                    continue;
                }
                //si no hay valor previo almacenado
                matriz[f][c] = 0;
                let primerCero = matriz[f].indexOf(0);
                matriz[f][primerCero] = actual;
                //lo mueve lo mas a la izquierda posible y lo guarda como el ultimo valor diferente a 0
                anterior = actual;
                if (c != primerCero) {seMovio = true;}
            }
        }
    }
    //vuelve a dibujar los valores en pantalla
    if (seMovio) {poblarCelda();}
    actualizarTablero();
}
//document.addEventListener("keyup", moverTablero);