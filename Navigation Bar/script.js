const navbar = document.getElementById("navbar");
const navLinks = document.querySelectorAll("#navbar a ");
const topBtn = document.getElementById("top-btn");

function toggleSidebar() {
    navbar.classList.toggle("show-sidebar");
}

navLinks.forEach(link => {
    link.addEventListener("click", e => toggleSidebar());
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