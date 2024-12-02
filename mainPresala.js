const listaJugadores = JSON.parse(localStorage.getItem("listaJugadores")) || [];

document.addEventListener("DOMContentLoaded", () => {
    const btnAddPlayer = document.getElementById("btnAddPlayer");
    const btnClearPlayers = document.getElementById("btnClearPlayers");
    const btnNext = document.getElementById("btnNext");
    const messageContainer = document.getElementById("messageContainer");

    updatePlayerList();

    btnAddPlayer.addEventListener("click", () => {
        const formContainer = document.getElementById("addPlayerForm");
        formContainer.classList.remove("hidden");
        audioOpenWindow();
    });


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
        localStorage.setItem("listaJugadores", JSON.stringify(listaJugadores)); 
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


    btnClearPlayers.addEventListener("click", () => {
        listaJugadores.length = 0; 
        localStorage.removeItem("listaJugadores"); 
        updatePlayerList(); 
        showMessage("The list of players has been emptied", "info");
        audioClearPlayers();
    });

    btnNext.addEventListener("click", (e) => {
        if (listaJugadores.length < 16) {
            e.preventDefault();
            showMessage("You can't play without 16 players", "error");
        } else {
                const audio = new Audio('sounds/fight-deep-voice.mp3'); 
                audio.volume = 0.5;
            
                audio.play().then(() => {
                    setTimeout(() => {
                        window.location.href = 'juego.html';
                    }, 1000);
                }).catch((error) => {
                    console.log('Error with audio audio:', error);
                    window.location.href = 'juego.html';
                });
        }
    });

    function showMessage(message, type) {
        const messageElement = document.createElement("div");
        messageElement.textContent = message;
        messageElement.classList.add("message", type);

        messageContainer.appendChild(messageElement);

        setTimeout(() => {
            messageElement.remove();
        }, 3000); 
    }

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
function audioOpenWindow(){
    const openSound = new Audio('sounds/pincharBoton.mp3'); 
    openSound.volume = 0.5; 
    openSound.play().catch((error) => {
        console.error('Error loading sound', error);
    });
}

function audioCloseWindow(){
    const openSound = new Audio('sounds/botonVolver.mp3');
    openSound.volume = 0.5; 
    openSound.play().catch((error) => {
        console.error('Error loading sound', error);
    });
}

function audioClearPlayers(){
    const openSound = new Audio('sounds/chicken-noise-196746.mp3');
    openSound.volume = 0.5; 
    openSound.play().catch((error) => {
        console.error('Error loading sound', error);
    });
}

function openInfoPopup() {
    document.getElementById("info-popup").style.display = "flex"; 
    audioOpenWindow();
  }
  
function closeInfoPopup() {
    document.getElementById("info-popup").style.display = "none"; 
    audioCloseWindow();
  }
  
  
  

document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('background-audio');

    const playAudio = () => {
      audio.volume = 0.5;
      audio.play().catch((error) => {
        console.log('Autoplay blocked. Waiting for user interaction.', error);
      });
    };

    playAudio();
    document.body.addEventListener('click', () => {
      audio.play();
    }, { once: true });
  });