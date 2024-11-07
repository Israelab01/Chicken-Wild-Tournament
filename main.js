let listaJugadores = ["Alejandro","Pablo Noria","Javier","Felipe","Nando","Mauricio","Pablo Jimenez", "Samuel","Nicolás","Israel","Manolo","Rubén","Jairo","Adrián","Judith","Mario"];

//Plantear array asociativo
let huevoMadera = 0;
let huevoBronce = 1;
let huevoPlata = 2;
let huevoOro = 3;
let huevoPlatino = 4;
let huevoDiamante = 5;

let jugador = new Object();
jugador.nombre = "";
jugador.huevoAsignado = asignarHuevo;

let listaHuevos = [huevoMadera,huevoBronce,huevoPlata,huevoOro,huevoPlatino,huevoDiamante];

for (let i = 0; i <= listaJugadores.length; i++){
    let jugador = new jugador().nombre = listaJugadores[i];
}

function asignarHuevo(){
    return listaHuevos[Math.floor(Math.random() * listaHuevos.length)]
//FUNCIONALIDAD DEL JUEGO: 
// CREAR ENTIDADES, ASOCIAR HUEVO, PELEAR
// REPETIR CON LOS SUPERVIVIENTES.
}

