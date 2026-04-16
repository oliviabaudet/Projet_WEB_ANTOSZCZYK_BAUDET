// CAROUSEL
let slideIndex = 0;
const slides = document.querySelectorAll(".slides img");

function showSlide(index) {
slides.forEach(slide => slide.classList.remove("active"));
slides[index].classList.add("active");
}

if(slides.length > 0){
showSlide(slideIndex);

document.querySelector(".next").addEventListener("click", () => {
slideIndex = (slideIndex + 1) % slides.length;
showSlide(slideIndex);
});

document.querySelector(".prev").addEventListener("click", () => {
slideIndex = (slideIndex - 1 + slides.length) % slides.length;
showSlide(slideIndex);
});
}

// FORM VALIDATION
const form = document.getElementById("contactForm");

if(form){
form.addEventListener("submit", function(e){
e.preventDefault();
alert("Message envoyé !");
});
}