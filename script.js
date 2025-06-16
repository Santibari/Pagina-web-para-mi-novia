let noClickCount = 0;

function flipCard(element) {
    const flipCard = element.querySelector('.flip-card');
    if (flipCard) {
        flipCard.classList.toggle('flipped');
    }
}

function openHeartModal() {
    const modal = document.getElementById('heartModal');
    modal.style.display = 'block';
    noClickCount = 0;
    resetButtonSizes();
}

function answerSi() {
    const modal = document.getElementById('heartModal');
    const teAmoContainer = document.getElementById('teAmoContainer');
    modal.style.display = 'none';
    teAmoContainer.style.display = 'flex';
    setTimeout(() => {
        startHeartRain();
    }, 2000);
    setTimeout(() => {
        teAmoContainer.style.display = 'none';
        stopHeartRain();
    }, 10000);
}

function answerNo() {
    noClickCount++;
    const btnSi = document.getElementById('btnSi');
    const newScale = 1 + (noClickCount * 0.3);
    const newFontSize = 1.5 + (noClickCount * 0.2);
    btnSi.style.transform = `scale(${newScale})`;
    btnSi.style.fontSize = `${newFontSize}rem`;
    btnSi.style.animation = 'pulseButton 1s infinite';

    const btnNo = document.getElementById('btnNo');
    btnNo.style.animation = 'shake 0.5s ease-in-out';
    setTimeout(() => {
        btnNo.style.animation = '';
    }, 500);
}

function resetButtonSizes() {
    const btnSi = document.getElementById('btnSi');
    btnSi.style.transform = 'scale(1)';
    btnSi.style.fontSize = '1.5rem';
}

function startHeartRain() {
    const heartRain = document.getElementById('heartRain');
    const heartInterval = setInterval(() => {
        createFallingHeart(heartRain);
    }, 200);
    heartRain.heartInterval = heartInterval;
}

function stopHeartRain() {
    const heartRain = document.getElementById('heartRain');
    if (heartRain.heartInterval) {
        clearInterval(heartRain.heartInterval);
    }
    heartRain.innerHTML = '';
}

function createFallingHeart(container) {
    const heart = document.createElement('div');
    heart.innerHTML = ['❤️', '💕', '💖', '💗', '💝'][Math.floor(Math.random() * 5)];
    heart.className = 'falling-heart';
    heart.style.left = Math.random() * 100 + '%';
    heart.style.fontSize = (Math.random() * 20 + 20) + 'px';
    heart.style.animationDuration = (Math.random() * 2 + 2) + 's';
    container.appendChild(heart);
    setTimeout(() => {
        if (heart.parentNode) {
            heart.parentNode.removeChild(heart);
        }
    }, 4000);
}

document.addEventListener('DOMContentLoaded', function () {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }
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
            const heart = document.createElement('div');
            heart.innerHTML = '💕';
            heart.style.position = 'absolute';
            heart.style.fontSize = Math.random() * 20 + 10 + 'px';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.top = '100%';
            heart.style.opacity = '0.7';
            heart.style.animation = `floatUp ${Math.random() * 3 + 4}s linear`;
            heartsContainer.appendChild(heart);
            setTimeout(() => heart.remove(), 7000);
        }
    }, 1000);
}
