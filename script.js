function flipCard(element) {
  const flipCard = element.querySelector('.flip-card');
  if (flipCard) {
    flipCard.classList.toggle('flipped');
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const photoItems = document.querySelectorAll('.photo-item');

  photoItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';

    setTimeout(() => {
      item.style.transition = 'all 0.6s ease';
      item.style.opacity = '1';
      item.style.transform = 'translateY(0)';
    }, index * 150);
  });

  createHeartParticles();
});

function createHeartParticles() {
  const heartsContainer = document.createElement('div');
  heartsContainer.style.position = 'fixed';
  heartsContainer.style.top = '0';
  heartsContainer.style.left = '0';
  heartsContainer.style.width = '100%';
  heartsContainer.style.height = '100%';
  heartsContainer.style.pointerEvents = 'none';
  heartsContainer.style.zIndex = '-1';
  document.body.appendChild(heartsContainer);

  setInterval(() => {
    if (Math.random() < 0.1) {
      createFloatingHeart(heartsContainer);
    }
  }, 1000);
}

function createFloatingHeart(container) {
  const heart = document.createElement('div');
  heart.innerHTML = '💕';
  heart.style.position = 'absolute';
  heart.style.fontSize = Math.random() * 20 + 10 + 'px';
  heart.style.left = Math.random() * 100 + '%';
  heart.style.top = '100%';
  heart.style.opacity = '0.7';
  heart.style.animation = `floatUp ${Math.random() * 3 + 4}s linear`;

  container.appendChild(heart);

  const style = document.createElement('style');
  style.textContent = `
    @keyframes floatUp {
      0% {
        transform: translateY(0) rotate(0deg);
        opacity: 0.7;
      }
      100% {
        transform: translateY(-100vh) rotate(360deg);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);

  setTimeout(() => {
    heart.remove();
    style.remove();
  }, 7000);
}
