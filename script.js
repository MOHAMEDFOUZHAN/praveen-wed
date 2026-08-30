/* =========================================================
   PAGE LOADER
========================================================= */
window.addEventListener("load", () => {
    setTimeout(() => {
        const loader = document.getElementById("loader");
        if (loader) {
            loader.classList.add("hide");
        }
    }, 1200);
});


/* =========================================================
   NAVBAR SCROLL & MOBILE MENU
========================================================= */
window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar");
    if (!navbar) return;
    if (window.scrollY > 60) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

if (menuBtn && navMenu) {
    menuBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        navMenu.classList.toggle("open");
    });

    navMenu.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("open");
        });
    });

    document.addEventListener("click", (e) => {
        if (navMenu.classList.contains("open") && !navMenu.contains(e.target) && e.target !== menuBtn) {
            navMenu.classList.remove("open");
        }
    });
}


/* =========================================================
   SCROLL REVEAL (IntersectionObserver)
========================================================= */
const revealElements = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                revealObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.12 }
);

revealElements.forEach(element => {
    revealObserver.observe(element);
});


/* =========================================================
   WEDDING COUNTDOWN TIMER
   Auspicious Muhurtham: September 17, 2026, 04:00 AM IST
========================================================= */
const weddingDate = new Date("2026-09-17T04:00:00+05:30").getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");
    const secondsEl = document.getElementById("seconds");

    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

    if (distance <= 0) {
        daysEl.innerText = "00";
        hoursEl.innerText = "00";
        minutesEl.innerText = "00";
        secondsEl.innerText = "00";
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.innerText = String(days).padStart(2, "0");
    hoursEl.innerText = String(hours).padStart(2, "0");
    minutesEl.innerText = String(minutes).padStart(2, "0");
    secondsEl.innerText = String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);


/* =========================================================
   AUDIO PLAYER WITH 30-SECOND LOOP (STARTING AT 53s)
   Requirement:
   - Start from 53 seconds (53s)
   - Duration: 30 seconds (ends at 53 + 30 = 83s)
   - Seamless loop between 53.0s and 83.0s
========================================================= */
const AUDIO_START = 53.0; // Starts at 53 seconds
const AUDIO_DURATION = 30.0; // 30 seconds duration
const AUDIO_END = AUDIO_START + AUDIO_DURATION; // 83 seconds

const audio = document.getElementById("weddingMusic");
const musicBtn = document.getElementById("musicBtn");
const musicBtnIcon = document.getElementById("musicBtnIcon");
const navMusicToggle = document.getElementById("navMusicToggle");
const heroPlayMusicBtn = document.getElementById("heroPlayMusicBtn");
const floatingWidget = document.getElementById("floatingMusicWidget");
const progressBar = document.getElementById("musicProgressBar");

let isPlaying = false;
let autoPlayAttempted = false;

function setAudioUIState(playing) {
    isPlaying = playing;
    if (musicBtnIcon) {
        musicBtnIcon.innerText = playing ? "❚❚" : "♫";
    }
    if (floatingWidget) {
        if (playing) {
            floatingWidget.classList.add("playing");
        } else {
            floatingWidget.classList.remove("playing");
        }
    }
    if (navMusicToggle) {
        if (playing) {
            navMusicToggle.classList.add("playing");
            navMusicToggle.querySelector(".music-status-text").innerText = "Playing ♫";
        } else {
            navMusicToggle.classList.remove("playing");
            navMusicToggle.querySelector(".music-status-text").innerText = "Song (0:30)";
        }
    }
    if (heroPlayMusicBtn) {
        heroPlayMusicBtn.querySelector("span:last-child").innerText = playing ? "Pause Music" : "Play Wedding Music";
    }
}

function playAudioLoop() {
    if (!audio) return;

    if (audio.currentTime < AUDIO_START || audio.currentTime >= AUDIO_END) {
        audio.currentTime = AUDIO_START;
    }

    const playPromise = audio.play();
    if (playPromise !== undefined) {
        playPromise
            .then(() => {
                setAudioUIState(true);
            })
            .catch(() => {
                setAudioUIState(false);
            });
    }
}

function pauseAudioLoop() {
    if (!audio) return;
    audio.pause();
    setAudioUIState(false);
}

function toggleAudio() {
    if (isPlaying) {
        pauseAudioLoop();
    } else {
        playAudioLoop();
    }
}

if (audio) {
    // Ensure initial time is set once metadata loads
    audio.addEventListener("loadedmetadata", () => {
        if (audio.currentTime < AUDIO_START) {
            audio.currentTime = AUDIO_START;
        }
    });

    // Time update listener enforcing the 53s - 83s loop window
    audio.addEventListener("timeupdate", () => {
        if (audio.currentTime >= AUDIO_END) {
            audio.currentTime = AUDIO_START;
            if (isPlaying) {
                audio.play().catch(() => {});
            }
        } else if (audio.currentTime < AUDIO_START - 1) {
            audio.currentTime = AUDIO_START;
        }

        // Update progress indicator (0% to 100% of the 30-second window)
        if (progressBar) {
            const currentSlice = Math.max(0, Math.min(AUDIO_DURATION, audio.currentTime - AUDIO_START));
            const pct = (currentSlice / AUDIO_DURATION) * 100;
            progressBar.style.width = `${pct}%`;
        }
    });

    audio.addEventListener("ended", () => {
        audio.currentTime = AUDIO_START;
        if (isPlaying) {
            audio.play().catch(() => {});
        }
    });
}

// Button event listeners
if (musicBtn) {
    musicBtn.addEventListener("click", toggleAudio);
}

if (navMusicToggle) {
    navMusicToggle.addEventListener("click", toggleAudio);
}

if (heroPlayMusicBtn) {
    heroPlayMusicBtn.addEventListener("click", toggleAudio);
}

// Auto-start on first user interaction anywhere on the document
function tryAutoPlayOnFirstInteraction() {
    if (autoPlayAttempted) return;
    autoPlayAttempted = true;

    if (audio && !isPlaying) {
        playAudioLoop();
    }

    document.removeEventListener("click", tryAutoPlayOnFirstInteraction);
    document.removeEventListener("touchstart", tryAutoPlayOnFirstInteraction);
}

document.addEventListener("click", tryAutoPlayOnFirstInteraction, { once: true });
document.addEventListener("touchstart", tryAutoPlayOnFirstInteraction, { once: true });


/* =========================================================
   FALLING GOLD PETALS
========================================================= */
const petalsContainer = document.querySelector(".petals");

function createPetal() {
    if (!petalsContainer) return;

    const petal = document.createElement("div");
    petal.classList.add("petal");

    petal.style.left = Math.random() * 100 + "vw";
    petal.style.animationDuration = (6 + Math.random() * 6) + "s";
    petal.style.opacity = (0.35 + Math.random() * 0.55).toString();
    petal.style.transform = `rotate(${Math.random() * 360}deg) scale(${0.7 + Math.random() * 0.6})`;

    petalsContainer.appendChild(petal);

    setTimeout(() => {
        petal.remove();
    }, 12000);
}

setInterval(createPetal, 450);


/* =========================================================
   CALENDAR INTEGRATION
========================================================= */
function addToGoogleCalendar() {
    // Muhurtham Event: Sept 17, 2026 04:00 to 05:00 IST (UTC: Sept 16, 2026 22:30 to 23:30)
    const title = encodeURIComponent("Wedding of J. Praveen & M. Keerthana (Muhurtham)");
    const details = encodeURIComponent(
        "Auspicious Wedding (Muhurtham) of Selvan J. Praveen (M.Com., M.B.A) & Selvi M. Keerthana (M.A., M.Phil., Ph.D.)\n" +
        "Venue: Baneer Kula Okkaligar Mahal, Kovai-Mettupalayam Road, Mathampalayam.\n" +
        "Solicited by Mr. D. Jaikumar & Mrs. J. Shanthi (Jai Agencies, Coonoor)"
    );
    const location = encodeURIComponent("Baneer Kula Okkaligar Mahal, Kovai-Mettupalayam Road, Mathampalayam, Coimbatore, Tamil Nadu");
    // Format: YYYYMMDDTHHMMSSZ (UTC: 20260916T223000Z / 20260916T233000Z)
    const dates = "20260916T223000Z/20260916T233000Z";

    const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
    window.open(gcalUrl, "_blank");
}

function downloadICal() {
    const icsContent =
`BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Praveen Keerthana Wedding//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
UID:praveen-keerthana-muhurtham-2026@wedding.com
DTSTAMP:20260830T000000Z
DTSTART:20260916T223000Z
DTEND:20260916T233000Z
SUMMARY:Wedding of J. Praveen & M. Keerthana (Muhurtham)
DESCRIPTION:Auspicious Wedding (Muhurtham) of Selvan J. Praveen & Selvi M. Keerthana at Baneer Kula Okkaligar Mahal, Mathampalayam.
LOCATION:Baneer Kula Okkaligar Mahal, Kovai-Mettupalayam Road, Mathampalayam, Coimbatore
STATUS:CONFIRMED
END:VEVENT
BEGIN:VEVENT
UID:praveen-keerthana-reception-2026@wedding.com
DTSTAMP:20260830T000000Z
DTSTART:20260916T123000Z
DTEND:20260916T153000Z
SUMMARY:Wedding Reception of J. Praveen & M. Keerthana
DESCRIPTION:Grand Wedding Reception of Selvan J. Praveen & Selvi M. Keerthana at Baneer Kula Okkaligar Mahal, Mathampalayam.
LOCATION:Baneer Kula Okkaligar Mahal, Kovai-Mettupalayam Road, Mathampalayam, Coimbatore
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", "Praveen_Keerthana_Wedding.ics");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}


/* =========================================================
   CELEBRATION FIREWORKS & BLESSINGS
========================================================= */
const canvas = document.getElementById("fireworksCanvas");
let ctx = canvas ? canvas.getContext("2d") : null;
let particles = [];

function resizeCanvas() {
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function triggerBlessingShower() {
    if (!canvas || !ctx) return;
    const colors = ["#ffd978", "#e8c77b", "#c99a45", "#ff6b81", "#ffffff", "#ff4757"];

    for (let i = 0; i < 80; i++) {
        particles.push({
            x: window.innerWidth / 2 + (Math.random() - 0.5) * 200,
            y: window.innerHeight * 0.7,
            vx: (Math.random() - 0.5) * 12,
            vy: -Math.random() * 14 - 4,
            size: Math.random() * 6 + 3,
            color: colors[Math.floor(Math.random() * colors.length)],
            alpha: 1,
            rotation: Math.random() * 360,
            rotSpeed: (Math.random() - 0.5) * 10
        });
    }
}

function animateParticles() {
    if (!ctx || !canvas) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.35; // gravity
        p.alpha -= 0.015;
        p.rotation += p.rotSpeed;

        if (p.alpha <= 0) {
            particles.splice(i, 1);
            continue;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
    }

    requestAnimationFrame(animateParticles);
}

animateParticles();

// Interactive Send Wish form
const sendWishBtn = document.getElementById("sendWishBtn");
const guestName = document.getElementById("guestName");
const guestMessage = document.getElementById("guestMessage");
const wishSuccessMsg = document.getElementById("wishSuccessMsg");

if (sendWishBtn) {
    sendWishBtn.addEventListener("click", () => {
        const name = guestName ? guestName.value.trim() : "";
        const msg = guestMessage ? guestMessage.value.trim() : "";

        if (!name) {
            alert("Please enter your name to send your blessing.");
            if (guestName) guestName.focus();
            return;
        }

        triggerBlessingShower();

        if (wishSuccessMsg) {
            wishSuccessMsg.innerText = `🌸 Thank you ${name}! Your blessings have been showered upon Praveen & Keerthana!`;
            wishSuccessMsg.style.display = "block";
        }

        if (guestName) guestName.value = "";
        if (guestMessage) guestMessage.value = "";

        setTimeout(() => {
            triggerBlessingShower();
        }, 300);
    });
}