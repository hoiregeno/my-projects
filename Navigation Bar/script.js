const navbar = document.getElementById("navbar");
const navLinks = document.querySelectorAll("#navbar a ");
const openBtn = document.getElementById("open-sidebar-btn");
const topBtn = document.getElementById("top-btn");

function openSideBar() {
    navbar.classList.toggle("show-sidebar");
    openBtn.setAttribute("aria-hidden", "false");
}

function closeSideBar() {
    navbar.classList.toggle("show-sidebar");
    openBtn.setAttribute("aria-hidden", "true");
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