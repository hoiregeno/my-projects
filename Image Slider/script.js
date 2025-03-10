const slides = document.querySelectorAll(".slides img");
let intervalId = null;
let isRunning = false;
let slideIndex = 0;

document.addEventListener("DOMContentLoaded", initializeSlide);

function initializeSlide() {
    slides[slideIndex].classList.add("show");
    intervalId = setInterval(nextSlide, 5000);
}

function showSlide(index) {
    if (index >= slides.length) {
        slideIndex = 0; // return to the  first slide.
    }
    else if (index < 0) {
        slideIndex = slides.length - 1; // return to the last slide
    }

    // Iterate through any img elements and remove .show.
    slides.forEach(slide => slide.classList.remove("show"));
    // Then show the next available slide.
    slides[slideIndex].classList.add("show");
}

function nextSlide() {
    slideIndex++;
    showSlide(slideIndex);
}

function prevSlide() {
    clearInterval(intervalId);
    slideIndex--;
    showSlide(slideIndex);
}