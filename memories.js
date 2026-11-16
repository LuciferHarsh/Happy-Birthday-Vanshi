/* ==========================================================
   A LITTLE MAGIC — MEMORY BOOK PAGE TURNING
   Two spreads: pages 01–02, then pages 03–04.
========================================================== */

(() => {
    "use strict";

    const pageLeaf = document.getElementById("pageLeaf");
    const nextBtn = document.getElementById("nextBtn");
    const prevBtn = document.getElementById("prevBtn");
    const nextCorner = document.getElementById("nextCorner");
    const prevCorner = document.getElementById("prevCorner");
    const pageNumber = document.getElementById("pageNumber");
    const bookHint = document.getElementById("bookHint");
    const memoryBook = document.getElementById("memoryBook");
    const memoriesSection = document.querySelector(".memories-section");

    if (!pageLeaf || !nextBtn || !prevBtn || !pageNumber || !memoryBook) {
        console.warn("Memory book: required HTML elements were not found.");
        return;
    }

    let currentSpread = 1;
    let isAnimating = false;

    const totalSpreads = 2;
    const animationDuration = 1500;

    function updateBookControls() {
        pageNumber.textContent = String(currentSpread).padStart(2, "0");
        memoryBook.classList.toggle("spread-two", currentSpread === 2);

        prevBtn.disabled = currentSpread === 1;
        nextBtn.disabled = currentSpread === totalSpreads;

        prevBtn.setAttribute("aria-disabled", String(prevBtn.disabled));
        nextBtn.setAttribute("aria-disabled", String(nextBtn.disabled));

        if (bookHint) {
            bookHint.textContent = currentSpread === 1
                ? "Turn the page to discover more memories ♡"
                : "Every beautiful memory deserves its own page ♡";
        }
    }

    function turnToNextSpread() {
        if (isAnimating || currentSpread >= totalSpreads) return;

        isAnimating = true;
        pageLeaf.classList.add("flipped");
        currentSpread += 1;
        updateBookControls();

        window.setTimeout(() => {
            isAnimating = false;
        }, animationDuration);
    }

    function turnToPreviousSpread() {
        if (isAnimating || currentSpread <= 1) return;

        isAnimating = true;
        pageLeaf.classList.remove("flipped");
        currentSpread -= 1;
        updateBookControls();

        window.setTimeout(() => {
            isAnimating = false;
        }, animationDuration);
    }

    nextBtn.addEventListener("click", turnToNextSpread);
    prevBtn.addEventListener("click", turnToPreviousSpread);

    nextCorner?.addEventListener("click", turnToNextSpread);
    prevCorner?.addEventListener("click", turnToPreviousSpread);

    // Keyboard navigation works only while the book is in view.
    document.addEventListener("keydown", (event) => {
        const rect = memoryBook.getBoundingClientRect();
        const isVisible = rect.bottom > 0 && rect.top < window.innerHeight;

        if (!isVisible || event.altKey || event.ctrlKey || event.metaKey) return;

        if (event.key === "ArrowRight") {
            event.preventDefault();
            turnToNextSpread();
        } else if (event.key === "ArrowLeft") {
            event.preventDefault();
            turnToPreviousSpread();
        }
    });

    // Touch swipe support on the book.
    let touchStartX = null;
    let touchStartY = null;

    memoryBook.addEventListener("touchstart", (event) => {
        if (!event.changedTouches.length) return;
        touchStartX = event.changedTouches[0].clientX;
        touchStartY = event.changedTouches[0].clientY;
    }, { passive: true });

    memoryBook.addEventListener("touchend", (event) => {
        if (touchStartX === null || !event.changedTouches.length) return;

        const deltaX = event.changedTouches[0].clientX - touchStartX;
        const deltaY = event.changedTouches[0].clientY - touchStartY;

        // Only treat a clear horizontal gesture as a page swipe.
        if (Math.abs(deltaX) > 55 && Math.abs(deltaX) > Math.abs(deltaY) * 1.25) {
            if (deltaX < 0) turnToNextSpread();
            else turnToPreviousSpread();
        }

        touchStartX = null;
        touchStartY = null;
    }, { passive: true });

    updateBookControls();

    // Reveal the memories section as it enters the viewport.
    if (memoriesSection && "IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("book-visible");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });

        revealObserver.observe(memoriesSection);
    } else {
        memoriesSection?.classList.add("book-visible");
    }
})();
