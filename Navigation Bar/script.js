const navbar = document.getElementById("navbar");
const navLinks = document.querySelectorAll("#navbar a ");

function toggleSidebar() {
    navbar.classList.toggle("show-sidebar");
}

navLinks.forEach(link => {
    link.addEventListener("click", e => toggleSidebar());
});
