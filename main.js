const listaJugadores = JSON.parse(localStorage.getItem("listaJugadores")) || [];
const fondos = [
    "url('Images/cards/woodCard.png')",
    "url('Images/cards/bronzeCard.png')",
    "url('Images/cards/silverCard.png')",
    "url('Images/cards/goldCard.png')",
    "url('Images/cards/esmeraldCard.png')",
    "url('Images/cards/diamondCard.png')"
];
const jerarquiaFondos = {
    "url('Images/cards/woodCard.png')": 0,
    "url('Images/cards/bronzeCard.png')": 1,
    "url('Images/cards/silverCard.png')": 2,
    "url('Images/cards/goldCard.png')": 3,
    "url('Images/cards/esmeraldCard.png')": 4,
    "url('Images/cards/diamondCard.png')": 5
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
        pollo: listaPollos[index]
    }));

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
        fightDisplay.textContent = round !== "FINAL" ? `FIGHT ${fight}` : "";

        actualizarJugadoresVisual(jugador1, jugador2);

        iniciarAnimacionHuevos(jugador1, jugador2, (huevoGanador1, huevoGanador2) => {
            if (huevoGanador1 === huevoGanador2) {
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

                        switch (round) {
                            case "ROUND OF 16":
                                round = "QUARTER FINALS";
                                break;
                            case "QUARTER FINALS":
                                round = "SEMIFINAL";
                                break;
                            case "SEMIFINAL":
                                round = "FINAL";
                                break;
                            default:
                                console.log("ERROR");
                        }

                        fight = 1;
                    }

                    playButton.disabled = false;
                }), 1000);
            }
        });
    }

    function iniciarAnimacionHuevos(jugador1, jugador2, callback) {
        const contenedorJugador1 = document.querySelector('.player-left');
        const contenedorJugador2 = document.querySelector('.player-right');

        let currentIndex1 = 0;
        let currentIndex2 = 0;

        const mostrarAnimacionFondo = (contenedor, callbackAnimacion) => {
            let interval = setInterval(() => {
                contenedor.style.backgroundImage = fondos[contenedor === contenedorJugador1 ? currentIndex1 : currentIndex2];
                if (contenedor === contenedorJugador1) {
                    currentIndex1 = (currentIndex1 + 1) % fondos.length;
                } else {
                    currentIndex2 = (currentIndex2 + 1) % fondos.length;
                }
            }, 150);

            setTimeout(() => {
                clearInterval(interval);
                const elegido = fondos[Math.floor(Math.random() * fondos.length)];
                contenedor.style.backgroundImage = elegido;
                callbackAnimacion(elegido);
            }, 2000);
        };

        let fondoFinal1, fondoFinal2;

        mostrarAnimacionFondo(contenedorJugador1, fondoGanador1 => {
            fondoFinal1 = fondoGanador1;
            if (fondoFinal2) callback(fondoFinal1, fondoFinal2);
        });

        mostrarAnimacionFondo(contenedorJugador2, fondoGanador2 => {
            fondoFinal2 = fondoGanador2;
            if (fondoFinal1) callback(fondoFinal1, fondoFinal2);
        });
    }

    function determinarGanador(jugador1, jugador2, huevo1, huevo2) {
        const nivel1 = jerarquiaFondos[huevo1];
        const nivel2 = jerarquiaFondos[huevo2];

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
        }, 1000);
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

// Función para manejar la inclinación dinámica
function addHoverEffect(card) {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left; // Coordenada X relativa al div
      const y = e.clientY - rect.top;  // Coordenada Y relativa al div

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Calcula la rotación según la posición del cursor
      const rotateX = ((y - centerY) / centerY) * 25; // Inclinación vertical
      const rotateY = ((centerX - x) / centerX) * 25; // Inclinación horizontal

      // Aplica la transformación
      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      card.classList.add('active');
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'rotateX(0deg) rotateY(0deg)';
      card.classList.remove('active');
    });
  }

  // Aplica la función a las dos clases distintas
  const card1 = document.querySelector('.player-left');
  const card2 = document.querySelector('.player-right');

  addHoverEffect(card1);
  addHoverEffect(card2);


