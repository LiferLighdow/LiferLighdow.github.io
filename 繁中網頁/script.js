const slides = document.querySelector(".hero-slides");
const slidesCount = document.querySelectorAll(".hero-slide").length;
let slideIndex = 0;

function nextSlide() {
  slideIndex = (slideIndex + 1) % slidesCount;
  updateSlidePosition();
}

function updateSlidePosition() {
  slides.style.transform = `translateX(-${slideIndex * (100 / slidesCount)}%)`;
}

setInterval(nextSlide, 5000); // Change slide every 5 seconds