/* ============================== */
/* BIRTHDAY WEBSITE — SCRIPT.JS   */
/* ============================== */

/* ============================== */
/* 🔐 CHANGE YOUR PASSWORD HERE   */
/* ============================== */
const correctPassword = "09282004";

/* ======================================= */
/* ✏️  CHANGE RECIPIENT NAME HERE (optional)
   (also changeable directly in index.html) */
/* ======================================= */
// const recipientName = "My Dearest One";

/* ============================== */
/* PASSWORD SCREEN LOGIC          */
/* ============================== */
function checkPassword() {
  const input = document.getElementById("password-input");
  const errorMsg = document.getElementById("error-msg");
  const inputWrap = document.getElementById("input-wrap");
  const lockIcon = document.getElementById("lock-icon");
  const entered = input.value.trim();

  if (entered === correctPassword) {
    // Correct — trigger unlock animation
    lockIcon.textContent = "🔓";
    lockIcon.classList.add("unlocked");
    errorMsg.textContent = "";
    input.disabled = true;
    document.getElementById("unlock-btn").disabled = true;

    // Mini confetti burst on password screen
    spawnConfetti(40, document.getElementById("password-screen"));

    setTimeout(() => {
      switchScreen("password-screen", "opening-screen");
      spawnConfetti(60);
    }, 1000);

  } else {
    // Wrong password
    errorMsg.textContent = "Oops! That's not the secret password. Try again! 💜✨";
    inputWrap.classList.remove("shake");
    void inputWrap.offsetWidth; // reflow to restart animation
    inputWrap.classList.add("shake");
    input.value = "";
    input.focus();

    setTimeout(() => {
      inputWrap.classList.remove("shake");
    }, 500);
  }
}

// Allow pressing Enter to submit password
document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("password-input");
  if (input) {
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") checkPassword();
    });
  }

  // Scroll reveal observer
  setupScrollReveal();

  // Spawn ambient floating hearts in main content
  spawnAmbientHearts();
});

/* ============================== */
/* SCREEN SWITCHING               */
/* ============================== */
function switchScreen(fromId, toId) {
  const fromEl = document.getElementById(fromId);
  const toEl   = document.getElementById(toId);

  // Fade out
  fromEl.style.transition = "opacity .6s ease";
  fromEl.style.opacity = "0";

  setTimeout(() => {
    fromEl.classList.remove("active");
    fromEl.style.opacity = "";
    fromEl.style.transition = "";

    toEl.style.opacity = "0";
    toEl.classList.add("active");
    // Force reflow
    void toEl.offsetWidth;
    toEl.style.transition = "opacity .6s ease";
    toEl.style.opacity = "1";

    setTimeout(() => {
      toEl.style.transition = "";
      toEl.style.opacity = "";
    }, 650);
  }, 600);
}

/* ============================== */
/* OPEN LETTER BUTTON             */
/* ============================== */
function openLetter() {
  const btn = document.getElementById("open-letter-btn");
  btn.textContent = "Opening... 💌✨";
  btn.disabled = true;

  // Letter open animation — scale card out then switch
  const card = btn.closest(".opening-card");
  card.style.transition = "transform .5s ease, opacity .5s ease";
  card.style.transform = "scale(1.1) rotate(2deg)";
  card.style.opacity = "0";

  spawnConfetti(80);

  setTimeout(() => {
    switchScreen("opening-screen", "main-content");
    // Trigger initial reveal for elements in view
    setTimeout(() => {
      triggerVisibleReveals();
    }, 300);
  }, 600);
}

/* ============================== */
/* SCROLL REVEAL                  */
/* ============================== */
function setupScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger children of gallery
        if (entry.target.classList.contains("reveal-child")) {
          setTimeout(() => {
            entry.target.classList.add("visible");
          }, 80 * Array.from(entry.target.parentElement.children).indexOf(entry.target));
        } else {
          entry.target.classList.add("visible");
        }
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".reveal, .reveal-child").forEach(el => observer.observe(el));
}

function triggerVisibleReveals() {
  // Re-run observer to catch elements already in view
  document.querySelectorAll(".reveal:not(.visible), .reveal-child:not(.visible)").forEach((el, i) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.95) {
      setTimeout(() => el.classList.add("visible"), i * 80);
    }
  });
}

/* ============================== */
/* 🎉 CONFETTI                    */
/* ============================== */
const confettiColors = [
  "#8B5CF6","#6D28D9","#C4B5FD","#DDD6FE",
  "#FBCFE8","#F9A8D4","#FDE68A","#A7F3D0",
  "#ffffff","#e879f9"
];

function spawnConfetti(count = 60, container = document.body) {
  for (let i = 0; i < count; i++) {
    const piece = document.createElement("div");
    piece.classList.add("confetti-piece");
    const size = Math.random() * 10 + 6;
    piece.style.cssText = `
      left: ${Math.random() * 100}vw;
      top: -20px;
      width: ${size}px;
      height: ${size}px;
      background: ${confettiColors[Math.floor(Math.random() * confettiColors.length)]};
      border-radius: ${Math.random() > 0.5 ? "50%" : "2px"};
      animation-duration: ${Math.random() * 2 + 2}s;
      animation-delay: ${Math.random() * 1}s;
      transform: rotate(${Math.random() * 360}deg);
    `;
    document.body.appendChild(piece);
    piece.addEventListener("animationend", () => piece.remove());
  }
}

/* ============================== */
/* 💜 AMBIENT FLOATING HEARTS     */
/* ============================== */
const ambientEmojis = ["💜","💗","✨","⭐","🌸","💫","🎈","💖"];

function spawnAmbientHearts() {
  const container = document.getElementById("ambient-hearts");
  if (!container) return;

  setInterval(() => {
    const heart = document.createElement("div");
    heart.classList.add("ambient-heart");
    heart.textContent = ambientEmojis[Math.floor(Math.random() * ambientEmojis.length)];
    const duration = Math.random() * 8 + 8;
    heart.style.cssText = `
      left: ${Math.random() * 100}%;
      font-size: ${Math.random() * 1.2 + 0.8}rem;
      animation-duration: ${duration}s;
      animation-delay: 0s;
    `;
    container.appendChild(heart);
    setTimeout(() => heart.remove(), duration * 1000 + 500);
  }, 1200);
}

/* ============================== */
/* 🎁 SURPRISE BUTTON             */
/* ============================== */
function triggerSurprise() {
  const btn   = document.getElementById("surprise-btn");
  const msg   = document.getElementById("surprise-message");

  btn.textContent = "🎉 Surprise! 💜";
  btn.disabled = true;

  // Big confetti burst
  spawnConfetti(120);

  // Float a bunch of hearts across screen
  spawnFloatingHearts(30);

  // Show message
  msg.classList.add("show");

  // Scroll to it
  setTimeout(() => {
    msg.scrollIntoView({ behavior: "smooth", block: "center" });
  }, 300);

  // Extra confetti waves
  setTimeout(() => spawnConfetti(80), 700);
  setTimeout(() => spawnConfetti(60), 1400);
}

function spawnFloatingHearts(count) {
  const hearts = ["💜","💗","💖","💕","✨","⭐","🌸","💫"];
  for (let i = 0; i < count; i++) {
    const h = document.createElement("div");
    h.style.cssText = `
      position: fixed;
      z-index: 9999;
      pointer-events: none;
      font-size: ${Math.random() * 1.5 + 1.2}rem;
      left: ${Math.random() * 100}vw;
      bottom: -50px;
      animation: ambientFloat ${Math.random() * 3 + 3}s ease forwards;
      animation-delay: ${Math.random() * 1.5}s;
    `;
    h.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    document.body.appendChild(h);
    setTimeout(() => h.remove(), 7000);
  }
}
