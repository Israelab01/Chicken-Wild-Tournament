document.addEventListener('DOMContentLoaded', () => {
    const huevos = document.querySelectorAll('.contenedor img');
    const startButton = document.getElementById('startAnimation');

    startButton.addEventListener('click', () => {
        let currentIndex = 0;

        huevos.forEach(huevo => huevo.classList.remove('visible'));

        const mostrarHuevo = () => {
            if (currentIndex > 0) {
                huevos[currentIndex - 1].classList.remove('visible'); 
            }

            if (currentIndex < huevos.length) {
                huevos[currentIndex].classList.add('visible'); 
                currentIndex++;
                setTimeout(mostrarHuevo, 300); 
            } else {
                // Elegir un huevo final y detener la animación. Cambiar cuando hagamos el merge
                const elegido = huevos[Math.floor(Math.random() * huevos.length)];
                huevos.forEach(huevo => huevo.classList.remove('visible')); 
                elegido.classList.add('visible'); 
            }
        };

        mostrarHuevo();
    });
});
