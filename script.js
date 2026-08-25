/* =========================================================
   PAGE LOADER
========================================================= */

window.addEventListener("load", () => {

    setTimeout(() => {

        document
            .getElementById("loader")
            .classList.add("hide");

    }, 1800);

});


/* =========================================================
   NAVBAR SCROLL
========================================================= */

window.addEventListener("scroll", () => {

    const navbar = document.querySelector(".navbar");

    if (window.scrollY > 80) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

});


/* =========================================================
   MOBILE MENU
========================================================= */

const menuBtn = document.getElementById("menuBtn");

const nav = document.querySelector(".navbar nav");

menuBtn.addEventListener("click", () => {

    nav.classList.toggle("open");

});


document
    .querySelectorAll(".navbar nav a")
    .forEach(link => {

        link.addEventListener("click", () => {

            nav.classList.remove("open");

        });

    });


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements =
    document.querySelectorAll(".reveal");


const revealObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("active");

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },

        {
            threshold: 0.15
        }

    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* =========================================================
   WEDDING COUNTDOWN
========================================================= */

/*
   CHANGE THIS DATE

   Format:

   YYYY-MM-DDTHH:MM:SS

*/

const weddingDate =
    new Date("2026-12-25T10:30:00").getTime();


function updateCountdown() {

    const now =
        new Date().getTime();

    const distance =
        weddingDate - now;


    if (distance <= 0) {

        document.getElementById("days").innerText = "00";

        document.getElementById("hours").innerText = "00";

        document.getElementById("minutes").innerText = "00";

        document.getElementById("seconds").innerText = "00";

        return;

    }


    const days =
        Math.floor(
            distance /
            (1000 * 60 * 60 * 24)
        );


    const hours =
        Math.floor(
            (distance %
                (1000 * 60 * 60 * 24))
            /
            (1000 * 60 * 60)
        );


    const minutes =
        Math.floor(
            (distance %
                (1000 * 60 * 60))
            /
            (1000 * 60)
        );


    const seconds =
        Math.floor(
            (distance %
                (1000 * 60))
            /
            1000
        );


    document.getElementById("days").innerText =
        String(days).padStart(2, "0");


    document.getElementById("hours").innerText =
        String(hours).padStart(2, "0");


    document.getElementById("minutes").innerText =
        String(minutes).padStart(2, "0");


    document.getElementById("seconds").innerText =
        String(seconds).padStart(2, "0");

}


updateCountdown();

setInterval(updateCountdown, 1000);


/* =========================================================
   FALLING GOLD PETALS
========================================================= */

const petalsContainer =
    document.querySelector(".petals");


function createPetal() {

    const petal =
        document.createElement("div");

    petal.classList.add("petal");


    petal.style.left =
        Math.random() * 100 + "vw";


    petal.style.animationDuration =
        (5 + Math.random() * 7) + "s";


    petal.style.opacity =
        0.3 + Math.random() * 0.5;


    petal.style.transform =
        `rotate(${Math.random() * 360}deg)`;


    petalsContainer.appendChild(petal);


    setTimeout(() => {

        petal.remove();

    }, 13000);

}


setInterval(createPetal, 500);


/* =========================================================
   PARALLAX HERO
========================================================= */

window.addEventListener("scroll", () => {

    const hero =
        document.querySelector(".hero-content");

    if (!hero) return;


    const scroll =
        window.scrollY;


    if (scroll < window.innerHeight) {

        hero.style.transform =
            `translateY(${scroll * 0.15}px)`;

        hero.style.opacity =
            1 - scroll / 900;

    }

});


/* =========================================================
   MUSIC
========================================================= */

const music =
    document.getElementById("weddingMusic");

const musicBtn =
    document.getElementById("musicBtn");

let musicPlaying = false;


musicBtn.addEventListener("click", () => {

    if (!musicPlaying) {

        music.play()
            .then(() => {

                musicPlaying = true;

                musicBtn.innerText = "❚❚";

            })
            .catch(() => {

                alert(
                    "Please interact with the page first to enable music."
                );

            });

    } else {

        music.pause();

        musicPlaying = false;

        musicBtn.innerText = "♫";

    }

});


/* =========================================================
   GOLD CURSOR TRAIL
========================================================= */

document.addEventListener("mousemove", (event) => {

    const dot =
        document.createElement("div");

    dot.style.position = "fixed";

    dot.style.left =
        event.clientX + "px";

    dot.style.top =
        event.clientY + "px";

    dot.style.width = "4px";

    dot.style.height = "4px";

    dot.style.borderRadius = "50%";

    dot.style.background =
        "#e8c77b";

    dot.style.pointerEvents = "none";

    dot.style.zIndex = "9998";

    dot.style.opacity = ".5";

    dot.style.transition =
        "all .7s ease";

    document.body.appendChild(dot);


    requestAnimationFrame(() => {

        dot.style.transform =
            "scale(4)";

        dot.style.opacity = "0";

    });


    setTimeout(() => {

        dot.remove();

    }, 700);

});