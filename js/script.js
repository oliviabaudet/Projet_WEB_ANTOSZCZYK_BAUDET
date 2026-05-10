let slideIndex = 0;
const slides = document.querySelectorAll(".slides img");
const dotsContainer = document.querySelector(".dots");

let autoSlide;
let dots = [];

function showSlide(index) {
    if (!slides.length) return;

    slideIndex = index;

    slides.forEach(slide => slide.classList.remove("active"));
    slides[slideIndex].classList.add("active");

    if (dots.length > 0) {
        dots.forEach(dot => dot.classList.remove("active"));
        if (dots[slideIndex]) {
            dots[slideIndex].classList.add("active");
        }
    }
}

function nextSlide() {
    slideIndex = (slideIndex + 1) % slides.length;
    showSlide(slideIndex);
}

function startAutoSlide() {
    autoSlide = setInterval(nextSlide, 4000);
}

function resetAutoSlide() {
    clearInterval(autoSlide);
    startAutoSlide();
}

if (slides.length > 0) {

    if (dotsContainer) {
        slides.forEach((_, index) => {
            const dot = document.createElement("div");
            dot.classList.add("dot");

            dot.addEventListener("click", () => {
                showSlide(index);
                resetAutoSlide();
            });

            dotsContainer.appendChild(dot);
            dots.push(dot);
        });
    }

    showSlide(0);
    startAutoSlide();

    const nextBtn = document.querySelector(".next");
    const prevBtn = document.querySelector(".prev");

    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            nextSlide();
            resetAutoSlide();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener("click", () => {
            slideIndex = (slideIndex - 1 + slides.length) % slides.length;
            showSlide(slideIndex);
            resetAutoSlide();
        });
    }
}

const form = document.getElementById("contactForm");

if (form) {
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const email = form.querySelector('input[type="email"]').value.trim();
        const nom = form.querySelectorAll('input')[1].value.trim();
        const prenom = form.querySelectorAll('input')[2].value.trim();
        const sujet = form.querySelector('input[type="text"]').value.trim();
        const description = form.querySelector("textarea").value.trim();

        if (!email || !nom || !prenom || !sujet || !description) {
            alert("Veuillez remplir tous les champs obligatoires (*)");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            alert("Veuillez entrer un email valide");
            return;
        }

        alert("Demande envoyée avec succès !");
        form.reset();
    });
}


const popup = document.getElementById("popup");
const popupLink = document.getElementById("popup-link");
const popupImg = document.getElementById("popup-img");
const popupName = document.getElementById("popup-name");
const popupSubject = document.getElementById("popup-subject");
const popupText = document.getElementById("popup-text");
const popupEmail = document.getElementById("popup-email");
const popupHours = document.getElementById("popup-hours");
const popupContact = document.getElementById("popup-contact");
const closeBtn = document.querySelector(".close");

document.querySelectorAll(".open-popup").forEach(btn => {
    btn.addEventListener("click", () => {

        popupName.textContent = btn.dataset.name || "";
        popupSubject.textContent = btn.dataset.subject || "";
        popupText.textContent = btn.dataset.text || "";

        if (popupImg) {
            if (btn.dataset.img) {
                popupImg.src = btn.dataset.img;
                popupImg.style.display = "block";
            } else {
                popupImg.style.display = "none";
            }
        }

        if (popupEmail && popupEmail.parentElement) {
            if (btn.dataset.email) {
                popupEmail.textContent = btn.dataset.email;
                popupEmail.parentElement.style.display = "block";
            } else {
                popupEmail.parentElement.style.display = "none";
            }
        }

        if (popupHours && popupHours.parentElement) {
            if (btn.dataset.hours) {
                popupHours.textContent = btn.dataset.hours;
                popupHours.parentElement.style.display = "block";
            } else {
                popupHours.parentElement.style.display = "none";
            }
        }

        if (popupContact && btn.dataset.email) {
            popupContact.href = "contact.html?dest=" + encodeURIComponent(btn.dataset.email);
        }

        if (popupLink) {

            if (btn.dataset.link) {

                popupLink.href = btn.dataset.link;
                popupLink.style.display = "inline-block";

            } 
            
            else {

                popupLink.style.display = "none";

            }
        }

        popup.style.display = "flex";
    });
});

if (closeBtn) {
    closeBtn.addEventListener("click", () => {
        popup.style.display = "none";
    });
}

window.addEventListener("click", (e) => {
    if (e.target === popup) {
        popup.style.display = "none";
    }
});


const menuBtn = document.querySelector(".menu-icon");
const sideMenu = document.getElementById("sideMenu");
const overlay = document.getElementById("overlay");

if (menuBtn && sideMenu && overlay) {

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

function closeMenu() {
    sideMenu.classList.remove("active");
    overlay.classList.remove("active");
}

const hackathonForm = document.getElementById("hackathonForm");

if (hackathonForm) {

    hackathonForm.addEventListener("submit", function(e) {

        e.preventDefault();

        const checkboxes = document.querySelectorAll('input[name="langages"]');

        let checked = false;

        checkboxes.forEach(box => {
            if (box.checked) {
                checked = true;
            }
        });

        if (!checked) {
            alert("Veuillez sélectionner au moins un langage.");
            return;
        }

        alert("Inscription envoyée avec succès !");
        hackathonForm.reset();

    });

}

const accButtons = document.querySelectorAll(".accordion-btn");

accButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const content = btn.nextElementSibling;

        if (content.style.display === "block") {
            content.style.display = "none";
        } else {
            content.style.display = "block";
        }
    });
});

const jours = [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi"
];

const aujourdHui = new Date();
const jourActuel = jours[aujourdHui.getDay()];

document.getElementById("todayBadge").textContent =
    `Semaine active — ${jourActuel}`;