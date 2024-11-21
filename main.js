let listaJugadores = ["Alejandro", "Pablo Noria", "Javier", "Felipe", "Nando", "Mauricio", "Pablo Jimenez", 
    "Samuel", "Nicolás", "Israel", "Manolo", "Rubén", "Jairo", "Adrián", "Judith", "Mario"];

let listaHuevos = ["Madera", "Bronce", "Plata", "Oro", "Esmeralda", "Diamante"];

let jerarquiaHuevos = {
    "Madera": 0,
    "Bronce": 1,
    "Plata": 2,
    "Oro": 3,
    "Esmeralda": 4,
    "Diamante": 5
};

// Funcionalidad para cerrar modales
function cerrarModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}

// Asignar huevo aleatoriamente
function asignarHuevo() {
    let huevo = listaHuevos[Math.floor(Math.random() * listaHuevos.length)];
    return { nombre: huevo, nivel: jerarquiaHuevos[huevo] };
}

// Crear lista inicial de jugadores con huevos asignados
let jugadores = listaJugadores.map(nombre => ({ nombre, huevo: asignarHuevo() }));

// Mezclar un array (Fisher-Yates)
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
        return Math.random() < 0.5 ? jugador1 : jugador2; // Empate
    }
}

// Lógica principal del juego
function jugar() {
    let resultado = document.getElementById("resultado");
    resultado.innerHTML = ""; // Limpiar resultados previos
    
    while (jugadores.length > 1) {
        let rondaTexto = "<h3>Nueva Ronda</h3><ul>";
        
        // Asignar nuevo huevo a cada jugador
        jugadores.forEach(jugador => {
            jugador.huevo = asignarHuevo();
            rondaTexto += `<li>${jugador.nombre} recibe el huevo ${jugador.huevo.nombre}</li>`;
        });

        mezclarArray(jugadores);

        // Combates
        let supervivientes = [];
        for (let i = 0; i < jugadores.length; i += 2) {
            if (i + 1 < jugadores.length) {
                rondaTexto += `<li><strong>${jugadores[i].nombre} (huevo ${jugadores[i].huevo.nombre})</strong> 
                               vs <strong>${jugadores[i + 1].nombre} (huevo ${jugadores[i + 1].huevo.nombre})</strong></li>`;
                let ganador = combate(jugadores[i], jugadores[i + 1]);
                rondaTexto += `<li>${ganador.nombre} gana el combate</li>`;
                supervivientes.push(ganador);
            } else {
                rondaTexto += `<li>${jugadores[i].nombre} pasa automáticamente a la siguiente ronda</li>`;
                supervivientes.push(jugadores[i]);
            }
        }

        rondaTexto += "</ul>";
        resultado.innerHTML += rondaTexto;

        jugadores = supervivientes; // Actualizar jugadores
    }

    resultado.innerHTML += `<h2>El ganador final es ${jugadores[0].nombre} con el huevo ${jugadores[0].huevo.nombre}!</h2>`;
}

document.getElementById("start-btn").addEventListener("click", () => {
    jugadores = listaJugadores.map(nombre => ({ nombre, huevo: asignarHuevo() })); // Reiniciar jugadores
    jugar();
});




//popups
function openPopup() {
    document.getElementById("popup").classList.remove("hidden");
}

function closePopup() {
    document.getElementById("popup").classList.add("hidden");
}
function openBracket() {
    document.getElementById("bracket").classList.remove("hidden");
}
function closeBracket() {
    document.getElementById("bracket").classList.add("hidden");
}
// Abrir el modal de la lista de jugadores
function openPlayerListModal() {
    const playerList = document.getElementById("playerList");
    playerList.innerHTML = "";
    listaJugadores.forEach(jugador => {
        const li = document.createElement("li");
        li.textContent = jugador;
        playerList.appendChild(li);
    });

    document.getElementById("playerListModal").classList.remove("hidden");
}
function closePlayerListModal() {
    document.getElementById("playerListModal").classList.add("hidden");
}

