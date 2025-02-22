const navbar = document.getElementById("navbar");
const openBtn = document.getElementById("open-sidebar-btn");
const navLinks = document.querySelectorAll(".nav-link");
const topBtn = document.getElementById("top-btn");

const media = window.matchMedia("(width < 500px)");

media.addEventListener("change", e => updateNavbar(e));

function updateNavbar(e) {
    const isMobile = e.matches;

    if (isMobile) {
        navbar.setAttribute('inert', '');
    } else {
        navbar.removeAttribute('inert');
    }
}

function openSidebar() {
    navbar.classList.add("show");
    openBtn.setAttribute("aria-expanded", "true");
    navbar.removeAttribute('inert');
}

function closeSidebar() {
    navbar.classList.remove("show");
    openBtn.setAttribute("aria-expanded", "false");
    navbar.setAttribute('inert', '');
}

// closes the sidebar if a link is clicked.
navLinks.forEach(link => {
    link.addEventListener("click", () => {
        // Only close sidebar in mobile view.
        if (media.matches) {
            closeSidebar();
        }
    });
});

window.onscroll = function () {
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        topBtn.style.display = "flex";
    } else {
        topBtn.style.display = "none";
    }
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}