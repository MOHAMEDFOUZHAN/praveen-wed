/* =========================================================
   ROYAL WEDDING GRATITUDE EXPERIENCE — JAVASCRIPT
   Praveen & Keerthana • September 2026
========================================================= */

// Page Loader Fade-out
window.addEventListener("load", () => {
    setTimeout(() => {
        const loader = document.getElementById("loader");
        if (loader) {
            loader.classList.add("hide");
        }
    }, 900);
});


/* =========================================================
   BILINGUAL LANGUAGE TOGGLE (ENGLISH / TAMIL)
========================================================= */
function switchLanguage(lang) {
    const btnEn = document.getElementById("btnLangEn");
    const btnTa = document.getElementById("btnLangTa");
    const contentEn = document.getElementById("contentEn");
    const contentTa = document.getElementById("contentTa");
    const showerBtnText = document.getElementById("showerBtnText");
    const heroThankYouScript = document.getElementById("heroThankYouScript");
    const heroThankYouTitle = document.getElementById("heroThankYouTitle");
    const heroThankYouSub = document.getElementById("heroThankYouSub");

    if (lang === "ta") {
        if (btnTa) btnTa.classList.add("active");
        if (btnEn) btnEn.classList.remove("active");
        if (contentTa) contentTa.classList.remove("hidden");
        if (contentEn) contentEn.classList.add("hidden");
        if (showerBtnText) showerBtnText.innerText = "மலர் & அட்சதை தூவ";
        if (heroThankYouScript) heroThankYouScript.innerText = "இதயம் கனிந்த";
        if (heroThankYouTitle) heroThankYouTitle.innerText = "மனமார்ந்த நன்றிகள்";
        if (heroThankYouSub) heroThankYouSub.innerText = "எங்கள் திருமண நன்னாளில் நேரில் வருகை தந்து, மனதார வாழ்த்தி ஆசீர்வதித்த அனைத்து நல்உள்ளங்களுக்கும் எங்களது நெஞ்சார்ந்த நன்றிகள்.";
    } else {
        if (btnEn) btnEn.classList.add("active");
        if (btnTa) btnTa.classList.remove("active");
        if (contentEn) contentEn.classList.remove("hidden");
        if (contentTa) contentTa.classList.add("hidden");
        if (showerBtnText) showerBtnText.innerText = "Shower Blessings & Flowers";
        if (heroThankYouScript) heroThankYouScript.innerText = "With Sincere Gratitude";
        if (heroThankYouTitle) heroThankYouTitle.innerText = "THANK YOU";
        if (heroThankYouSub) heroThankYouSub.innerText = "Thank you from the bottom of our hearts for showering your sacred blessings, presence, and love upon our wedding.";
    }

    // Gentle particle burst on switch
    triggerCelebrationAkshathai(window.innerWidth / 2, window.innerHeight * 0.45);
}

// Attach event listeners for robust cross-browser support
const btnLangEn = document.getElementById("btnLangEn");
const btnLangTa = document.getElementById("btnLangTa");
if (btnLangEn) btnLangEn.addEventListener("click", () => switchLanguage("en"));
if (btnLangTa) btnLangTa.addEventListener("click", () => switchLanguage("ta"));



/* =========================================================
   AUDIO PLAYER WITH 30-SECOND LOOP (STARTING AT 53s)
========================================================= */
const AUDIO_START = 53.0; // 53 seconds
const AUDIO_DURATION = 30.0; // 30 seconds
const AUDIO_END = AUDIO_START + AUDIO_DURATION; // 83 seconds

const audio = document.getElementById("weddingMusic");
const musicBtn = document.getElementById("musicBtn");
const musicBtnIcon = document.getElementById("musicBtnIcon");
const topMusicBtn = document.getElementById("topMusicBtn");
const topMusicIcon = document.getElementById("topMusicIcon");
const topMusicText = document.getElementById("topMusicText");
const floatingWidget = document.getElementById("floatingMusicWidget");
const progressBar = document.getElementById("musicProgressBar");

let isPlaying = false;
let autoPlayAttempted = false;

function setAudioUIState(playing) {
    isPlaying = playing;

    // Floating widget icons
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

    // Top bar music button
    if (topMusicBtn) {
        if (playing) {
            topMusicBtn.classList.add("playing");
            if (topMusicIcon) topMusicIcon.innerText = "❚❚";
            if (topMusicText) topMusicText.innerText = "Pause Song";
        } else {
            topMusicBtn.classList.remove("playing");
            if (topMusicIcon) topMusicIcon.innerText = "♫";
            if (topMusicText) topMusicText.innerText = "Play Song";
        }
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
    audio.addEventListener("loadedmetadata", () => {
        if (audio.currentTime < AUDIO_START) {
            audio.currentTime = AUDIO_START;
        }
    });

    audio.addEventListener("timeupdate", () => {
        if (audio.currentTime >= AUDIO_END) {
            audio.currentTime = AUDIO_START;
            if (isPlaying) {
                audio.play().catch(() => {});
            }
        } else if (audio.currentTime < AUDIO_START - 1) {
            audio.currentTime = AUDIO_START;
        }

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

if (musicBtn) {
    musicBtn.addEventListener("click", toggleAudio);
}

if (topMusicBtn) {
    topMusicBtn.addEventListener("click", toggleAudio);
}

// Gentle auto-play on first tap or click anywhere
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
   FALLING BACKGROUND GOLD PETALS
========================================================= */
const petalsContainer = document.querySelector(".petals");

function createPetal() {
    if (!petalsContainer) return;

    const petal = document.createElement("div");
    petal.classList.add("petal");

    petal.style.left = Math.random() * 100 + "vw";
    petal.style.animationDuration = (7 + Math.random() * 6) + "s";
    petal.style.opacity = (0.3 + Math.random() * 0.5).toString();
    petal.style.transform = `rotate(${Math.random() * 360}deg) scale(${0.7 + Math.random() * 0.6})`;

    petalsContainer.appendChild(petal);

    setTimeout(() => {
        petal.remove();
    }, 13000);
}

setInterval(createPetal, 600);


/* =========================================================
   INTERACTIVE BLESSINGS SHOWER (AKSHATHAI, ROSES & SPARKS)
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

function triggerCelebrationAkshathai(customX, customY) {
    if (!canvas || !ctx) return;

    // Auspicious Colors: Turmeric gold rice, Champagne gold, Rose ruby, Jasmine cream, Starlight
    const colors = [
        "#ffd978", // Gold Akshathai
        "#f6c343", // Turmeric Yellow
        "#e8c77b", // Champagne Gold
        "#e63956", // Crimson Rose Petal
        "#ff6584", // Soft Rose Petal
        "#fffaf0", // Jasmine White
        "#ffffff"  // Starlight Sparkle
    ];

    const originX = customX !== undefined ? customX : window.innerWidth / 2 + (Math.random() - 0.5) * 200;
    const originY = customY !== undefined ? customY : window.innerHeight * 0.55;

    // Spawn 80 celebratory particles
    for (let i = 0; i < 80; i++) {
        const shapeType = Math.random() > 0.4 ? "rice" : (Math.random() > 0.4 ? "petal" : "star");
        particles.push({
            x: originX,
            y: originY,
            vx: (Math.random() - 0.5) * 16,
            vy: -Math.random() * 18 - 6,
            size: Math.random() * 6 + 3,
            color: colors[Math.floor(Math.random() * colors.length)],
            alpha: 1,
            rotation: Math.random() * 360,
            rotSpeed: (Math.random() - 0.5) * 14,
            shape: shapeType
        });
    }

    incrementBlessingsCounter(1);
}

function animateParticles() {
    if (!ctx || !canvas) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.42; // gentle gravity
        p.alpha -= 0.015;
        p.rotation += p.rotSpeed;

        if (p.alpha <= 0) {
            particles.splice(i, 1);
            continue;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;

        if (p.shape === "rice") {
            // Elliptical Akshathai grain
            ctx.beginPath();
            ctx.ellipse(0, 0, p.size * 0.45, p.size * 1.4, 0, 0, 2 * Math.PI);
            ctx.fill();
        } else if (p.shape === "petal") {
            // Soft curved rose petal
            ctx.beginPath();
            ctx.moveTo(0, -p.size);
            ctx.bezierCurveTo(p.size, -p.size * 0.5, p.size, p.size * 0.5, 0, p.size);
            ctx.bezierCurveTo(-p.size, p.size * 0.5, -p.size, -p.size * 0.5, 0, -p.size);
            ctx.fill();
        } else {
            // Sparkle star diamond
            ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        }

        ctx.restore();
    }

    requestAnimationFrame(animateParticles);
}

animateParticles();


/* =========================================================
   LIVE BLESSINGS COUNTER
========================================================= */
const BASE_BLESSINGS = 2150;
let currentBlessings = parseInt(localStorage.getItem("praveen_keerthana_gratitude_blessings") || BASE_BLESSINGS, 10);

function updateBlessingDisplay() {
    const display = document.getElementById("blessingCounterDisplay");
    if (display) {
        display.innerText = `${currentBlessings.toLocaleString()}+`;
    }
}

function incrementBlessingsCounter(amount = 1) {
    currentBlessings += amount;
    localStorage.setItem("praveen_keerthana_gratitude_blessings", currentBlessings);
    updateBlessingDisplay();
}

updateBlessingDisplay();


/* =========================================================
   INTERACTIVE BUTTON LISTENERS
========================================================= */
const cardShowerBtn = document.getElementById("cardShowerBtn");
if (cardShowerBtn) {
    cardShowerBtn.addEventListener("click", (e) => {
        triggerCelebrationAkshathai(e.clientX, e.clientY);
        setTimeout(() => {
            triggerCelebrationAkshathai(e.clientX + (Math.random() - 0.5) * 120, e.clientY - 60);
        }, 180);
    });
}

const waxSealBtn = document.getElementById("waxSealBtn");
if (waxSealBtn) {
    waxSealBtn.addEventListener("click", (e) => {
        const rect = waxSealBtn.getBoundingClientRect();
        triggerCelebrationAkshathai(rect.left + rect.width / 2, rect.top + rect.height / 2);
    });
}

// Clicking couple union badge also triggers celebratory petals
const coupleUnionBadge = document.getElementById("coupleUnionBadge");
if (coupleUnionBadge) {
    coupleUnionBadge.addEventListener("click", (e) => {
        const rect = coupleUnionBadge.getBoundingClientRect();
        triggerCelebrationAkshathai(rect.left + rect.width / 2, rect.top + rect.height / 2);
    });
}


/* =========================================================
   SHARE & COPY LINK HELPERS
========================================================= */
const copyLinkBtn = document.getElementById("copyLinkBtn");
const copyLinkText = document.getElementById("copyLinkText");

if (copyLinkBtn && copyLinkText) {
    copyLinkBtn.addEventListener("click", () => {
        const url = window.location.href;
        navigator.clipboard.writeText(url)
            .then(() => {
                copyLinkText.innerText = "Link Copied! ✨";
                triggerCelebrationAkshathai();
                setTimeout(() => {
                    copyLinkText.innerText = "Copy Link";
                }, 3000);
            })
            .catch(() => {
                copyLinkText.innerText = "Copied! ✨";
                setTimeout(() => {
                    copyLinkText.innerText = "Copy Link";
                }, 3000);
            });
    });
}

// Dynamic WhatsApp link
const shareWhatsAppBtn = document.getElementById("shareWhatsAppBtn");
if (shareWhatsAppBtn) {
    const pageUrl = encodeURIComponent(window.location.href);
    const baseHref = shareWhatsAppBtn.getAttribute("href");
    if (!baseHref.includes(pageUrl)) {
        shareWhatsAppBtn.setAttribute("href", baseHref + pageUrl);
    }
}