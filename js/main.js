const slides = document.querySelectorAll('.slide');
const indicators = document.querySelectorAll('.indicator');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const pausePlayButton = document.querySelector('.pause-play');

let currentSlide = 0;
let slideInterval;
let isPlaying = true;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
    indicators.forEach((indicator, i) => {
        indicator.classList.toggle('active', i === index);
    });
    document.querySelector('.slides').style.transform = `translateX(-${index * 100}%)`;
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}

function pausePlay() {
    if (isPlaying) {
        clearInterval(slideInterval);
        pausePlayButton.textContent = '▶️';
    } else {
        slideInterval = setInterval(nextSlide, 3000);
        pausePlayButton.textContent = '⏸';
    }
    isPlaying = !isPlaying;
}

slideInterval = setInterval(nextSlide, 3000);

nextButton.addEventListener('click', nextSlide);
prevButton.addEventListener('click', prevSlide);
pausePlayButton.addEventListener('click', pausePlay);

indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
    });
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
        nextSlide();
    } else if (e.key === 'ArrowLeft') {
        prevSlide();
    } else if (e.key === ' ') {
        pausePlay();
    }
});

document.querySelector('.slides').addEventListener('touchstart', handleTouchStart, false);
document.querySelector('.slides').addEventListener('touchmove', handleTouchMove, false);

let xDown = null;

function handleTouchStart(evt) {
    xDown = evt.touches[0].clientX;
}

function handleTouchMove(evt) {
    if (!xDown) return;

    let xUp = evt.touches[0].clientX;
    let xDiff = xDown - xUp;

    if (Math.abs(xDiff) > 0) {
        if (xDiff > 0) {
            nextSlide();
        } else {
            prevSlide();
        }
    }
    xDown = null;
}

document.querySelector('.slides').addEventListener('mousedown', handleMouseStart, false);

function handleMouseStart(evt) {
    let startX = evt.clientX;

    document.querySelector('.slides').addEventListener('mouseup', function handleMouseMove(e) {
        let moveX = startX - e.clientX;

        if (Math.abs(moveX) > 50) {
            if (moveX > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
        document.querySelector('.slides').removeEventListener('mouseup', handleMouseMove);
    });
}
