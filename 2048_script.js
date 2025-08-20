var movimentos = 0;
var matriz;
var areaJuego;

window.onload = function() {
    updateMatrizL();
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

    while (indiceFila1 == indiceFila2 && indiceColumna1 == indiceColumna2) {
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
            celda.id = f.toString() + "-" + c.toString();
            celda.innerText = matriz[f][c];
            if (celda.innerText == "0"){
                celda.innerText = "";
            }
            fila.appendChild(celda);
            
        }
    }
}
    function updateMatrizLAb(){
        for(let f=0; f<4; f++){
            for(let c=0; c<4;c++){
                celda.innerText = matriz[f][c];
                let num=celda.innerText;
                if(matriz[f][c]==matriz[f][c+1]){
                    num=matriz[f][c]=matriz[f][c]*2;
                    matriz[f][c+1]=0
                    celda.innerText=num;
                }
                else{
                    celda.innerText="";
                }
            }
            fila.appendChild(celda);


        }
    }
    function updateMatrizLAR(){
        for(let f=0; f<4; f++){
            for(let c=0; c<4;c++){
                celda.innerText = matriz[f][c];
                let num=celda.innerText;
                if(matriz[f][c+1]==matriz[f][c]){
                    num=matriz[f][c]=matriz[f][c]*2;
                    matriz[f][c+1]=0
                    celda.innerText=num;
                }
                else{
                    celda.innerText="";
                }
            }
            fila.appendChild(celda);


        }
    }
     function updateMatrizLD(){
        for(let f=0; f<4; f++){
            for(let c=0; c<4;c++){
                celda.innerText = matriz[f][c];
                let num=celda.innerText;
                if(matriz[f][c]==matriz[f+1][c]){
                    num=matriz[f][c]=matriz[f][c]*2;
                    matriz[f+1][c]=0
                    celda.innerText=num;
                }
                else{
                    celda.innerText="";
                }
            }
            fila.appendChild(celda);


        }
    }
    function updateMatrizLI(){
        for(let f=0; f<4; f++){
            for(let c=0; c<4;c++){
                celda.innerText = matriz[f][c];
                let num=celda.innerText;
                if(matriz[f+1][c]==matriz[f][c]){
                    num=matriz[f][c]=matriz[f][c]*2;
                    matriz[f+1][c]=0
                    celda.innerText=num;
                }
                else{
                    celda.innerText="";
                }
            }
            fila.appendChild(celda);


        }
    }
    function actualizarTablero(){
        for(let f=0; f<4; f++){
             for(let c=0; c<4;c++){
                let celda = document.createElement("div");
                celda.id = f.toString() + "-" + c.toString();
                let num=matriz[f][c];
                if(num!=0){
                    celda.innerText=num;
                }
                else{
                    celda.innerText="";
                }

        }
    }
}

//document.addEventListener("keyup", moverTablero);