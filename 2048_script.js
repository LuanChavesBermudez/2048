var puntaje = 0;
var movimientos = 0;
var matriz;
var areaJuego;
var gano = false;
var tiempoInicio = Date.now();

//inicia el programa apenas carga la pagina
window.onload = function() {
    inicio();
}

//listener para los tecleos del usuario
document.addEventListener("keyup", moverTablero);

//obtiene la tecla que se presiono y ejecuta el movimiento respectivo
function moverTablero(evento) {
    if (evento.key == "ArrowLeft") {
        moverIzq();
    }
    if (evento.key == "ArrowRight") {
        moverDer();
    }
    if (evento.key == "ArrowDown") {
        moverAbajo();
    }
    movimientos +=1;
    if (gano) {
        gameOver("Victoria!");
    }
}

//inicializa la matriz logica, visual y los timers
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
    //el juego inicia con un digito en la matriz
    poblarCelda();

    //cada segundo las celdas bajan una fila
    setInterval(() => {
        moverAbajo();
    }, 1000);

    //cada 4 segundos aparece una nueva celda en la primera fila
    setInterval(() => {
        poblarCelda();
    }, 4000);
}

//recorre todo el tablero visual y actualiza el valor que corresponde
//con su indice de la matriz logica
function actualizarTablero(){
    for (let f = 0; f < 4; f++) {
        for (let c = 0; c < 4; c++) {
            let celda = document.getElementById(f.toString() + "-" + c.toString());
            celda.classList.value = "";
            let num = matriz[f][c];
            if (num != 0) {
                celda.innerText = num;
            } else { 
                celda.innerText = "";
            }
            celda.classList.add("x" + num.toString());
        }
    }
}

//coloca un numero en la primera fila
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
    //si no puede colocar se asume que el tablero está lleno y se pierde el juego
    } else {
        gameOver("Derrota!");
    }
}


function moverIzq() {
    for (let f = 0; f < 4; f++) {
        //variables para recordar el ultimo numero diferente a cero y su index
        let anterior = 0;
        let indiceAnterior = 0;
        for (let c = 0; c < 4; c++) {
            let actual = matriz[f][c];
            //si el numero actual es diferente a cero
            if (actual != 0) {
                //si el ultimo numero diferente de cero es igual al actual
                if (anterior == actual) {
                    //borra el numero del indice anterior y la celda actual
                    matriz[f][indiceAnterior] = 0;
                    matriz[f][c] = 0;
                    //duplica el valor del numero y lo coloca en el primer cero disponible
                    let primerCero = matriz[f].indexOf(0);
                    matriz[f][primerCero] = anterior*2;
                    puntaje += anterior*2;
                    //si el numero duplicado es 2048, levanta la bandera de victoria
                    if (anterior*2 == 2048) {
                        gano = true;
                    }
                    //olvida el numero previo para que no se fusionen muchos en cadena
                    anterior = 0;
                    indiceAnterior = 0;
                } else {
                    //si no hay valor previo diferente a cero almacenado
                    matriz[f][c] = 0;
                    let primerCero = matriz[f].indexOf(0);
                    //mueve el numero actual al primer cero disponible
                    matriz[f][primerCero] = actual;
                    //lo marca como anterior para que los siguientes se puedan fusionar
                    anterior = actual;
                    indiceAnterior = primerCero;
                }
            }
        }
    }
    actualizarTablero();
}

//lo mismo que moverIzq pero recorre la filas de derecha a izquierda
function moverDer() {
    for (let f = 0; f < 4; f++) {
        let anterior = 0;
        let indiceAnterior = 0;
        for (let c = 3; c >= 0; c--) {
            let actual = matriz[f][c];
            if (actual != 0) {
                if (anterior == actual) {
                    matriz[f][indiceAnterior] = 0;
                    matriz[f][c] = 0;
                    let ultimoCero = matriz[f].lastIndexOf(0);
                    matriz[f][ultimoCero] = anterior*2;
                    puntaje += anterior*2;
                    if (anterior*2 == 2048) {
                        gano = true;
                    }
                    anterior = 0;
                    indiceAnterior = 0;
                } else {
                    matriz[f][c] = 0;
                    let ultimoCero = matriz[f].lastIndexOf(0);
                    matriz[f][ultimoCero] = actual;
                    anterior = actual;
                    indiceAnterior = ultimoCero;
                }   
            }
        }
    }
    actualizarTablero();
}

//solo compara celdas inmediatamente adjacentes
//para crear el efecto de tetris
function moverAbajo() {
    for (let f = 2; f >= 0; f--){
        for (let c = 0; c < 4; c++) {
            //obtiene la celda actual y la que sigue
            let actual = matriz[f][c];
            let siguiente = matriz[f+1][c];
            if (actual != 0){
                //si son iguales las fusiona
                if (actual == siguiente){
                    matriz[f][c] = 0;
                    matriz[f+1][c] = siguiente*2;
                    if (siguiente*2 == 2048) {
                        gano = true;
                    }
                    puntaje += siguiente*2;
                //si la celda siguiente es un cero, mueve la actual a ese index
                } else if (siguiente == 0) {
                    matriz[f][c] = 0;
                    matriz[f+1][c] = actual;
                }
            }
        }
    }
    actualizarTablero();
}

//despliega el overlay con el mensaje que se le envie
function gameOver(mensaje) {
    let overlay = document.getElementById("mensaje-gameover");
    overlay.querySelector("p").textContent = mensaje;
    overlay.style.display = 'flex';
}

//refresca la pagina
function NuevoJuego() {
    location.reload();
}

function mostrarEstadisticas(){
    let overlay = document.getElementById("mensaje-estadisticas");
    //actualiza el las estadisticas cada segundo
    setInterval(() => {
        overlay.querySelector("p1").textContent = "Puntaje: " + puntaje.toString();
        let tiempoTranscurrido = Date.now() - tiempoInicio;
        overlay.querySelector("p2").textContent = "Tiempo: " + formatTime(tiempoTranscurrido);
        overlay.querySelector("p3").textContent = "Movimientos: " + movimientos.toString();
    }, 1000);
    overlay.style.display = 'flex';
}

//oculta el overlay
function cerrarMensaje() {
    let overlay = document.getElementById("mensaje-estadisticas");
    overlay.style.display = 'none';
}


//sacado de internet, solo para mostrar el tiempo como hh:mm:ss
function formatTime(ms) {
    let msASegundos = Math.floor(ms / 1000);
    let horas = Math.floor(msASegundos / 3600);
    let minutos = Math.floor((msASegundos % 3600) / 60);
    let segundos = msASegundos % 60;

    horas = String(horas).padStart(2, '0');
    minutos = String(minutos).padStart(2, '0');
    segundos = String(segundos).padStart(2, '0');

    return `${horas}:${minutos}:${segundos}`;
}