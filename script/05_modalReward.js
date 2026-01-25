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

    inventory.style.cursor = "none";

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