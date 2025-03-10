document.addEventListener("DOMContentLoaded", () => {
    // Attach event listeners after DOM is loaded
    document.getElementById("nextBtn").addEventListener("click", nextSlide);
    document.getElementById("prevBtn").addEventListener("click", prevSlide);

    initializeSlideshow();
});

// Selects all images inside .slides and store them in a variable.
const slides = document.querySelectorAll(".slides img");
let slideIndex = 0;
let intervalId = null;

// Initialize the slideshow
function initializeSlideshow() {
    slides[slideIndex].classList.add("show");
    startSlideshow();
}

// Start or restart the automatic slideshow
function startSlideshow() {
    clearInterval(intervalId);
    intervalId = setInterval(nextSlide, 5000);
}

// Display the slide at the given index
function showSlide(index) {
    if (index >= slides.length) {
        slideIndex = 0; // Loop back to the first slide
    } else if (index < 0) {
        slideIndex = slides.length - 1; // Loop to the last slide
    } else {
        slideIndex = index;
    }

    // Remove 'show' class from all slides and add it to the current one
    slides.forEach(slide => slide.classList.remove("show"));
    slides[slideIndex].classList.add("show");
}

// Move to the next slide and restart the slideshow
function nextSlide() {
    slideIndex++;
    showSlide(slideIndex);
    startSlideshow(); // Resume auto-sliding
}

// Move to the previous slide and pause the slideshow
function prevSlide() {
    clearInterval(intervalId); // Pause auto-sliding
    slideIndex--;
    showSlide(slideIndex);
}