
/* =====================================================
   BIRTHDAY CELEBRATION
   Confined to the countdown section only
===================================================== */

(() => {
    "use strict";

    let celebrationStarted = false;

    function startBirthdayCelebration() {
        if (celebrationStarted) return;

        const countdownSection = document.getElementById("countdown");

        if (!countdownSection) {
            console.warn("Countdown section not found.");
            return;
        }

        celebrationStarted = true;

        // =========================================
        // CELEBRATION CSS
        // =========================================

        const style = document.createElement("style");

        style.textContent = `
            #countdown {
                position: relative;
                overflow: hidden;
                isolation: isolate;
            }

            .birthday-party-message {
                position: absolute;
                z-index: 20;
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
                color: #ffe5ad;
            }

            .birthday-party-message p {
                font-size: 16px;
                line-height: 1.7;
                margin: 0;
            }

            .birthday-balloon {
                position: absolute;
                z-index: 15;
                bottom: -100px;
                font-size: 48px;
                pointer-events: none;
                animation: birthdayBalloonFloat linear forwards;
            }

            .birthday-confetti {
                position: absolute;
                z-index: 18;
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

            .birthday-sound-btn:hover {
                background: #96502e;
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
                from {
                    transform: translateY(0);
                    opacity: 1;
                }

                to {
                    transform: translateY(-120%);
                    opacity: 0;
                }
            }

            @keyframes birthdayConfettiFall {
                from {
                    transform: translateY(0) rotate(0deg);
                    opacity: 1;
                }

                to {
                    transform: translateY(120%) rotate(720deg);
                    opacity: 0;
                }
            }

            @media(max-width:480px) {
                .birthday-party-message {
                    top: 8%;
                    padding: 20px 12px;
                }

                .birthday-party-message p {
                    font-size: 14px;
                }

                .birthday-balloon {
                    font-size: 35px;
                }
            }
        `;

        document.head.appendChild(style);

        // =========================================
        // BIRTHDAY MESSAGE
        // =========================================

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
                🔊 Play Party Sound
            </button>
        `;

        countdownSection.appendChild(message);

        // =========================================
        // FLOATING BALLOONS
        // =========================================

        const balloonSymbols = [
            "🎈", "🎈", "🎈", "🎈",
            "🎈", "🎈", "🎈", "🎈",
            "🎈", "🎈", "🎈", "🎈"
        ];

        balloonSymbols.forEach((symbol, index) => {
            const balloon = document.createElement("div");

            balloon.className = "birthday-balloon";
            balloon.textContent = symbol;

            balloon.style.left = Math.random() * 95 + "%";
            balloon.style.animationDuration =
                (7 + Math.random() * 5) + "s";

            balloon.style.animationDelay =
                (index * 0.3) + "s";

            countdownSection.appendChild(balloon);

            balloon.addEventListener("animationend", () => {
                balloon.remove();
            });
        });

        // =========================================
        // CONFETTI EFFECT
        // =========================================

        const confettiColors = [
            "#f5c76e",
            "#e96d62",
            "#fff0bd",
            "#c78bca",
            "#8bc6a5",
            "#ffffff"
        ];

        for (let i = 0; i < 150; i++) {
            const piece = document.createElement("div");

            piece.className = "birthday-confetti";

            piece.style.left = Math.random() * 100 + "%";

            piece.style.background =
                confettiColors[
                    Math.floor(Math.random() * confettiColors.length)
                ];

            piece.style.animationDuration =
                (3 + Math.random() * 4) + "s";

            piece.style.animationDelay =
                Math.random() * 2 + "s";

            countdownSection.appendChild(piece);

            piece.addEventListener("animationend", () => {
                piece.remove();
            });
        }

        // =========================================
        // PARTY SOUND USING WEB AUDIO API
        // =========================================

        function playPartySound() {
            try {
                const AudioContext =
                    window.AudioContext ||
                    window.webkitAudioContext;

                if (!AudioContext) return;

                const audio = new AudioContext();

                const playNotes = () => {
                    [523, 659, 784, 1046].forEach((frequency, index) => {
                        const oscillator = audio.createOscillator();
                        const gain = audio.createGain();

                        oscillator.type = "triangle";
                        oscillator.frequency.value = frequency;

                        const start =
                            audio.currentTime + index * 0.13;

                        gain.gain.setValueAtTime(0.001, start);

                        gain.gain.exponentialRampToValueAtTime(
                            0.18,
                            start + 0.03
                        );

                        gain.gain.exponentialRampToValueAtTime(
                            0.001,
                            start + 0.35
                        );

                        oscillator.connect(gain);
                        gain.connect(audio.destination);

                        oscillator.start(start);
                        oscillator.stop(start + 0.4);
                    });
                };

                if (audio.state === "suspended") {
                    audio.resume().then(playNotes);
                } else {
                    playNotes();
                }

                // Party popper noise
                const length = audio.sampleRate * 0.5;

                const buffer = audio.createBuffer(
                    1,
                    length,
                    audio.sampleRate
                );

                const data = buffer.getChannelData(0);

                for (let i = 0; i < length; i++) {
                    data[i] =
                        (Math.random() * 2 - 1) *
                        Math.pow(1 - i / length, 3);
                }

                const noise = audio.createBufferSource();
                const filter = audio.createBiquadFilter();
                const volume = audio.createGain();

                noise.buffer = buffer;

                filter.type = "highpass";
                filter.frequency.value = 1200;

                volume.gain.value = 0.3;

                noise.connect(filter);
                filter.connect(volume);
                volume.connect(audio.destination);

                noise.start();

            } catch (error) {
                console.warn("Please use the party sound button.", error);
            }
        }

        // Sound button
        message
            .querySelector(".birthday-sound-btn")
            .addEventListener("click", playPartySound);

        // Try automatic sound.
        // Browser may require a click to allow audio.
        playPartySound();

        console.log("Birthday celebration started!");
    }

    // =========================================
    // DETECT WHEN COUNTDOWN REACHES ZERO
    // =========================================

    function initialiseCelebration() {
        const timerElements = [
            "days",
            "hours",
            "minutes",
            "seconds"
        ].map(id => document.getElementById(id));

        if (timerElements.some(element => !element)) {
            console.warn("Countdown timer elements not found.");
            return;
        }

        function checkCountdown() {
            const isZero = timerElements.every(element => {
                return Number(element.textContent.trim()) === 0;
            });

            if (isZero) {
                startBirthdayCelebration();
            }
        }

        const observer = new MutationObserver(checkCountdown);

        timerElements.forEach(element => {
            observer.observe(element, {
                childList: true,
                characterData: true,
                subtree: true
            });
        });

        // Check immediately in case timer is already zero.
        checkCountdown();
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
