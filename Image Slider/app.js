const slides = document.querySelectorAll(".slide");
let slideIndex = 0;
let intervalId = null;  // null means no value;

document.addEventListener("DOMContentLoaded", initializeSlider);    // preferred way.

function initializeSlider() {
    // checks if the length of nodeList is > 0.
    if (slides.length > 0) {
        slides[slideIndex].classList.add("displaySlide");   // display the first image.
        intervalId = setInterval(nextSlide, 3000);  // calls the nextSlide() after 3 sec.
    }
}

function showSlide(index) {
    if (index >= slides.length) {
        slideIndex = 0;
    }
    else if (index < 0) {
        slideIndex = slides.length - 1; // 
    }

    // remove any existing displaySlide class.
    slides.forEach(slide => {
        slide.classList.remove("displaySlide");
    });

    // display the next slide.
    slides[slideIndex].classList.add("displaySlide");
}

function prevSlide() {
    clearInterval(intervalId);
    slideIndex--;
    showSlide(slideIndex);
}

function nextSlide() {
    slideIndex++;
    showSlide(slideIndex);
}