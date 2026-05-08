// =======================
// CAROUSEL
// =======================

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

// INIT CAROUSEL
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


// =======================
// FORMULAIRE CONTACT
// =======================

const form = document.getElementById("contactForm");

if (form) {
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const objet = document.getElementById("objet").value.trim();
        const email = document.getElementById("destinataire").value.trim();
        const message = form.querySelector("textarea").value.trim();

        if (objet === "" || email === "" || message === "") {
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


// =======================
// POPUP
// =======================

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

        // TEXTE
        popupName.textContent = btn.dataset.name || "";
        popupSubject.textContent = btn.dataset.subject || "";
        popupText.textContent = btn.dataset.text || "";

        // IMAGE
        if (popupImg) {
            if (btn.dataset.img) {
                popupImg.src = btn.dataset.img;
                popupImg.style.display = "block";
            } else {
                popupImg.style.display = "none";
            }
        }

        // EMAIL
        if (popupEmail && popupEmail.parentElement) {
            if (btn.dataset.email) {
                popupEmail.textContent = btn.dataset.email;
                popupEmail.parentElement.style.display = "block";
            } else {
                popupEmail.parentElement.style.display = "none";
            }
        }

        // HORAIRES
        if (popupHours && popupHours.parentElement) {
            if (btn.dataset.hours) {
                popupHours.textContent = btn.dataset.hours;
                popupHours.parentElement.style.display = "block";
            } else {
                popupHours.parentElement.style.display = "none";
            }
        }

        // 🔥 AUTO EMAIL VERS CONTACT
        if (popupContact && btn.dataset.email) {
            popupContact.href = "contact.html?dest=" + encodeURIComponent(btn.dataset.email);
        }

        // Lien vers équipe (cours)
        if (popupLink && btn.dataset.link) {
            popupLink.href = btn.dataset.link;
        }

        popup.style.display = "flex";
    });
});

// FERMETURE POPUP
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


// =======================
// SIDE MENU
// =======================

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


// =======================
// DESTINATAIRE AUTO (CONTACT PAGE)
// =======================

const params = new URLSearchParams(window.location.search);
const dest = params.get("dest");

const inputDest = document.getElementById("destinataire");

if (dest && inputDest) {
    inputDest.value = dest;
}

// =======================
// FORMULAIRE HACKATHON
// =======================

const hackathonForm = document.getElementById("hackathonForm");

if (hackathonForm) {

    hackathonForm.addEventListener("submit", function(e) {

        e.preventDefault();

        // Vérifie au moins un langage
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