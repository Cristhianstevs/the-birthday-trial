/* ============================ */
/*         FINAL SCREEN         */
/* ============================ */

// Novo Jogo
function button_restart() {
    sound_dialog_start.currentTime = 0;
    sound_dialog_start.play();

    setTimeout(() => {
        window.location.reload();
    }, 1500);
}

// Código Recompensa
function button_reward() {
    sound_dialog_start.currentTime = 0;
    sound_dialog_start.play();

    setTimeout(() => {
        openModalReward(true);
    }, 1500);
}

// Rever Créditos
function button_restart_credits() {
    sound_dialog_start.currentTime = 0;
    sound_dialog_start.play();

    setTimeout(() => {
        startFinalCredits();
    }, 1500);
}
