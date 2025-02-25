const navbar = document.getElementById("navbar");
const navLinks = document.querySelectorAll("#navbar a");
const openBtn = document.getElementById("open-sidebar-btn");
const topBtn = document.getElementById("top-btn");
const media = window.matchMedia("(width < 600px)");

media.addEventListener("change", updateNavbar);
window.onscroll = handleScroll;

function updateNavbar(e) {
    navbar.toggleAttribute("inert", e.matches);
}

function toggleSidebar(show) {
    navbar.classList.toggle("show-sidebar", show);
    openBtn.setAttribute("aria-hidden", String(!show));
    navbar.toggleAttribute("inert", !show);
}

function handleScroll() {
    topBtn.style.display = (window.scrollY > 50) ? "flex" : "none";
}

navLinks.forEach(link => link.addEventListener("click", () => {
    if (media.matches) toggleSidebar(false);
}));

function backToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}