// Simple image slider
const slides = [
  "home.png",
  "home1.png",
  "home2.png"
];

let current = 0;
const img = document.getElementById("slideImage");

function showSlide() {
  if (!img) return;
  img.src = slides[current];
}

function nextSlide() {
  current = (current + 1) % slides.length;
  showSlide();
}

function prevSlide() {
  current = (current - 1 + slides.length) % slides.length;
  showSlide();
}

// auto-slide
setInterval(nextSlide, 5000);

// counters
function animateCounter(id, end) {
  const el = document.getElementById(id);
  if (!el) return;
  let value = 0;
  const step = Math.max(1, Math.floor(end / 50));

  const timer = setInterval(() => {
    value += step;
    if (value >= end) {
      value = end;
      clearInterval(timer);
    }
    el.textContent = value;
  }, 40);
}

window.addEventListener("load", () => {
  animateCounter("count1", 18);
  animateCounter("count2", 5);
  animateCounter("count3", 11);
  animateCounter("count4", 4);
});
