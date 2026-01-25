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