// =============================
// Typing Effect
// =============================
document.addEventListener("DOMContentLoaded", () => {
    const texts = ["Web Developer", "Frontend Engineer", "Problem Solver"];
    const typingElement = document.getElementById("typingEffect");

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const typeSpeed = 120;
    const eraseSpeed = 60;
    const delay = 1000;

    function type() {
        const currentText = texts[textIndex];

        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex--);
        } else {
            typingElement.textContent = currentText.substring(0, charIndex++);
        }

        if (!isDeleting && charIndex === currentText.length + 1) {
            isDeleting = true;
            setTimeout(type, delay);
            return;
        }

        if (isDeleting && charIndex < 0) {
            isDeleting = false;
            charIndex = 0;
            textIndex = (textIndex + 1) % texts.length;
        }

        setTimeout(type, isDeleting ? eraseSpeed : typeSpeed);
    }

    type();
});

// =============================
// Live Background (Smooth Circles)
// =============================
const canvas = document.getElementById("liveBackground");
const ctx = canvas.getContext("2d");

let circles = [];

function resizeCanvas() {
    const dpi = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpi;
    canvas.height = window.innerHeight * dpi;
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";
    ctx.setTransform(1, 0, 0, 1, 0, 0); // reset scale
    ctx.scale(dpi, dpi);

    // Reset circle positions
    circles.forEach(c => c.reset());
}

// Circle class
class Circle {
    constructor() { this.reset(); }
    reset() {
        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * window.innerHeight;
        this.radius = Math.random() * 12 + 4;
        this.speedX = Math.random() * 0.35 - 0.175;
        this.speedY = Math.random() * 0.4 + 0.1;
        this.opacity = Math.random() * 0.35 + 0.25;
        const colors = [
            `rgba(255, 111, 60, ${this.opacity})`,
            `rgba(255, 140, 90, ${this.opacity})`,
            `rgba(255, 165, 110, ${this.opacity})`
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
    }
    update() {
        this.x += this.speedX;
        this.y -= this.speedY;
        if (this.y + this.radius < 0) this.y = window.innerHeight + this.radius;
        if (this.x - this.radius > window.innerWidth) this.x = -this.radius;
        if (this.x + this.radius < 0) this.x = window.innerWidth + this.radius;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

// Initialize circles
function initCircles(count = 60) {
    circles = Array.from({ length: count }, () => new Circle());
}
initCircles();
resizeCanvas();

window.addEventListener("resize", resizeCanvas);

// Animation loop
function animate() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    circles.forEach(c => { c.update(); c.draw(); });
    requestAnimationFrame(animate);
}
animate();

// =============================
// Mobile Navigation Toggle
// =============================
const mobileToggle = document.querySelector('.mobile-toggle');
const navMenu = document.querySelector('.nav-menu');

mobileToggle.addEventListener('click', () => {
    mobileToggle.classList.toggle('open'); // animate burger
    navMenu.classList.toggle('show');      // show/hide menu
});

// Optional: close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
        navMenu.classList.remove('show');
        mobileToggle.classList.remove('open');
    }
});
