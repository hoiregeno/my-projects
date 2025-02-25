const navbar = document.getElementById("navbar");
const navLinks = document.querySelectorAll("#navbar a ");
const openBtn = document.getElementById("open-sidebar-btn");
const topBtn = document.getElementById("top-btn");

const media = window.matchMedia("(width < 600px)");

media.addEventListener("change", e => updateNavbar(e));

function updateNavbar(e) {
    const isMobile = e.matches;

    if (isMobile) {
        navbar.setAttribute("inert", '');
    }
    else {
        navbar.removeAttribute("inert");
    }
}

function openSideBar() {
    navbar.classList.add("show-sidebar");
    openBtn.setAttribute("aria-hidden", "false");
    navbar.removeAttribute("inert");
}

function closeSideBar() {
    navbar.classList.remove("show-sidebar");
    openBtn.setAttribute("aria-hidden", "true");
    navbar.setAttribute("inert", '');
}

navLinks.forEach(link => {
    link.addEventListener("click", () => closeSideBar());
});

window.onscroll = function () {
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        topBtn.style.display = "flex";
    }
    else {
        topBtn.style.display = "none";
    }
}

function backToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}