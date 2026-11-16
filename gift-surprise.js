
/* =========================================
   FINAL BIRTHDAY GIFT SURPRISE
========================================= */
(() => {
  "use strict";

  const IMAGE = "images/noise-two-headphones.png";

  const css = `
  .gift-invite-wrap {
    display:flex;
    justify-content:center;
    margin:24px 12px;
  }
  .gift-invite {
    border:1px solid #d9b56f;
    border-radius:30px;
    padding:13px 23px;
    background:linear-gradient(135deg,#713521,#32170f);
    color:#ffe8bd;
    font:600 15px Georgia;
    cursor:pointer;
    box-shadow:0 5px 20px #0005;
  }
  .gift-overlay {
    position:fixed;
    inset:0;
    z-index:99999;
    display:none;
    align-items:center;
    justify-content:center;
    overflow:auto;
    padding:20px 12px;
    box-sizing:border-box;
    background:radial-gradient(circle,#673b25,#170a07 75%);
    opacity:0;
    transition:opacity .4s;
  }
  .gift-overlay.open { display:flex; }
  .gift-overlay.visible { opacity:1; }

  .gift-inner {
    position:relative;
    width:min(100%,540px);
    min-height:80vh;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    text-align:center;
    color:#f8e4bd;
    font-family:Georgia,serif;
  }
  .gift-close {
    position:absolute;
    right:0;
    top:0;
    width:38px;
    height:38px;
    border:1px solid #d9b56f;
    border-radius:50%;
    background:#32170f;
    color:#ffe8bd;
    font-size:23px;
    cursor:pointer;
  }
  .gift-kicker {
    color:#e6c58b;
    font:11px Arial;
    letter-spacing:.2em;
    text-transform:uppercase;
    margin:25px 0 8px;
  }
  .gift-heading {
    font-size:clamp(24px,6vw,35px);
    font-weight:400;
    margin:0 0 10px;
  }
  .gift-copy {
    font-size:15px;
    line-height:1.6;
    max-width:330px;
    margin:0 auto 22px;
  }
  .gift-box-area {
    position:relative;
    width:280px;
    height:235px;
    display:grid;
    place-items:end center;
    margin:8px auto;
  }
  .gift-box {
    position:relative;
    width:220px;
    height:145px;
    border:2px solid #d9ad62;
    border-radius:5px 5px 12px 12px;
    background:linear-gradient(120deg,#9b2935,#58101b);
    box-shadow:0 20px 30px #0008;
  }
  .gift-box:before {
    content:"";
    position:absolute;
    left:44%;
    top:0;
    bottom:0;
    width:28px;
    background:linear-gradient(90deg,#a96d27,#f4d48c,#a96d27);
  }
  .gift-lid {
    position:absolute;
    z-index:2;
    top:45px;
    left:50%;
    width:244px;
    height:42px;
    transform:translateX(-50%);
    border:2px solid #e3bd76;
    border-radius:7px;
    background:linear-gradient(120deg,#a52f3a,#681522);
    transform-origin:15% 100%;
    transition:transform .8s,opacity .7s;
  }
  .gift-lid:before {
    content:"";
    position:absolute;
    left:44%;
    top:0;
    bottom:0;
    width:28px;
    background:linear-gradient(90deg,#a96d27,#f4d48c,#a96d27);
  }
  .gift-bow {
    position:absolute;
    z-index:4;
    top:7px;
    left:50%;
    width:90px;
    height:55px;
    transform:translateX(-50%);
    cursor:pointer;
    filter:drop-shadow(0 4px 4px #0008);
    transition:.6s;
  }
  .gift-bow:before,.gift-bow:after {
    content:"";
    position:absolute;
    top:5px;
    width:38px;
    height:28px;
    border:7px solid #e6c174;
    border-radius:70% 70% 15% 70%;
    background:linear-gradient(135deg,#f8dfa0,#a96d27);
  }
  .gift-bow:before {
    left:0;
    transform:rotate(25deg);
  }
  .gift-bow:after {
    right:0;
    transform:scaleX(-1) rotate(25deg);
  }
  .gift-bow span {
    position:absolute;
    z-index:2;
    left:37px;
    top:20px;
    width:18px;
    height:18px;
    border-radius:50%;
    background:#f4d48c;
  }
  .gift-open-btn {
    margin-top:12px;
    border:1px solid #d9b56f;
    border-radius:25px;
    padding:11px 20px;
    background:#713521;
    color:#ffe8bd;
    font:600 14px Georgia;
    cursor:pointer;
  }
  .gift-overlay.opening .gift-lid {
    transform:translateX(-50%) translate(-10px,-95px) rotate(-24deg);
    opacity:.1;
  }
  .gift-overlay.opening .gift-bow {
    transform:translate(-50%,-80px) rotate(-25deg);
    opacity:0;
  }
  .gift-reveal {
    display:none;
    width:100%;
    animation:giftPop .8s both;
  }
  .gift-overlay.revealed .gift-box-area,
  .gift-overlay.revealed .gift-copy,
  .gift-overlay.revealed .gift-open-btn {
    display:none;
  }
  .gift-overlay.revealed .gift-reveal {
    display:block;
  }
  .gift-frame {
    width:min(100%,430px);
    margin:auto;
    padding:9px;
    border:2px solid #e5bf78;
    border-radius:12px;
    background:linear-gradient(145deg,#f6dfad,#9b692f);
    box-shadow:0 0 28px #e6b45c66,0 18px 40px #0008;
    box-sizing:border-box;
  }
  .gift-frame img {
    display:block;
    width:100%;
    max-height:48vh;
    object-fit:contain;
    border-radius:6px;
    background:#1d100c;
  }
  .gift-message {
    max-width:370px;
    margin:17px auto 0;
    color:#f2dcb6;
    font-size:15px;
    line-height:1.7;
  }
  .gift-message strong {
    display:block;
    color:#f4d08b;
    font-size:24px;
    font-weight:400;
    margin-bottom:7px;
  }
  .gift-sparkle {
    position:fixed;
    z-index:100001;
    pointer-events:none;
    color:#ffe5a2;
    text-shadow:0 0 12px #f4c56d;
    animation:giftSparkle 2s ease-out forwards;
  }
  @keyframes giftPop {
    from { opacity:0; transform:translateY(20px) scale(.8); }
    to { opacity:1; transform:none; }
  }
  @keyframes giftSparkle {
    0% { opacity:0; transform:scale(.3); }
    15% { opacity:1; }
    100% {
      opacity:0;
      transform:translate(var(--dx),var(--dy)) scale(1.3) rotate(150deg);
    }
  }
  @media(max-width:480px) {
    .gift-inner { min-height:82vh; }
    .gift-box-area { transform:scale(.9); margin:0 auto; }
    .gift-frame { padding:7px; }
    .gift-message { font-size:14px; padding:0 8px; }
  }
  `;

  const style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  function buildGift() {
    if (document.getElementById("giftInvite")) return;

    const wish = document.getElementById("birthdayWish");
    if (!wish) return;

    const wrap = document.createElement("div");
    wrap.className = "gift-invite-wrap";
    wrap.innerHTML = `
      <button class="gift-invite" id="giftInvite" type="button">
        Are you ready for the surprise? ✨
      </button>`;
    wish.insertAdjacentElement("afterend", wrap);

    const overlay = document.createElement("div");
    overlay.className = "gift-overlay";
    overlay.id = "giftOverlay";
    overlay.setAttribute("role","dialog");
    overlay.setAttribute("aria-modal","true");

    overlay.innerHTML = `
      <div class="gift-inner">
        <button class="gift-close" type="button" aria-label="Close">×</button>

        <p class="gift-kicker">A little something, just for you</p>
        <h2 class="gift-heading">Your surprise is waiting!</h2>
        <p class="gift-copy">
          A little happiness, wrapped up with a golden bow. ✨
        </p>

        <div class="gift-box-area">
          <div class="gift-box"></div>
          <div class="gift-lid"></div>
          <div class="gift-bow" role="button" tabindex="0"
               aria-label="Untie the ribbon"><span></span></div>
        </div>

        <p class="gift-copy">Untie the ribbon to open your gift!</p>
        <button class="gift-open-btn" type="button">
          Open my gift 🎁
        </button>

        <div class="gift-reveal">
          <div class="gift-frame">
            <img src="${IMAGE}" alt="Noise TWO wireless headphones gift">
          </div>
          <p class="gift-message">
            <strong>Surprise! 🎧</strong>
            A little something to make your days more musical.
            Keep smiling, keep shining, and enjoy your gift!
          </p>
        </div>
      </div>`;

    document.body.appendChild(overlay);

    const invite = wrap.querySelector("button");
    const close = overlay.querySelector(".gift-close");
    const open = overlay.querySelector(".gift-open-btn");
    const bow = overlay.querySelector(".gift-bow");

    let opened = false;

    function showOverlay() {
      overlay.classList.add("open");
      requestAnimationFrame(() => overlay.classList.add("visible"));
      document.body.style.overflow = "hidden";
      close.focus();
    }

    function closeOverlay() {
      overlay.classList.remove("visible","opening","revealed");
      setTimeout(() => overlay.classList.remove("open"),400);
      document.body.style.overflow = "";
      invite.focus();
    }

    function glitter() {
      const symbols = ["✦","✧","✨","❀","⋆"];

      for (let i=0; i<65; i++) {
        const s = document.createElement("span");
        s.className = "gift-sparkle";
        s.textContent = symbols[Math.floor(Math.random()*symbols.length)];
        s.style.left = Math.random()*100 + "vw";
        s.style.top = Math.random()*100 + "vh";
        s.style.fontSize = 12 + Math.random()*18 + "px";
        s.style.setProperty("--dx",(Math.random()-.5)*220 + "px");
        s.style.setProperty("--dy",(Math.random()-.5)*220 + "px");

        document.body.appendChild(s);
        setTimeout(() => s.remove(),2300);
      }
    }

    function revealGift() {
      if (opened) return;
      opened = true;

      overlay.classList.add("opening");
      glitter();

      setTimeout(() => {
        overlay.classList.add("revealed");
        glitter();
      },850);
    }

    invite.addEventListener("click",showOverlay);
    open.addEventListener("click",revealGift);
    bow.addEventListener("click",revealGift);

    bow.addEventListener("keydown",e => {
      if (e.key==="Enter" || e.key===" ") {
        e.preventDefault();
        revealGift();
      }
    });

    close.addEventListener("click",closeOverlay);

    overlay.addEventListener("click",e => {
      if (e.target===overlay) closeOverlay();
    });

    document.addEventListener("keydown",e => {
      if (e.key==="Escape" && overlay.classList.contains("open")) {
        closeOverlay();
      }
    });
  }

  function watchWish() {
    const wish = document.getElementById("birthdayWish");
    if (!wish) return;

    if (wish.classList.contains("show")) {
      buildGift();
      return;
    }

    const observer = new MutationObserver(() => {
      if (wish.classList.contains("show")) {
        buildGift();
        observer.disconnect();
      }
    });

    observer.observe(wish,{
      attributes:true,
      attributeFilter:["class"]
    });
  }

  if (document.readyState==="loading") {
    document.addEventListener("DOMContentLoaded",watchWish,{once:true});
  } else {
    watchWish();
  }
})();
