/* ===================== */
/*        AUDIOS         */
/* ===================== */


const sound_start = document.getElementById("startSound");

const sound_start_mission = document.getElementById("StartMissionSound");
const sound_objective = document.getElementById("objectiveSound");
const sound_complete_mission = document.getElementById("completeMissionSound");

const sound_voice01 = document.getElementById("voiceSound01");
const sound_voice02 = document.getElementById("voiceSound02");
const sound_voice03 = document.getElementById("voiceSound03");
const sound_voice04 = document.getElementById("voiceSound04");
const sound_voice05 = document.getElementById("voiceSound05");
const sound_voice06 = document.getElementById("voiceSound06");
const sound_voice07 = document.getElementById("voiceSound07");

const sound_inventory_open = document.getElementById("inventoryOpenSound");
const sound_inventory_close = document.getElementById("inventoryCloseSound");

const sound_dialog_start = document.getElementById("dialogStartSound");
const sound_dialog_next = document.getElementById("dialogNextSound");
const sound_dialog_end = document.getElementById("dialogEndSound");

const sound_yahaha = document.getElementById("korokSound");
const sound_korok_found01 = document.getElementById("korokFound01Sound");
const sound_korok_found02 = document.getElementById("korokFound02Sound");

const sound_reward = document.getElementById("rewardSound");

const sound_typing = document.getElementById("cursorMove02Sound");
const sound_delete = document.getElementById("cursorMove03Sound");

const sound_input_error = document.getElementById("errorInputSound");

const sound_credits = document.getElementById("creditsSound");

sound_voice01.volume = 1;
sound_voice02.volume = 1;
sound_voice03.volume = 1;
sound_voice04.volume = 1;
sound_voice05.volume = 1;
sound_voice06.volume = 1;
sound_voice07.volume = 1;
sound_inventory_open.volume = .1;
sound_dialog_next.volume = .5;
sound_reward.volume = 0.5;
sound_typing.volume = 0.4;
sound_delete.volume = 0.2;
sound_credits.volume = 0.4;
sound_credits.playbackRate = 0.95;

/* ======================================= */
/*         ANIMATION_TEXT_WHRITING         */
/* ======================================= */


function iniciarEscrita() {
    const container = document.getElementById("meuTexto");
    if (!container) return;
    
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
}



/* =============================== */
/*         START SEQUENCE          */
/* =============================== */

const startScreen = document.querySelector(".start");
const pressStart = document.querySelector(".start_contain");
const presents = document.querySelector(".start_presents");
const title = document.querySelector(".start_title");
const subtitle = document.querySelector(".start_subtitle");
const videoWrap = document.querySelector(".video");
const video = videoWrap.querySelector("video");
const speak01 = document.getElementById("speak01");
const speak02 = document.getElementById("speak02");
const speak03 = document.getElementById("speak03");
const speak04 = document.getElementById("speak04");
const speak05 = document.getElementById("speak05");
const speak06 = document.getElementById("speak06");
const speak07 = document.getElementById("speak07");
const mission = document.querySelector(".start_mission");
const bg = document.getElementById("bg");

let started = false;

/* UTIL */
function show(el) {
    el.style.display = "flex";
}

function hide(el) {
    el.style.display = "none";
}

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/* INIT */
pressStart.style.display = "flex";

/* SEQUÊNCIA PRINCIPAL */
async function startGameSequence() {
    if (started) return;
    started = true;
    
    sound_start.currentTime = 0;
    sound_start.play();

    // Fade-out Press Start
    pressStart.classList.add("fade-out");
    await wait(1200);
    hide(pressStart);
    await wait(4000);
    
    
    // Cristhian Apresenta
    show(presents);
    await wait(6000);
    hide(presents);
    await wait(1200);
    
    // The Legend of Zelda
    show(title);
    await wait(6000);
    hide(title);
    await wait(1200);
    
    // The Birthday Trial
    show(subtitle);
    await wait(6000);
    hide(subtitle);
    await wait(1000);
    
    // Vídeo começa
    show(videoWrap);

    video.currentTime = 0;    
    
    videoWrap.classList.add("fade-in");
    video.muted = false;
    video.volume = 1;
    video.play();

    await wait(5000);

    show(speak01);
    sound_voice05.currentTime = 0;
    sound_voice05.play();
    await wait(6000);
    hide(speak01);
    await wait(2000);

    show(speak02);
    sound_voice02.currentTime = 0;
    sound_voice02.play();
    await wait(5000);
    hide(speak02);
    await wait(2000);

    show(speak03);
    sound_voice03.currentTime = 0;
    sound_voice03.play();
    await wait(5000);
    hide(speak03);
    await wait(2000);

    show(speak04);
    sound_voice04.currentTime = 0;
    sound_voice04.play();
    await wait(6000);
    hide(speak04);
    await wait(2000);

    show(speak05);
    sound_voice01.currentTime = 0;
    sound_voice01.play();
    await wait(7000);
    hide(speak05);
    await wait(2000);

    show(speak06);
    sound_voice06.currentTime = 0;
    sound_voice06.play();
    await wait(6000);
    hide(speak06);
    await wait(2000);

    show(speak07);
    sound_voice07.currentTime = 0;
    sound_voice07.play();
    await wait(5000);
    hide(speak07);
    await wait(2000);

    // Missão Principal entra
    show(mission);

    sound_start_mission.currentTime = 0;
    sound_start_mission.play();

    setTimeout(() => {
        sound_objective.currentTime = 0;
        sound_objective.play();
    }, 1520);

    await wait(6000);

    startScreen.style.display = "none";
    bg.style.display = "flex";

    sound_inventory_open.currentTime = 0;
    sound_inventory_open.play();

    iniciarEscrita();
}

/* INPUT */
startScreen.addEventListener("click", startGameSequence);
startScreen.addEventListener("keydown", startGameSequence);



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

    bg.style.cursor = "none";

    if (sound_dialog_end) {
        sound_dialog_end.currentTime = 0;
        sound_dialog_end.play();
    }

    rewardUnlocked = false;
    limparInputs();

    setTimeout(() => {
        startFinalSequence();
    }, 2000);
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

/* DIÁLOGOS */

const korokDialogsFirstTime = [
    "Ya-ha-ha! Você me encontrou!\nVou te dar algumas dicas.",
    "Um: A quem pertence",
    "Dois: O seu tipo",
    "Três: Me é familiar"
];

const korokDialogsRepeat = [
    "Hi-hi!\nEssas são as dicas:",
    "Um: A quem pertence",
    "Dois: O seu tipo",
    "Três: Me é familiar"
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



/* =============================== */
/*     FINAL VIDEO SEQUENCE        */
/* =============================== */


const complete = document.querySelector(".complete");
const videoFinalWrap = document.querySelector(".video_contain_final");
const videoFinal = document.getElementById("video_final");

const speak01Final = document.getElementById("speak01_final");
const speak02Final = document.getElementById("speak02_final");
const speak03Final = document.getElementById("speak03_final");
const speak04Final = document.getElementById("speak04_final");
const speak05Final = document.getElementById("speak05_final");

const completeMission = document.querySelector(".complete_mission");

let finalStarted = false;

/* SEQUÊNCIA FINAL */

async function startFinalSequence() {
    if (finalStarted) return;
    finalStarted = true;

    // fade-out do bg
    bg.classList.add("fade-out");
    sound_inventory_close.currentTime = 0;
    sound_inventory_close.play();

    // garante que o complete esteja visível antes de animar
    complete.style.display = "flex";

    // força reflow (importante para garantir a transição)
    complete.offsetHeight;

    // fade-in do complete
    complete.classList.add("show");

    // depois da animação, esconde o bg de vez
    setTimeout(() => {
        bg.style.display = "none";
    }, 100); // mesmo tempo do transition

    // reset visual
    hide(videoFinalWrap);
    hide(completeMission);

    hide(speak01Final);
    hide(speak02Final);
    hide(speak03Final);
    hide(speak04Final);
    hide(speak05Final);

    // mostra vídeo
    show(videoFinalWrap);
    videoFinalWrap.classList.add("show");

    videoFinal.currentTime = 0;
    videoFinal.muted = true;
    videoFinal.volume = 1;
    videoFinal.play();

    await wait(5000);

    show(speak01Final);
    sound_voice01.currentTime = 0;
    sound_voice01.play();
    await wait(5000);
    hide(speak01Final);
    await wait(2000);

    show(speak02Final);
    sound_voice02.currentTime = 0;
    sound_voice02.play();
    await wait(5000);
    hide(speak02Final);
    await wait(2000);

    show(speak03Final);
    sound_voice03.currentTime = 0;
    sound_voice03.play();
    await wait(5000);
    hide(speak03Final);
    await wait(2000);

    show(speak04Final);
    sound_voice04.currentTime = 0;
    sound_voice04.play();
    await wait(5000);
    hide(speak04Final);
    await wait(2000);

    show(speak05Final);
    sound_voice05.currentTime = 0;
    sound_voice05.play();
    await wait(5000);
    hide(speak05Final);
    await wait(2000);

    
    // missão completa
    show(completeMission);

    sound_start_mission.currentTime = 0;
    sound_start_mission.play();
    
    setTimeout(() => {
        sound_complete_mission.currentTime = 0;
        sound_complete_mission.play();
    }, 1500);

    await wait(3000);

    // encerra vídeo
    videoFinal.pause();
    hide(videoFinalWrap);
    
    await wait(3000);
    
    setTimeout(() => {
        startFinalCredits();
    }, 2000);
}



/* =========================== */
/*         END CREDITS         */
/* =========================== */


/* IMAGENS DOS CRÉDITOS */

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

const IMAGE_DURATION = 15000;
let currentImageIndex = 0;
let imageTimer = null;

function showCreditImage(index) {
    creditImages.forEach(img => {
        img.className = img.className.replace(/\b(active|move_\S+)\b/g, "");
    });

    const img = creditImages[index];
    if (!img) return;

    void img.offsetWidth;

    img.classList.add("active");
    img.classList.add(imageAnimationMap[index]);
}

function startCreditImages() {
    showCreditImage(0);

    imageTimer = setInterval(() => {
        currentImageIndex++;

        if (currentImageIndex >= creditImages.length) {
            clearInterval(imageTimer);
            return;
        }

        showCreditImage(currentImageIndex);
    }, IMAGE_DURATION);
}

/* SCROLL DOS CRÉDITOS */

const credits = document.querySelector(".credits");
const creditsContainer = document.querySelector(".credits_contain");
const finalScreen = document.getElementById("finalScreen");
const CREDITS_DURATION = 350;

function startCreditsScroll() {
    creditsContainer.style.animation =
        `creditsScroll ${CREDITS_DURATION}s linear forwards`;

    creditsContainer.addEventListener("animationend", onCreditsFinished);
}

/* FINAL DOS CRÉDITOS */

function onCreditsFinished() {
    console.log("Créditos finalizados");
    credits.style.display = "none";
    finalScreen.style.display = "flex";
}

/* START FINAL */

function startFinalCredits() {
    credits.style.display = "flex";

    sound_credits.currentTime = 0;
    sound_credits.play();

    startCreditImages();
    startCreditsScroll();
}



/* ============================ */
/*         FINAL SCREEN         */
/* ============================ */


function button_restart_credits() {
    sound_dialog_start.currentTime = 0;
    sound_dialog_start.play();

    setTimeout(() => {
        finalScreen.style.display = "none";
        startFinalCredits();
    }, 1500);
}

function button_restart() {
    sound_dialog_start.currentTime = 0;
    sound_dialog_start.play();

    setTimeout(() => {
        window.location.reload()
    }, 1500);
}

function button_reward() {
    sound_dialog_start.currentTime = 0;
    sound_dialog_start.play();

    setTimeout(() => {
        openModalReward();
    }, 1500);
}
