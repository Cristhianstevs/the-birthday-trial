/* ===================== */
/*        AUDIOS         */
/* ===================== */


const sound_dialog_start = document.getElementById("dialogStartSound");
const sound_dialog_next = document.getElementById("dialogNextSound");
const sound_dialog_end = document.getElementById("dialogEndSound");
const sound_yahaha = document.getElementById("korokSound");
const sound_korok_found01 = document.getElementById("korokFound01Sound");
const sound_korok_found02 = document.getElementById("korokFound02Sound");
const sound_reward = document.getElementById("rewardSound");
const sound_input_error = document.getElementById("errorInputSound")


/* ==================== */
/*        START         */
/* ==================== */



/* =========================== */
/*        MODAL_REWARD         */
/* =========================== */

const modalRewardOverlay = document.querySelector(".modal_reward_overlay");
const modalReward = document.querySelector(".modal_reward");
const modalRewardContain = document.querySelector(".modal_reward_contain");
const exitReward = modalRewardOverlay.querySelector(".exit_dialog");

let rewardUnlocked = false;

function resetarAnimacaoReward() {
    modalRewardOverlay.classList.remove("active");

    void modalRewardOverlay.offsetWidth;

    modalRewardOverlay.classList.add("active");
}

function openModalReward() {
    modalRewardOverlay.style.display = "flex";
    modalRewardOverlay.classList.remove("closing");

    resetarAnimacaoReward();

    if (sound_reward) {
        sound_reward.currentTime = 0;
        sound_reward.play();
    }
}

function closeModalReward() {
    modalRewardOverlay.classList.remove("active");
    modalRewardOverlay.classList.add("closing");

    if (sound_dialog_end) {
        sound_dialog_end.currentTime = 0;
        sound_dialog_end.play();
    }

    rewardUnlocked = false;
    limparInputs();
}

modalRewardOverlay.addEventListener("animationend", (e) => {
    if (e.animationName === "blurOut") {
        modalRewardOverlay.style.display = "none";
        modalRewardOverlay.classList.remove("closing");
    }
});

modalRewardOverlay.addEventListener("click", closeModalReward);
modalRewardContain.addEventListener("click", closeModalReward);

if (exitReward) {
    exitReward.addEventListener("click", closeModalReward);
}

modalReward.addEventListener("click", (e) => {
    e.stopPropagation();
});



/* ============================== */
/*         MODAL_RESPONSE         */
/* ============================== */


const modalResponse = document.querySelector(".modal_response_overlay");
const modalContent = document.querySelector(".modal_response");
const exitResponse = document.querySelector(".exit_dialog");

function openModalResponse() {
    resetarEstadoResponse();

    sound_dialog_start.currentTime = 0;
    sound_dialog_start.play();

    modalResponse.style.display = "flex";
    modalResponse.classList.remove("closing");
    modalResponse.classList.add("active");
}

function closeModalResponse(playSound = true) {
    if (playSound && sound_dialog_end) {
        sound_dialog_end.currentTime = 0;
        sound_dialog_end.play();
    }

    modalResponse.classList.remove("active");
    modalResponse.classList.add("closing");
}

modalResponse.addEventListener("animationend", (event) => {
    if (event.animationName === "blurOut") {
        modalResponse.style.display = "none";
        modalResponse.classList.remove("closing");
    }
});

modalResponse.addEventListener("click", closeModalResponse, );

exitResponse.addEventListener("click", closeModalResponse);

modalContent.addEventListener("click", (event) => {
    event.stopPropagation();
});



/* ======================== */
/*         RESPONSE         */
/* ======================== */


/* ÁUDIO */
const sound_typing = new Audio("../public/cursor_move02.wav");
const sound_delete = new Audio("../public/cursor_move03.wav");

sound_typing.volume = 0.4;
sound_delete.volume = 0.2;

let lastTypeTime = 0;
const TYPE_SOUND_COOLDOWN = 40;

function playSound(sound) {
    const now = Date.now();
    if (now - lastTypeTime < TYPE_SOUND_COOLDOWN) return;
    lastTypeTime = now;

    sound.currentTime = 0;
    sound.play();
}


/* VARIÁVEIS */

let errorSoundTimeout = null;
let lastErrorCombo = "";
let lastShakeTime = 0;

const ERROR_SOUND_DELAY = 1500;

const item1 = document.getElementById("item1");
const item2 = document.getElementById("item2");
const item3 = document.getElementById("item3");


/* RESET / LIMPEZA */

function resetarEstadoResponse() {
    clearTimeout(errorSoundTimeout);
    errorSoundTimeout = null;
    lastErrorCombo = "";
    lastShakeTime = 0;

    [item1, item2, item3].forEach(input => {
        input.classList.remove("input_error");
    });
}

function limparInputs() {
    item1.value = "";
    item2.value = "";
    item3.value = "";

    item1.blur();
    item2.blur();
    item3.blur();
}


/* SHAKE DE ERRO */

function shakeAllInputs() {
    const now = Date.now();
    if (now - lastShakeTime < 500) return;

    lastShakeTime = now;

    [item1, item2, item3].forEach(input => {
        input.classList.remove("input_error");
        void input.offsetWidth;
        input.classList.add("input_error");
    });
}


/* VERIFICAÇÃO */

function verificar() {
    if (rewardUnlocked) return;

    const v1 = item1.value.trim().toLowerCase();
    const v2 = item2.value.trim().toLowerCase();
    const v3 = item3.value.trim().toLowerCase();

    const item1Filled = v1.length > 0;
    const item2Filled = v2.length > 0;
    const item3Filled = v3.length > 0;

    const filledCount =
        (item1Filled ? 1 : 0) +
        (item2Filled ? 1 : 0) +
        (item3Filled ? 1 : 0);

    const item1Ok = v1 === "item1" || v1 === "item1(ingles)";
    const item2Ok = v2 === "item2";
    const item3Ok = v3 === "item3" || v3 === "item3(ingles)";

    const comboOk = item1Ok && item2Ok && item3Ok;

    // Inputs incompletos → cancela feedback

    if (filledCount < 3) {
        clearTimeout(errorSoundTimeout);
        errorSoundTimeout = null;
        lastErrorCombo = "";
        return;
    }

    // SUCESSO

    if (comboOk) {
        rewardUnlocked = true;

        clearTimeout(errorSoundTimeout);
        lastErrorCombo = "";

        setTimeout(() => {
            closeModalResponse(false);
        }, 1500);

        setTimeout(() => {
            limparInputs();
            openModalReward();
        }, 3000);

        return;
    }

    // ERRO

    const comboKey = `${v1}|${v2}|${v3}`;

    if (comboKey !== lastErrorCombo) {
        clearTimeout(errorSoundTimeout);

        errorSoundTimeout = setTimeout(() => {
            sound_input_error.currentTime = 0;
            sound_input_error.play();
            shakeAllInputs();
        }, ERROR_SOUND_DELAY);

        lastErrorCombo = comboKey;
    }
}


/* INPUT HANDLER */

function onTypeInput(e) {
    switch (e.inputType) {
        case "insertText":
            playSound(sound_typing);
            break;

        case "deleteContentBackward":
        case "deleteContentForward":
            playSound(sound_delete);
            break;
    }

    verificar();
}


/* EVENT LISTENERS */

[item1, item2, item3].forEach(input => {
    input.addEventListener("input", onTypeInput);
});



/* =========================== */
/*         MODAL_KOROK         */
/* =========================== */


const triforceTop = document.querySelector(".triforce_top");
const modalKorokOverlay = document.querySelector(".modal_korok_overlay");
const modalKorok = document.querySelector(".modal_korok");
const korokTitle = modalKorok.querySelector("h2");
const korokExit = modalKorok.querySelector(".exit_dialog");

sound_dialog_next.volume = .5;

/* DIÁLOGOS */

const korokDialogsFirstTime = [
    "Ya-ha-ha! Você me encontrou!\nVou te dar algumas dicas.",
    "Dica 1",
    "Dica 2",
    "Dica 3"
];

const korokDialogsRepeat = [
    "Hi-hi!\nEssas são as dicas:",
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
    setTimeout (() => {
        sound_korok_found02.currentTime = 0;
        sound_korok_found02.play();
    }, 700)

    sound_dialog_end.currentTime = 0;
    sound_dialog_end.play();
    modalKorokOverlay.classList.remove("active");
    modalKorokOverlay.classList.add("closing");
}

/* TRIFORCE CLICK */

triforceTop.addEventListener("click", () => {

    if (!korokFound) {
        sound_dialog_start.currentTime = 0;
        sound_dialog_start.play();

        setTimeout(() => {
            sound_yahaha.currentTime = 0;
            sound_yahaha.play();
            openKorokModal(korokDialogsFirstTime);
        }, 1200);


        korokFound = true;
        triforceTop.classList.add("found");
    } else {
        sound_dialog_start.currentTime = 0;
        sound_dialog_start.play();

        setTimeout(() => {
            sound_korok_found01.currentTime = 0;
            sound_korok_found01.play();
        }, 300);


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
        sound_dialog_next.currentTime = 0;
        sound_dialog_next.play();
        typingController = typeDialog(
            korokTitle,
            activeKorokDialogs[korokDialogIndex]
        );
    } else {
        sound_dialog_end.currentTime = 0;
        sound_dialog_end.play();
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


const exitDialogs = document.querySelectorAll('.exit_dialog');

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

    exitDialogs.forEach(dialog => {
        dialog.style.transform = `translateY(${posYDialog}px)`;
    });

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