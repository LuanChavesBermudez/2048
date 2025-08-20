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

    //genera dos columnas y filas aleatorias para valores iniciales
    let indiceFila1 = Math.floor(Math.random() * 4);
    let indiceFila2 = Math.floor(Math.random() * 4);
    let indiceColumna1 = Math.floor(Math.random() * 4);
    let indiceColumna2 = Math.floor(Math.random() * 4);

    if (indiceFila1 == indiceFila2 && indiceColumna1 == indiceColumna2) {
        let indiceFila2 = Math.floor(Math.random() * 4);
        let indiceColumna2 = Math.floor(Math.random() * 4);
    }

    matriz[indiceFila1][indiceColumna1] = 2;
    matriz[indiceFila2][indiceColumna2] = 2;

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


function moverIzq() {
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
                    continue;
                }
                //si no hay valor previo almacenado
                matriz[f][c] = 0;
                let primerCero = matriz[f].indexOf(0);
                matriz[f][primerCero] = actual;
                //lo mueve lo mas a la izquierda posible y lo guarda como el ultimo valor diferente a 0
                anterior = actual;
            }
        }
    }
    //vuelve a dibujar los valores en pantalla
    actualizarTablero();
}