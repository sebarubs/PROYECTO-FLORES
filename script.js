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
// Seleccionamos el canvas y configuramos su tamaño
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Clase para crear los pétalos (partículas de la explosión)
class Particle {
    constructor(x, y, color, size, speedX, speedY) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.size = size;
        this.speedX = speedX;
        this.speedY = speedY;
        this.life = 1; // Vida de la partícula (1 = 100%)
        this.decay = Math.random() * 0.02 + 0.01; // Velocidad con la que desaparece
    }

    // Actualizamos la posición y la vida de la partícula
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life -= this.decay;
    }

    // Dibujamos la partícula en el canvas
    draw() {
        ctx.globalAlpha = this.life; // Ajustamos la transparencia
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.globalAlpha = 1; // Restauramos la opacidad
    }
}

// Función para crear la explosión de pétalos
function createExplosion(x, y) {
    let particles = [];
    let numParticles = 30; // Número de pétalos en la explosión
    for (let i = 0; i < numParticles; i++) {
        let angle = (Math.PI * 2 * i) / numParticles; // Distribución en círculo
        let speed = Math.random() * 3 + 2; // Velocidad aleatoria
        let color = `hsl(${Math.random() * 40 + 40}, 100%, 60%)`; // Amarillo-dorado

        particles.push(new Particle(
            x, y, color, 5,
            Math.cos(angle) * speed,
            Math.sin(angle) * speed
        ));
    }
    animateExplosion(particles);
}

// Función para animar la explosión
function animateExplosion(particles) {
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Borra el canvas
        particles.forEach((particle, index) => {
            particle.update();
            particle.draw();
            if (particle.life <= 0) {
                particles.splice(index, 1);
            }
        });

        if (particles.length > 0) {
            requestAnimationFrame(animate); // Continúa la animación
        }
    }
    animate();
}

// Evento para detectar el clic y lanzar la animación
canvas.addEventListener("click", (event) => {
    createExplosion(event.clientX, event.clientY);
});
