
/* ============================================
   BIRTHDAY CELEBRATION — FLOATING WISH & PARTY
============================================ */

(() => {
    "use strict";

    let celebrationStarted = false;

    function startBirthdayCelebration() {
        if (celebrationStarted) return;
        celebrationStarted = true;

        // Celebration styling
        const style = document.createElement("style");
        style.textContent = `
            .birthday-party-message {
                position: fixed;
                z-index: 99990;
                top: 12%;
                left: 50%;
                transform: translateX(-50%);
                width: min(90%, 650px);
                box-sizing: border-box;
                padding: 25px 16px;
                text-align: center;
                color: #ffe7b5;
                background: rgba(48, 19, 12, .94);
                border: 2px solid #d9ad62;
                border-radius: 18px;
                box-shadow: 0 0 35px #e7b65b77;
                animation: birthdayPopIn 1s ease both;
                font-family: Georgia, serif;
            }

            .birthday-party-message h2 {
                font-size: clamp(25px, 6vw, 42px);
                margin: 0 0 12px;
            }

            .birthday-party-message p {
                font-size: 16px;
                line-height: 1.7;
                margin: 0;
            }

            .birthday-balloon {
                position: fixed;
                z-index: 99989;
                bottom: -100px;
                font-size: 48px;
                pointer-events: none;
                animation: birthdayBalloonFloat linear forwards;
            }

            .birthday-confetti {
                position: fixed;
                z-index: 99991;
                top: -20px;
                width: 9px;
                height: 15px;
                pointer-events: none;
                animation: birthdayConfettiFall linear forwards;
            }

            .birthday-sound-btn {
                margin-top: 16px;
                padding: 10px 20px;
                border-radius: 25px;
                border: 1px solid #e4c17c;
                background: #713521;
                color: #ffe5ad;
                cursor: pointer;
                font-size: 14px;
            }

            @keyframes birthdayPopIn {
                from {
                    opacity: 0;
                    transform: translate(-50%, -30px) scale(.8);
                }
                to {
                    opacity: 1;
                    transform: translate(-50%, 0) scale(1);
                }
            }

            @keyframes birthdayBalloonFloat {
                to {
                    transform: translateY(-120vh) rotate(20deg);
                    opacity: 0;
                }
            }

            @keyframes birthdayConfettiFall {
                to {
                    transform: translateY(110vh) rotate(720deg);
                    opacity: 0;
                }
            }

            @media(max-width:480px) {
                .birthday-party-message {
                    top: 8%;
                    padding: 20px 12px;
                }
            }
        `;

        document.head.appendChild(style);

        // Birthday message
        const message = document.createElement("div");
        message.className = "birthday-party-message";

        message.innerHTML = `
            <h2>🎉 Happy Birthday! 🎂</h2>
            <p>
                Beautiful Soul, today is all about YOU!<br>
                Keep smiling, keep shining and have
                the most amazing day! ✨
            </p>
            <button class="birthday-sound-btn" type="button">
                🔊 Play party sound
            </button>
        `;

        document.body.appendChild(message);

        // Balloons
        for (let i = 0; i < 14; i++) {
            const balloon = document.createElement("div");
            balloon.className = "birthday-balloon";
            balloon.textContent = "🎈";
            balloon.style.left = Math.random() * 95 + "vw";
            balloon.style.animationDuration =
                (7 + Math.random() * 6) + "s";
            balloon.style.animationDelay =
                (Math.random() * 3) + "s";

            document.body.appendChild(balloon);
            balloon.addEventListener("animationend", () => balloon.remove());
        }

        // Confetti
        for (let i = 0; i < 150; i++) {
            const piece = document.createElement("div");
            piece.className = "birthday-confetti";

            piece.style.left = Math.random() * 100 + "vw";
            piece.style.background = [
                "#f5c76e",
                "#e96d62",
                "#fff0bd",
                "#c78bca",
                "#8bc6a5"
            ][Math.floor(Math.random() * 5)];

            piece.style.animationDuration =
                (3 + Math.random() * 4) + "s";
            piece.style.animationDelay = Math.random() * 2 + "s";

            document.body.appendChild(piece);
            piece.addEventListener("animationend", () => piece.remove());
        }

        // Party sound using Web Audio API
        function playPartySound() {
            const AudioContext =
                window.AudioContext || window.webkitAudioContext;

            if (!AudioContext) return;

            const audio = new AudioContext();

            if (audio.state === "suspended") {
                audio.resume();
            }

            // Celebration notes
            [523, 659, 784, 1046].forEach((frequency, index) => {
                const oscillator = audio.createOscillator();
                const gain = audio.createGain();

                oscillator.type = "triangle";
                oscillator.frequency.value = frequency;

                const start = audio.currentTime + index * 0.13;

                gain.gain.setValueAtTime(0.001, start);
                gain.gain.exponentialRampToValueAtTime(0.18, start + 0.03);
                gain.gain.exponentialRampToValueAtTime(0.001, start + 0.35);

                oscillator.connect(gain);
                gain.connect(audio.destination);

                oscillator.start(start);
                oscillator.stop(start + 0.4);
            });
        }

        message.querySelector(".birthday-sound-btn")
            .addEventListener("click", playPartySound);

        // Attempt automatic playback; browser may block it.
        try {
            playPartySound();
        } catch (error) {
            console.log("Click Play party sound to hear the celebration.");
        }
    }

    // Listen for the countdown reaching zero.
    function checkBirthday() {
        const days = document.getElementById("days");
        const hours = document.getElementById("hours");
        const minutes = document.getElementById("minutes");
        const seconds = document.getElementById("seconds");

        if (!days || !hours || !minutes || !seconds) return;

        const isZero =
            days.textContent.trim() === "000" &&
            hours.textContent.trim() === "00" &&
            minutes.textContent.trim() === "00" &&
            seconds.textContent.trim() === "00";

        if (isZero) {
            startBirthdayCelebration();
        }
    }

    // Observe countdown changes without editing script.js.
    function initialiseCelebration() {
        const timer = document.getElementById("days");

        if (!timer) return;

        const observer = new MutationObserver(checkBirthday);

        ["days", "hours", "minutes", "seconds"].forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                observer.observe(element, {
                    childList: true,
                    characterData: true,
                    subtree: true
                });
            }
        });

        checkBirthday();
    }

    if (document.readyState === "loading") {
        document.addEventListener(
            "DOMContentLoaded",
            initialiseCelebration,
            { once: true }
        );
    } else {
        initialiseCelebration();
    }
})();
