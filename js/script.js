// Carousel

let slideIndex = 0;
const slides = document.querySelectorAll(".slides img");

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove("active"));
    slides[index].classList.add("active");
}

if (slides.length > 0) {
    showSlide(slideIndex);

    const nextBtn = document.querySelector(".next");
    const prevBtn = document.querySelector(".prev");

    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            slideIndex = (slideIndex + 1) % slides.length;
            showSlide(slideIndex);
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener("click", () => {
            slideIndex = (slideIndex - 1 + slides.length) % slides.length;
            showSlide(slideIndex);
        });
    }

    setInterval(() => {
        slideIndex = (slideIndex + 1) % slides.length;
        showSlide(slideIndex);
    }, 4000);
}

// Formulzaire de contact

const form = document.getElementById("contactForm");

if (form) {
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = form.querySelector("input[type='text']").value.trim();
        const email = form.querySelector("input[type='email']").value.trim();
        const message = form.querySelector("textarea").value.trim();

        if (name === "" || email === "" || message === "") {
            alert("Veuillez remplir tous les champs");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            alert("Veuillez entrer un email valide");
            return;
        }

        alert("Message envoyé avec succès !");
        form.reset();
    });
}

const menuIcon = document.querySelector(".menu-icon");
const nav = document.querySelector("nav");

if (menuIcon && nav) {
    menuIcon.addEventListener("click", () => {
        nav.classList.toggle("active");
    });
}

// Boutons popup

const popup = document.getElementById("popup");
const popupTitle = document.getElementById("popup-title");
const popupText = document.getElementById("popup-text");
const closeBtn = document.querySelector(".close");

document.querySelectorAll(".open-popup").forEach(button => {
button.addEventListener("click", () => {
popupTitle.textContent = button.dataset.title;
popupText.textContent = button.dataset.text;
popup.style.display = "flex";
});
});

if(closeBtn){
closeBtn.addEventListener("click", () => {
popup.style.display = "none";
});
}

window.addEventListener("click", (e) => {
if(e.target === popup){
popup.style.display = "none";
}
});

// Side menu

const menuBtn = document.querySelector(".menu-icon");
const sideMenu = document.getElementById("sideMenu");
const overlay = document.getElementById("overlay");

if(menuBtn && sideMenu){

menuBtn.addEventListener("click", (e) => {
e.stopPropagation();
sideMenu.classList.toggle("active");
overlay.classList.toggle("active");
});

overlay.addEventListener("click", closeMenu);

document.addEventListener("click", (e) => {
if (!sideMenu.contains(e.target) && !menuBtn.contains(e.target)) {
closeMenu();
}
});

}

function closeMenu(){
sideMenu.classList.remove("active");
overlay.classList.remove("active");
}