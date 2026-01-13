/* ============================== */
/*         MODAL_RESPONSE         */
/* ============================== */


const modalResponse = document.querySelector(".modal_response_overlay");
const modalContent = document.querySelector(".modal_response");
const exit_dialog = document.getElementById("exit_dialog");

function openModalResponse() {
    modalResponse.style.display = "flex";
    modalResponse.classList.remove("closing");
    modalResponse.classList.add("active");
}

function closeModalResponse() {
    modalResponse.classList.remove("active");
    modalResponse.classList.add("closing");
}

modalResponse.addEventListener("animationend", (event) => {
    if (event.animationName === "blurOut") {
        modalResponse.style.display = "none";
        modalResponse.classList.remove("closing");
    }
});

modalResponse.addEventListener("click", closeModalResponse);

exit_dialog.addEventListener("click", closeModalResponse);

modalContent.addEventListener("click", (event) => {
    event.stopPropagation();
});



/* ======================== */
/*         RESPONSE         */
/* ======================== */


const item1 = document.getElementById("item1");
const item2 = document.getElementById("item2");
const item3 = document.getElementById("item3");

function verificar() {
    if (
        (item1.value.trim().toLowerCase() === "item1" ||
        item1.value.trim().toLowerCase() === "item1(ingles)") &&
        item2.value.trim().toLowerCase() === "item2" &&
        (item3.value.trim().toLowerCase() === "item3" ||
        item3.value.trim().toLowerCase() === "item3(ingles)")
    ) {
        setTimeout(() => {
            alert("Parabéns")
        }, 500)
    }
}

item1.addEventListener("input", verificar);
item2.addEventListener("input", verificar);
item3.addEventListener("input", verificar);



/* =========================== */
/*         MODAL_KOROK         */
/* =========================== */


const triforceTop = document.querySelector(".triforce_top");
const sound_yahaha = document.getElementById("korokSound");

const modalKorokOverlay = document.querySelector(".modal_korok_overlay");
const modalKorok = document.querySelector(".modal_korok");
const korokTitle = modalKorok.querySelector("h2");
const korokExit = modalKorok.querySelector("#exit_dialog");

/* DIÁLOGOS */

const korokDialogsFirstTime = [
    "Ya-ha-ha! Você me encontrou! <br> Aqui vai uma dica!",
    "Dica 1",
    "Dica 2",
    "Dica 3"
];

const korokDialogsRepeat = [
    "Hi-hi! Essas são as dicas:",
    "Dica 1",
    "Dica 2",
    "Dica 3"
];

let activeKorokDialogs = [];
let korokDialogIndex = 0;
let korokFound = false;

/* TYPEWRITER EFFECT */

let typingController = null;

function typeDialog(element, text, speed = 28) {
    let index = 0;
    let isWriting = true;

    element.innerHTML = "";

    function write() {
        if (!isWriting) return;

        element.innerHTML = text.slice(0, index);
        index++;

        if (index <= text.length) {
            setTimeout(write, speed);
        } else {
            isWriting = false;
        }
    }

    write();

    return {
        skip() {
            isWriting = false;
            element.innerHTML = text;
        },
        isWriting() {
            return isWriting;
        }
    };
}

/* MODAL CONTROL */

function openKorokModal(dialogs) {
    activeKorokDialogs = dialogs;
    korokDialogIndex = 0;

    modalKorokOverlay.style.display = "flex";
    modalKorokOverlay.classList.remove("closing");
    modalKorokOverlay.classList.add("active");

    typingController = typeDialog(
        korokTitle,
        activeKorokDialogs[korokDialogIndex]
    );
}

function closeKorokModal() {
    modalKorokOverlay.classList.remove("active");
    modalKorokOverlay.classList.add("closing");
}

/* TRIFORCE CLICK */

triforceTop.addEventListener("click", () => {

    if (!korokFound) {
        sound_yahaha.currentTime = 0;
        sound_yahaha.play();

        openKorokModal(korokDialogsFirstTime);

        korokFound = true;
        triforceTop.classList.add("found");
    } else {
        openKorokModal(korokDialogsRepeat);
    }
});

/* ANIMATION END CONTROL */

modalKorokOverlay.addEventListener("animationend", (e) => {
    if (e.animationName === "blurOut") {
        modalKorokOverlay.style.display = "none";
        modalKorokOverlay.classList.remove("closing");
    }
});

/* FECHAMENTOS */

modalKorokOverlay.addEventListener("click", closeKorokModal);
korokExit.addEventListener("click", closeKorokModal);

/* AVANÇAR DIÁLOGOS */

modalKorok.addEventListener("click", (e) => {
    e.stopPropagation();

    if (typingController && typingController.isWriting()) {
        typingController.skip();
        return;
    }

    korokDialogIndex++;

    if (korokDialogIndex < activeKorokDialogs.length) {
        typingController = typeDialog(
            korokTitle,
            activeKorokDialogs[korokDialogIndex]
        );
    } else {
        closeKorokModal();
    }
});



/* ======================================= */
/*         ANIMATION_TEXT_WHRITING         */
/* ======================================= */


const container = document.getElementById("meuTexto");

const walker = document.createTreeWalker(
    container,
    NodeFilter.SHOW_TEXT,
    null,
    false
);

const textNodes = [];
while (walker.nextNode()) {
    textNodes.push(walker.currentNode);
}

const textos = textNodes.map(node => node.textContent);
textNodes.forEach(node => node.textContent = "");

let nodeIndex = 0;
let charIndex = 0;

const PASSO = 6;

function escrever() {
    if (nodeIndex >= textNodes.length) return;

    const textoAtual = textos[nodeIndex];

    const proximoChunk = textoAtual.slice(charIndex, charIndex + PASSO);
    textNodes[nodeIndex].textContent += proximoChunk;
    charIndex += PASSO;

    if (charIndex >= textoAtual.length) {
        nodeIndex++;
        charIndex = 0;
    }

    requestAnimationFrame(escrever);
}

escrever();



/* ============================================== */
/*         ANIMATION_JOYSTICK_ARROW_RIGHT         */
/* ============================================== */


const svg = document.getElementById('meuSvg');

let posX = .5;
let direction = 0;

const maxX = 4;
const speedRight = 1.0;
const speedLeft = 0.3;

function animate() {
    if (direction === .5) {
        posX += speedRight;
        if (posX >= maxX) {
            direction = -1;
        }
    } else {
        posX -= speedLeft;
        if (posX <= -maxX) {
            direction = .5;
        }
    }

    svg.style.transform = `translateX(${posX}px)`;

    requestAnimationFrame(animate);
}

animate();



/* ========================================== */
/*         ANIMATION_ICON_EXIT_DIALOG         */
/* ========================================== */


const exitDialog = document.getElementById('exit_dialog');

let posYDialog = 0.5;
let directionDialog = 0.5;

const maxYDialog = 3;
const speedDownDialog = .4;
const speedUpDialog = .3;

function animateDialogVertical() {
    if (directionDialog === 0.5) {
        posYDialog += speedDownDialog;
        if (posYDialog >= maxYDialog) {
            directionDialog = -1;
        }
    } else {
        posYDialog -= speedUpDialog;
        if (posYDialog <= -maxYDialog) {
            directionDialog = 0.5;
        }
    }

    exitDialog.style.transform = `translateY(${posYDialog}px)`;
    requestAnimationFrame(animateDialogVertical);
}

animateDialogVertical();



/* ======================================== */
/*         ANIMATION_ARROW_SELECTED         */
/* ======================================== */


const tris = document.querySelectorAll('.tri');

const DIST = 6;
const IN_TIME = 250;
const OUT_TIME = 260;

let diagStart = null;
let diagPhase = 'in';

function easeOutFast(t) {
    return 1 - Math.pow(1 - t, 3);
}

function easeInSlow(t) {
    return t * t;
}

function animateDiagonal(time) {
    if (!diagStart) diagStart = time;

    const duration = diagPhase === 'in' ? IN_TIME : OUT_TIME;
    let t = Math.min((time - diagStart) / duration, 1);

    const eased = diagPhase === 'in'
        ? easeOutFast(t)
        : easeInSlow(t);

    const amount = diagPhase === 'in'
        ? DIST * (1 - eased)
        : DIST * eased;

    tris.forEach(tri => {
        const [dx, dy] = tri.dataset.dir.split(',').map(Number);
        tri.style.setProperty('--tx', `${dx * amount}px`);
        tri.style.setProperty('--ty', `${dy * amount}px`);
    });

    if (t < 1) {
        requestAnimationFrame(animateDiagonal);
    } else {
        diagStart = null;
        diagPhase = diagPhase === 'in' ? 'out' : 'in';
        requestAnimationFrame(animateDiagonal);
    }
}

requestAnimationFrame(animateDiagonal);