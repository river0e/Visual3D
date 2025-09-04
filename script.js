const button = document.getElementById('viewWorks');
const panelRight = document.querySelector('.panel-right');
const gallery = document.getElementById('gallery');

// Scroll suave al pulsar el botón
button.addEventListener('click', () => {
  gallery.scrollIntoView({ behavior: "smooth" });
});

// Efecto parallax
panelRight.addEventListener('mousemove', (e) => {
  const width = panelRight.offsetWidth;
  const height = panelRight.offsetHeight;
  const offsetX = ((e.clientX / width) - 0.5) * 20;
  const offsetY = ((e.clientY / height) - 0.5) * 20;
  panelRight.querySelector('.image-bg').style.transform = `
    rotateX(${-offsetY}deg) 
    rotateY(${offsetX}deg) 
    rotateZ(${offsetX/30}deg) 
    scale(1.10) 
    skew(${offsetX/30}deg, ${offsetY/30}deg)
  `;
});

panelRight.addEventListener('mouseleave', () => {
  panelRight.querySelector('.image-bg').style.transform =
    `rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(1) skew(0deg,0deg)`;
});
// Modal para ampliar imagen
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");
const closeBtn = document.querySelector(".close");

// Abrir modal usando data-full
document.querySelectorAll(".gallery picture").forEach(picture => {
  picture.addEventListener("click", () => {
    const img = picture.querySelector("img");

    // Prioridad: avif > webp > jpg
    let fullSrc = img.dataset.fullAvif || img.dataset.fullWebp || img.dataset.fullJpg;

    modal.classList.add("show");
    modal.style.display = "flex";
    modalImg.src = fullSrc;
    modalImg.alt = img.alt;
  });
});

// Observer para animar la galería al hacer scroll
const items = document.querySelectorAll(".gallery-item");
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: 0.1 });
items.forEach(item => observer.observe(item));

// Cerrar modal con la X
closeBtn.addEventListener("click", () => {
  modal.classList.remove("show");
  modal.style.display = "none";
});

// Cerrar modal con ESC
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.style.display === "flex") {
    modal.classList.remove("show");
    modal.style.display = "none";
  }
});


// Cerrar el modal con ESC
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.style.display === "flex") {
    modal.classList.remove("show");
    modal.style.display = "none";
  }
});

// Animación de palabras
const words = ["idea", "estilo", "arte", "diseño", "3D"];
let wordIndex = 0;

setInterval(() => {
  wordIndex = (wordIndex + 1) % words.length;
  const span = document.getElementById("changing-word");
  span.style.opacity = 0;
  setTimeout(() => {
    span.textContent = words[wordIndex];
    span.style.opacity = 1;
  }, 300);
}, 3000);
