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

setInterval(nextSlide, 5000);

// Mouse Click Animation
document.addEventListener('click', function(e) {
  const x = e.clientX;
  const y = e.clientY;

  const ripple = document.createElement('span');
  ripple.classList.add('ripple');
  ripple.style.left = x + 'px';
  ripple.style.top = y + 'px';

  document.body.appendChild(ripple);

  setTimeout(() => {
    ripple.remove();
  }, 600);
});
