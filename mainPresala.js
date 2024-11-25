const listaJugadores = JSON.parse(localStorage.getItem("listaJugadores")) || [];

document.addEventListener("DOMContentLoaded", () => {
    const btnAddPlayer = document.getElementById("btnAddPlayer");
    const btnClearPlayers = document.getElementById("btnClearPlayers");
    const btnNext = document.getElementById("btnNext");
    const messageContainer = document.getElementById("messageContainer");

    // Actualizar lista de jugadores al cargar
    updatePlayerList();

    // Mostrar formulario para añadir jugadores
    btnAddPlayer.addEventListener("click", () => {
        const formContainer = document.getElementById("addPlayerForm");
        formContainer.classList.remove("hidden");
    });

 // Manejar envío del formulario para agregar jugadores
const form = document.getElementById("playerForm");
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const playerNameInput = document.getElementById("playerName");
    const playerName = playerNameInput.value.trim();

    if (playerName.length > 9) {
        showMessage("The player's name cannot be longer than 9 characters", "error");
        return;
    }

    if (playerName !== "" && listaJugadores.length < 16) {
        listaJugadores.push(playerName);
        localStorage.setItem("listaJugadores", JSON.stringify(listaJugadores)); // Guardar en localStorage
        updatePlayerList();
        playerNameInput.value = "";

        if (listaJugadores.length === 16) {
            showMessage("All 16 players have been added", "success");
            document.getElementById("addPlayerForm").classList.add("hidden");
        }
    } else if (listaJugadores.length >= 16) {
        showMessage("All 16 players have been added", "error");
    }
});


    // Manejar limpieza de jugadores
    btnClearPlayers.addEventListener("click", () => {
        listaJugadores.length = 0; // Vaciar array
        localStorage.removeItem("listaJugadores"); // Limpiar almacenamiento
        updatePlayerList(); // Actualizar pantalla
        showMessage("The list of players has been emptied", "info");
    });

    // Verificar si hay suficientes jugadores para avanzar
    btnNext.addEventListener("click", (e) => {
        if (listaJugadores.length < 16) {
            e.preventDefault();
            showMessage("You can't play without 16 players", "error");
        }
    });

    // Mostrar mensajes dinámicos
    function showMessage(message, type) {
        const messageElement = document.createElement("div");
        messageElement.textContent = message;
        messageElement.classList.add("message", type);

        messageContainer.appendChild(messageElement);

        setTimeout(() => {
            messageElement.remove();
        }, 3000); // Eliminar mensaje después de 3 segundos
    }

    // Actualizar lista visualmente
    function updatePlayerList() {
        const leftColumn = document.querySelector("#playerList .column.left");
        const rightColumn = document.querySelector("#playerList .column.right");

        leftColumn.innerHTML = "";
        rightColumn.innerHTML = "";

        if (listaJugadores.length > 0) {
            leftColumn.innerHTML = listaJugadores
                .slice(0, 8)
                .map((player, index) => `<li>${index + 1}. ${player}</li>`)
                .join("");

            rightColumn.innerHTML = listaJugadores
                .slice(8, 16)
                .map((player, index) => `<li>${index + 9}. ${player}</li>`)
                .join("");
        }
    }
    
});