const listaJugadores = [
    "Alejandro", "Pablo Noria", "Javier", "Felipe", "Nando", "Mauricio",
    "Pablo Jimenez", "Samuel", "Nicolás", "Israel", "Manolo",
    "Rubén", "Jairo", "Adrián", "Judith", "Mario"
];

const listaHuevos = ["Madera", "Bronce", "Plata", "Oro", "Esmeralda", "Diamante"];
const jerarquiaHuevos = {
    "Madera": 0,
    "Bronce": 1,
    "Plata": 2,
    "Oro": 3,
    "Esmeralda": 4,
    "Diamante": 5
};

document.addEventListener('DOMContentLoaded', () => {
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    shuffle(listaJugadores);

    const listaPollos = Array.from({ length: 16 }, (_, i) => `Images/avatares/Avatar${i + 1}.png`);
    let round = "ROUND OF 16";
    let fight = 1;

    let jugadores = listaJugadores.map((nombre, index) => ({
        nombre,
        huevo: asignarHuevo(),
        pollo: listaPollos[index]
    }));

    function asignarHuevo() {
        let huevo = listaHuevos[Math.floor(Math.random() * listaHuevos.length)];
        return { nombre: huevo, nivel: jerarquiaHuevos[huevo] };
    }

    let jugadoresRestantes = [...jugadores];
    let eliminados = [];
    let enEspera = [];

    const playerLeftName = document.querySelector('.player-left h2');
    const playerRightName = document.querySelector('.player-right h2');
    const playerLeftAvatar = document.querySelector('.player-left img');
    const playerRightAvatar = document.querySelector('.player-right img');
    const roundDisplay = document.getElementById('round-number');
    const fightDisplay = document.getElementById('fight-number');
    const resultadoDiv = document.getElementById('resultado');
    const playButton = document.getElementById('start-btn');

    function actualizarJugadoresVisual(jugador1, jugador2) {
        playerLeftName.textContent = jugador1.nombre;
        playerRightName.textContent = jugador2.nombre;
        playerLeftAvatar.src = jugador1.pollo;
        playerRightAvatar.src = jugador2.pollo;
    }

    
    function iniciarBatalla() {

        if (jugadoresRestantes.length <= 1) {
            const ganadorFinal = jugadoresRestantes[0];
            resultadoDiv.innerHTML = `<h2>¡El ganador final es ${ganadorFinal.nombre}!</h2>`;
            playButton.disabled = true;
            return;
        }

        const jugador1 = jugadoresRestantes.shift();
        const jugador2 = jugadoresRestantes.shift();

        roundDisplay.textContent = `${round}`;
        if(round != "FINAL"){
            fightDisplay.textContent = `FIGHT ${fight}`;
        }
        actualizarJugadoresVisual(jugador1, jugador2);
        iniciarAnimacionHuevos(jugador1, jugador2, (huevoGanador1, huevoGanador2) => {
            if (huevoGanador1 === huevoGanador2) {
                // Si los huevos son iguales, repetir la jugada
                jugadoresRestantes.unshift(jugador1, jugador2);
                setTimeout(() => iniciarBatalla(), 1000);
            } else {
                const ganador = determinarGanador(jugador1, jugador2, huevoGanador1, huevoGanador2);
                const perdedor = ganador === jugador1 ? jugador2 : jugador1;
                fight++;

                setTimeout(() => mostrarEliminacion(perdedor, () => {
                    enEspera.push(ganador);
                    eliminados.push(perdedor);

                    if (jugadoresRestantes.length === 0) {
                        jugadoresRestantes = [...enEspera];
                        enEspera = [];
                        
                        const numero = 2;

                        switch (round) {
                            case "ROUND OF 16":
                                round = "QUARTER FINALS";
                                fight = 1;
                                break;
                            case "QUARTER FINALS":
                                round = "SEMIFINAL";
                                fight = 1;
                                break;                              
                            case "SEMIFINAL":
                                round = "FINAL"; 
                                fight = 1;
                                break;    
                            case "FINAL":
                                fightDisplay.textContent = ``;
                                break;                             
                            default:
                                console.log("ERROR");
                        }

                    }

                    playButton.disabled = false;
                }), 50);
            }
        });
    }

    function iniciarAnimacionHuevos(jugador1, jugador2, callback) {
        const huevosJugador1 = document.querySelectorAll('.contenedor-left img');
        const huevosJugador2 = document.querySelectorAll('.contenedor-right img');

        let currentIndex1 = 0;
        let currentIndex2 = 0;

        const mostrarAnimacionHuevos = (huevos, callbackAnimacion) => {
            huevos.forEach(huevo => huevo.classList.remove('visible'));

            const mostrarHuevo = () => {
                if (currentIndex1 > 0) {
                    huevos[currentIndex1 - 1].classList.remove('visible');
                }

                if (currentIndex1 < huevos.length) {
                    huevos[currentIndex1].classList.add('visible');
                    currentIndex1++;
                    setTimeout(mostrarHuevo, 300);
                } else {
                    const elegido = huevos[Math.floor(Math.random() * huevos.length)];
                    huevos.forEach(huevo => huevo.classList.remove('visible'));
                    elegido.classList.add('visible');
                    callbackAnimacion(elegido.alt);
                }
            };

            mostrarHuevo();
        };

        let huevoFinal1, huevoFinal2;

        mostrarAnimacionHuevos(huevosJugador1, huevoGanador1 => {
            huevoFinal1 = huevoGanador1;
            if (huevoFinal2) callback(huevoFinal1, huevoFinal2);
        });

        mostrarAnimacionHuevos(huevosJugador2, huevoGanador2 => {
            huevoFinal2 = huevoGanador2;
            if (huevoFinal1) callback(huevoFinal1, huevoFinal2);
        });
    }

    function determinarGanador(jugador1, jugador2, huevo1, huevo2) {
        const nivel1 = jerarquiaHuevos[huevo1];
        const nivel2 = jerarquiaHuevos[huevo2];

        return nivel1 > nivel2 ? jugador1 : jugador2;
    }

    function mostrarEliminacion(jugadorEliminado, callback) {
        const mensaje = document.createElement('div');
        mensaje.classList.add('eliminado');
        mensaje.textContent = `${jugadorEliminado.nombre} ha sido eliminado.`;

        resultadoDiv.appendChild(mensaje);

        setTimeout(() => {
            resultadoDiv.removeChild(mensaje);
            callback();
        }, 50);
    }

    playButton.addEventListener('click', () => {
        playButton.disabled = true;
        iniciarBatalla();
    });
});

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

