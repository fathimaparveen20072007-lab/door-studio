

/* =================================
   CINEMATIC INTRO
================================= */

const intro = document.getElementById("intro");
const door = document.getElementById("openingDoor");
const skip = document.getElementById("skipIntro");

let introDone = false;

function openDoor() {

    if (introDone) return;

    introDone = true;

    door.classList.add("open");

    setTimeout(() => {
        intro.classList.add("hide");
        document.body.style.overflow = "auto";
    }, 1900);

}

document.body.style.overflow = "hidden";

setTimeout(openDoor, 1100);

skip.addEventListener("click", openDoor);

/* =================================
   PAGE NAVIGATION
================================= */

const pages = document.querySelectorAll(".page");
const navButtons = document.querySelectorAll("[data-page]");
const navLinks = document.getElementById("navLinks");

function showPage(pageName) {

    const target = document.getElementById(pageName);

    if (!target) return;

    const current = document.querySelector(".page.active");

    if (current === target) return;

    if (current) {
        current.classList.add("leaving");

        setTimeout(() => {

            current.classList.remove("active", "leaving");

            target.classList.add("active");

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

            observeElements();

        }, 220);

    } else {
        target.classList.add("active");
        observeElements();
    }

    navButtons.forEach(button => {

        button.classList.toggle(
            "active",
            button.dataset.page === pageName
        );

    });

    navLinks.classList.remove("show");

}

/* Navigation click events */

document.querySelectorAll("[data-page], [data-go]").forEach(button => {

    button.addEventListener("click", event => {

        event.preventDefault();

        const pageName =
            button.dataset.page || button.dataset.go;

        showPage(pageName);

    });

});

/* Mobile menu */

document.getElementById("menuBtn")
.addEventListener("click", () => {

    navLinks.classList.toggle("show");

});

/* =================================
   SCROLL ANIMATIONS
================================= */

let observer;

function observeElements() {

    if (observer) observer.disconnect();

    observer = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                observer.unobserve(entry.target);

            }

        });

    }, {
        threshold: 0.12
    });

    document.querySelectorAll(
        ".page.active .reveal:not(.visible)"
    ).forEach(element => {

        observer.observe(element);

    });

}

observeElements();

/* =================================
   CONTACT FORM
================================= */

document.getElementById("contactForm")
.addEventListener("submit", event => {

    event.preventDefault();

    const name =
        document.getElementById("name").value;

    const phone =
        document.getElementById("phone").value;

    const email =
        document.getElementById("email").value;

    const interest =
        document.getElementById("interest").value;

    const message =
        document.getElementById("message").value;

    const subject = encodeURIComponent(
        "DoorStudio Enquiry - " + interest
    );

    const body = encodeURIComponent(
        `Name: ${name}\n` +
        `Phone: ${phone}\n` +
        `Email: ${email}\n` +
        `Interest: ${interest}\n\n` +
        `Message: ${message}`
    );

    document.getElementById("status").textContent =
        "Opening your email application...";

    window.location.href =
        `mailto:hello@doorstudio.in?subject=${subject}&body=${body}`;

});

/* =================================
   FOOTER YEAR
================================= */

document.getElementById("year").textContent =
    new Date().getFullYear();

