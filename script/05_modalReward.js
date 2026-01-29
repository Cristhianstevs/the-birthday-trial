/* =========================== */
/*        MODAL_REWARD         */
/* =========================== */

const modalRewardOverlay = document.querySelector(".modal_reward_overlay");
const modalReward = document.querySelector(".modal_reward");
const modalRewardContain = document.querySelector(".modal_reward_contain");
const exitReward = modalRewardOverlay.querySelector(".exit_dialog");

let rewardFromFinalScreen = false;
let rewardUnlocked = false;

/* RESET ANIMAÇÃO */
function resetarAnimacaoReward() {
    modalRewardOverlay.classList.remove("active");
    void modalRewardOverlay.offsetWidth;
    modalRewardOverlay.classList.add("active");
}

/* ABRIR */
function openModalReward(fromFinalScreen = false) {
    rewardFromFinalScreen = fromFinalScreen;

    modalRewardOverlay.style.display = "flex";
    modalRewardOverlay.classList.remove("closing");

    resetarAnimacaoReward();

    if (sound_reward) {
        sound_reward.currentTime = 0;
        sound_reward.play();
    }
}

/* FECHAR */
function closeModalReward() {
    modalRewardOverlay.classList.remove("active");
    modalRewardOverlay.classList.add("closing");

    inventory.style.cursor = "none";

    if (sound_dialog_end) {
        sound_dialog_end.currentTime = 0;
        sound_dialog_end.play();
    }

    rewardUnlocked = false;
    limparInputs();
}

/* FIM DA ANIMAÇÃO */
modalRewardOverlay.addEventListener("animationend", (e) => {
    if (e.animationName === "blurOut") {
        modalRewardOverlay.style.display = "none";
        modalRewardOverlay.classList.remove("closing");
    }
});

/* CLIQUES */
function handleRewardOverlayClick() {
    if (rewardFromFinalScreen) {
        closeModalReward(); // comportamento simples no final
    } else {
        openModalSure(); // comportamento normal do jogo
    }
}

modalRewardOverlay.addEventListener("click", handleRewardOverlayClick);
modalRewardContain.addEventListener("click", handleRewardOverlayClick);

if (exitReward) {
    exitReward.addEventListener("click", (e) => {
        e.stopPropagation();
        closeModalReward();
    });
}

/* NÃO FECHA AO CLICAR DENTRO */
modalReward.addEventListener("click", (e) => {
    e.stopPropagation();
});