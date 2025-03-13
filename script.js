let contadorClics = 0;
const contenedor = document.getElementById("contenedor");
const mensaje = document.getElementById("mensaje");

contenedor.addEventListener("click", (e) => {
    contadorClics++;

    // Crear flor
    let flor = document.createElement("div");
    flor.classList.add("flor");
    
    // Posición aleatoria
    flor.style.left = `${e.clientX - 15}px`;
    flor.style.top = `${e.clientY - 15}px`;

    document.body.appendChild(flor);

    // Eliminar flor después de la animación
    setTimeout(() => {
        flor.remove();
    }, 3000);

    // Cuando llegue a 10 clics, mostrar mensaje
    if (contadorClics === 10) {
        mostrarMensaje();
    }
});

function mostrarMensaje() {
    mensaje.classList.add("mostrar");
    mensaje.classList.remove("oculto");
}
