/* =========================== */
/*         END CREDITS         */
/* =========================== */

const credits = document.querySelector(".credits");
const creditsContainer = document.querySelector(".credits_contain");
const finalScreen = document.getElementById("finalScreen");

const creditImages = document.querySelectorAll(
    ".credits_image_contain > div"
);

const imageAnimationMap = [
    "move_tl_tr",
    "move_br_tl",
    "move_cl_cr",
    "move_tl_tr",
    "move_cc_ct",
    "move_cl_cr",
    "move_cb_ct",
    "move_br_tl",
    "move_cc_ct",
    "move_cl_cr",
    "move_cc_ct",
    "move_tl_tr",
    "move_cl_cr",
    "move_cc_ct",
    "move_cc_ct",
    "move_cl_cr",
    "move_cr_cl",
    "move_cl_cr",
    "move_bl_tr",
    "move_tl_bl"
];

const IMAGE_TOTAL_DURATION = 18500;
const IMAGE_OVERLAP = 2500;

const CREDITS_DURATION = 340;
const FINAL_SCREEN_ANTICIPATION = 11;

let anticipationTimer = null;

/* =========================== */
/*        IMAGE CONTROL        */
/* =========================== */

function resetCreditImages() {
    creditImages.forEach(img => {
        img.className = img.className.replace(/\b(active|move_\S+)\b/g, "");
    });
}

function showCreditImage(index) {
    const img = creditImages[index];
    if (!img) return;

    img.className = img.className.replace(/\b(active|move_\S+)\b/g, "");
    void img.offsetWidth;

    img.classList.add("active");
    img.classList.add(imageAnimationMap[index]);
}

function startCreditImages() {
    let index = 0;

    function nextImage() {
        showCreditImage(index);
        index++;

        if (index >= creditImages.length) return;

        setTimeout(nextImage, IMAGE_TOTAL_DURATION - IMAGE_OVERLAP);
    }

    nextImage();
}

/* =========================== */
/*        SCROLL CONTROL       */
/* =========================== */

function resetCreditsScroll() {
    creditsContainer.style.animation = "none";
    creditsContainer.offsetHeight; // force reflow
}

function showFinalScreenEarly() {
    finalScreen.style.display = "flex";

    requestAnimationFrame(() => {
        finalScreen.classList.add("show");
    });
}

function startCreditsScroll() {
    resetCreditsScroll();

    creditsContainer.style.animation =
        `creditsScroll ${CREDITS_DURATION}s linear forwards`;

    creditsContainer.removeEventListener("animationend", onCreditsFinished);
    creditsContainer.addEventListener("animationend", onCreditsFinished, { once: true });

    // antecipação visual
    anticipationTimer = setTimeout(
        showFinalScreenEarly,
        (CREDITS_DURATION - FINAL_SCREEN_ANTICIPATION) * 1000
    );

    setTimeout(onCreditsFinished, CREDITS_DURATION * 1000);
}

/* =========================== */
/*       FINALIZATION          */
/* =========================== */

function onCreditsFinished() {
    clearTimeout(anticipationTimer);

    credits.style.display = "none";

    finalScreen.style.display = "flex";
    finalScreen.classList.add("show");
}

/* =========================== */
/*      START CREDITS          */
/* =========================== */

function startFinalCredits() {
    // reset geral
    clearTimeout(anticipationTimer);
    resetCreditImages();
    resetCreditsScroll();

    finalScreen.style.display = "none";
    credits.style.display = "flex";

    sound_credits.currentTime = 0;
    sound_credits.volume = 0.2;
    sound_credits.play();

    startCreditImages();
    startCreditsScroll();
}
