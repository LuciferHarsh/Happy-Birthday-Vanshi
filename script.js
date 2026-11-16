/* =====================================================
   SITE INTERACTIONS: SCROLL, COUNTDOWN, PHOTO VIEWER, CAKE
===================================================== */
(() => {
    "use strict";

    const scrollBtn = document.getElementById("scrollBtn");
    const countdownSection = document.getElementById("countdown");
    scrollBtn?.addEventListener("click", () => {
        countdownSection?.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    // Birthday: 18 November 2026, midnight India Standard Time.
    const birthdayDate = new Date("2026-11-18T00:00:00+05:30").getTime();
    const daysElement = document.getElementById("days");
    const hoursElement = document.getElementById("hours");
    const minutesElement = document.getElementById("minutes");
    const secondsElement = document.getElementById("seconds");
    const timerMessage = document.getElementById("timerMessage");

    function updateCountdown() {
        if (!daysElement || !hoursElement || !minutesElement || !secondsElement) return;
        const difference = birthdayDate - Date.now();
        if (difference <= 0) {
            daysElement.textContent = "000";
            hoursElement.textContent = "00";
            minutesElement.textContent = "00";
            secondsElement.textContent = "00";
            if (timerMessage) timerMessage.textContent = "Happy Birthday, Beautiful Soul! Today is your day!";
            return;
        }
        daysElement.textContent = String(Math.floor(difference / 86400000)).padStart(3, "0");
        hoursElement.textContent = String(Math.floor(difference / 3600000) % 24).padStart(2, "0");
        minutesElement.textContent = String(Math.floor(difference / 60000) % 60).padStart(2, "0");
        secondsElement.textContent = String(Math.floor(difference / 1000) % 60).padStart(2, "0");
    }
    updateCountdown();
    const countdownInterval = window.setInterval(() => {
        updateCountdown();
        if (Date.now() >= birthdayDate) window.clearInterval(countdownInterval);
    }, 1000);

    // Reveal countdown content when it enters the viewport.
    const countdownContent = document.querySelector(".countdown-content");
    if (countdownContent && "IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });
        observer.observe(countdownContent);
    } else {
        countdownContent?.classList.add("visible");
    }

    // Open every memory photograph in the lightbox.
    // Direct listeners also cover photos 7–9 on the reverse side of the 3D leaf.
    const lightbox = document.getElementById("memoryLightbox");
    const lightboxImage = document.getElementById("lightboxImage");
    const closeLightboxButton = document.getElementById("closeMemoryLightbox");
    let previouslyFocused = null;

    function openMemoryPhoto(photo) {
        if (!photo || !lightbox || !lightboxImage) return;
        const photoSource = photo.currentSrc || photo.getAttribute("src");
        if (!photoSource) return;

        previouslyFocused = photo;
        lightboxImage.src = photoSource;
        lightboxImage.alt = photo.alt || "Enlarged memory photograph";
        lightbox.classList.add("open");
        lightbox.setAttribute("aria-hidden", "false");
        document.body.classList.add("lightbox-open");
        closeLightboxButton?.focus();
    }

    function closeLightbox() {
        if (!lightbox || !lightboxImage) return;
        lightbox.classList.remove("open");
        lightbox.setAttribute("aria-hidden", "true");
        lightboxImage.removeAttribute("src");
        document.body.classList.remove("lightbox-open");
        previouslyFocused?.focus();
    }

    // Attach directly to all memory images, including the back-face images.
    document.querySelectorAll(".memories-section .memory-entry img").forEach(photo => {
        photo.style.cursor = "zoom-in";
        photo.tabIndex = 0;
        photo.setAttribute("role", "button");
        photo.setAttribute("aria-label", `Enlarge ${photo.alt || "memory photograph"}`);

        photo.addEventListener("click", event => {
            event.preventDefault();
            event.stopPropagation();
            openMemoryPhoto(photo);
        });

        photo.addEventListener("keydown", event => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openMemoryPhoto(photo);
            }
        });
    });

    closeLightboxButton?.addEventListener("click", closeLightbox);
    lightbox?.addEventListener("click", event => {
        if (event.target === lightbox) closeLightbox();
    });
    document.addEventListener("keydown", event => {
        if (event.key === "Escape" && lightbox?.classList.contains("open")) closeLightbox();
    });

    // Interactive birthday candles.
    const finale = document.getElementById("birthday-finale");
    if (!finale) return;
    const candles = [...finale.querySelectorAll(".candle")];
    const instruction = finale.querySelector("#candleInstruction");
    const birthdayWish = finale.querySelector("#birthdayWish");
    let blownCandles = 0;
    let celebrationStarted = false;

    candles.forEach(candle => candle.addEventListener("click", () => {
        if (candle.classList.contains("blown")) return;
        candle.classList.add("blown");
        candle.disabled = true;
        blownCandles += 1;
        const remaining = candles.length - blownCandles;
        if (remaining > 0 && instruction) {
            instruction.textContent = `${remaining} more candle${remaining === 1 ? "" : "s"} to go!`;
        }
        if (blownCandles === candles.length && !celebrationStarted) {
            celebrationStarted = true;
            if (instruction) instruction.textContent = "Your birthday wish is on its way...";
            window.setTimeout(() => {
                birthdayWish?.classList.add("show");
                candles.forEach(candle => {
    candle.style.display = "none";
});
                if (instruction) instruction.textContent = "A little birthday wish, just for you!";
                createSparkles();
            }, 1000);
        }
    }));

    function createSparkles() {
        const symbols = ["✦", "✧", "✨", "❀"];
        for (let i = 0; i < 40; i += 1) {
            const sparkle = document.createElement("span");
            sparkle.className = "finale-sparkle";
            sparkle.textContent = symbols[Math.floor(Math.random() * symbols.length)];
            sparkle.style.left = `${Math.random() * 100}vw`;
            sparkle.style.top = `${35 + Math.random() * 55}vh`;
            sparkle.style.animationDelay = `${Math.random() * 1.2}s`;
            document.body.appendChild(sparkle);
            window.setTimeout(() => sparkle.remove(), 3500);
        }
    }
})();
