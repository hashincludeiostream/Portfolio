// ---------------- Typing Effect ----------------
document.addEventListener("DOMContentLoaded", function() {
  const texts = ["Web Developer", "Frontend Engineer", "Problem Solver"];
  let count = 0;
  let index = 0;
  let isDeleting = false;

  const speed = 120;     // typing speed
  const eraseSpeed = 60; // deleting speed
  const delay = 1000;    // pause at end

  const typingElement = document.getElementById("typingEffect");

  function type() {
    const currentText = texts[count];

    if (isDeleting) {
      typingElement.textContent = currentText.substring(0, index--);
    } else {
      typingElement.textContent = currentText.substring(0, index++);
    }

    if (!isDeleting && index === currentText.length + 1) {
      isDeleting = true;
      return setTimeout(type, delay);
    }

    if (isDeleting && index === 0) {
      isDeleting = false;
      count = (count + 1) % texts.length;
    }

    setTimeout(type, isDeleting ? eraseSpeed : speed);
  }

  type();
});

// ---------------- Scroll Animation ----------------
document.addEventListener("DOMContentLoaded", function() {
  const scrollElements = document.querySelectorAll(".animate-on-scroll");

  const elementInView = (el, offset = 0) => {
    const elementTop = el.getBoundingClientRect().top;
    return elementTop <= (window.innerHeight || document.documentElement.clientHeight) - offset;
  };

  const displayScrollElement = (el) => el.classList.add("active");
  const hideScrollElement = (el) => el.classList.remove("active");

  const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
      elementInView(el, 50) ? displayScrollElement(el) : hideScrollElement(el);
    });
  };

  window.addEventListener("scroll", handleScrollAnimation);
  handleScrollAnimation();
});

// ---------------- Live Background: Floating Orange Circles ----------------
const canvas = document.getElementById('liveBackground');
const ctx = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

// Circle class
class Circle {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.radius = Math.random() * 12 + 4; // size: 4-16px
    this.speedX = Math.random() * 0.4 - 0.2; // horizontal drift
    this.speedY = Math.random() * 0.5 + 0.1; // upward drift
    this.opacity = Math.random() * 0.4 + 0.2; // 0.2-0.6 opacity
    // orange color variants
    const colors = [
      `rgba(255, 111, 60, ${this.opacity})`,   // main orange
      `rgba(255, 140, 90, ${this.opacity})`,   // lighter orange
      `rgba(255, 165, 110, ${this.opacity})`   // soft pastel orange
    ];
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }

  update() {
    this.x += this.speedX;
    this.y -= this.speedY;

    // wrap around edges
    if (this.y + this.radius < 0) this.y = height + this.radius;
    if (this.x - this.radius > width) this.x = -this.radius;
    if (this.x + this.radius < 0) this.x = width + this.radius;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

const circles = [];
const numCircles = 60; // subtle number of circles

for (let i = 0; i < numCircles; i++) {
  circles.push(new Circle());
}

function animateCircles() {
  ctx.clearRect(0, 0, width, height);
  circles.forEach(circle => {
    circle.update();
    circle.draw();
  });
  requestAnimationFrame(animateCircles);
}

window.addEventListener('resize', () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
  circles.forEach(c => c.reset());
});

animateCircles();
