/* ========================= */
/*        MODAL_SURE         */
/* ========================= */

const modalSureOverlay = document.querySelector(".modal_sure_overlay");
const buttonSureYes = document.getElementById("button_sure_yes");
const buttonSureNo = document.getElementById("button_sure_no");

// começa escondido
hide(modalSureOverlay);

/* ABRIR */
function openModalSure() {
    show(modalSureOverlay);
    sound_open_sure.currentTime = 0;
    sound_open_sure.play();
}

/* FECHAR */
function closeModalSure() {
    hide(modalSureOverlay);
    sound_no_sure.currentTime = 0;
    sound_no_sure.play();
}

/* FINAL */
buttonSureYes.addEventListener("click", () => {
    hide(modalSureOverlay);
    sound_start.currentTime = 0;
    sound_start.play();

    setTimeout (() => {closeModalReward();}, 2000)

    setTimeout (() => {startFinalSequence();;}, 4000)
    
});

/* CANCELAR */
buttonSureNo.addEventListener("click", () => {
    closeModalSure();
});

/* BLOQUEIA CLIQUE ACIDENTAL NO FUNDO */
modalSureOverlay.addEventListener("click", (e) => {
    if (e.target === modalSureOverlay) {
        closeModalSure();
    }
});
