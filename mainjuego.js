
let listaJugadores = ["Alejandro", "Pablo Noria", "Javier", "Felipe", "Nando", "Mauricio", "Pablo Jimenez", 
    "Samuel", "Nicolás", "Israel", "Manolo", "Rubén", "Jairo", "Adrián", "Judith", "Mario"];

let listaHuevos = ["Madera", "Bronce", "Plata", "Oro", "Platino", "Diamante"];

let jerarquiaHuevos = {
    "Madera": 0,
    "Bronce": 1,
    "Plata": 2,
    "Oro": 3,
    "Platino": 4,
    "Diamante": 5
};


function mostrarListaJugadores() {
    const playerList = document.getElementById("playerList");
    playerList.innerHTML = "";  // Limpiar lista actual
    listaJugadores.forEach(jugador => {
        const li = document.createElement("li");
        li.textContent = jugador;
        playerList.appendChild(li);
    });
    document.getElementById("playerListModal").style.display = "flex";
}

document.getElementById("btnPlayerList").addEventListener("click", mostrarListaJugadores);

//Asignar huevo aleatoriamente
function asignarHuevo() {
    let huevo = listaHuevos[Math.floor(Math.random() * listaHuevos.length)];
    return { nombre: huevo, nivel: jerarquiaHuevos[huevo] };
}

//lista de jugadores con un huevo asignado
let jugadores = listaJugadores.map(nombre => ({ nombre, huevo: asignarHuevo() }));

//mezclar la lista de jugadores
function mezclarArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Simulación de combate
function combate(jugador1, jugador2) {
    if (jugador1.huevo.nivel > jugador2.huevo.nivel) {
        return jugador1;
    } else if (jugador1.huevo.nivel < jugador2.huevo.nivel) {
        return jugador2;
    } else {
        // En caso de empate, se elige un jugador aleatorio
        return Math.random() < 0.5 ? jugador1 : jugador2;
    }
}

//Ejecutar el juego
function jugar() {
    let resultado = document.getElementById("resultado"); 
    resultado.innerHTML = "";  // Limpiar resultados previos
    
    while (jugadores.length > 1) {
        let rondaTexto = "<h3>Nueva Ronda</h3><ul>";
        
        // Asignar nuevo huevo a cada jugador
        jugadores.forEach(jugador => {
            jugador.huevo = asignarHuevo();
            rondaTexto += `<li>${jugador.nombre} recibe el huevo ${jugador.huevo.nombre}</li>`;
        });

        mezclarArray(jugadores);

        // Enfrentarse en pares
        let supervivientes = [];
        for (let i = 0; i < jugadores.length; i += 2) {
            if (i + 1 < jugadores.length) {
                // Mostrar el emparejamiento de cada combate
                rondaTexto += `<li><strong>${jugadores[i].nombre} (huevo ${jugadores[i].huevo.nombre})</strong> 
                               vs <strong>${jugadores[i + 1].nombre} (huevo ${jugadores[i + 1].huevo.nombre})</strong></li>`;
                
                let ganador = combate(jugadores[i], jugadores[i + 1]);
                rondaTexto += `<li>${ganador.nombre} gana el combate</li>`;
                supervivientes.push(ganador);
            } else {
                // Si hay un jugador sin contrincante, pasa automáticamente
                rondaTexto += `<li>${jugadores[i].nombre} pasa automáticamente a la siguiente ronda</li>`;
                supervivientes.push(jugadores[i]);
            }
        }

        rondaTexto += "</ul>";
        resultado.innerHTML += rondaTexto;

        //Actualizar lista de jugadores para la próxima ronda
        jugadores = supervivientes;
    }

    //Mostrar el ganador final
    resultado.innerHTML += `<h2>El ganador final es ${jugadores[0].nombre} con el huevo ${jugadores[0].huevo.nombre}!</h2>`;
}

//Ejecutar el juego al hacer clic en el botón
document.getElementById("start-btn").addEventListener("click", () => {
    //Reiniciar la lista de jugadores en cada ejecución
    jugadores = listaJugadores.map(nombre => ({ nombre, huevo: asignarHuevo() }));
    jugar();
});
// Función para abrir la ventana emergente
function openPopup() {
    document.getElementById("popup").classList.remove("hidden");
}


// Función para abrir la ventana emergente
function openBracket() {
    document.getElementById("bracket").classList.remove("hidden");
}

// Función para cerrar la ventana emergente
function closePopup() {
    document.getElementById("popup").classList.add("hidden");
}

function closeBracket() {
    document.getElementById("bracket").classList.add("hidden");
}

// Función para cerrar la pestaña del navegador
function backToPresala() {
    window.location.href = "indexpresala.html";
}
