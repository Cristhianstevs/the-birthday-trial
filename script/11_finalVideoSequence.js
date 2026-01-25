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

    // Sai do inventário
    inventory.classList.add("fade-out");
    sound_inventory_close.currentTime = 0;
    sound_inventory_close.play();

    complete.style.display = "flex";

    complete.offsetHeight;

    // fade-in do complete 
    complete.classList.add("show");

    setTimeout(() => {
        inventory.style.display = "none";
    }, 100);

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


    // Você provou ser digno do tesouro...
    show(speak01Final);
    sound_voice01.currentTime = 0;
    sound_voice01.play();
    await wait(5000);
    hide(speak01Final);
    await wait(2000);


    // Mas sua aventura apenas começou...
    show(speak02Final);
    sound_voice02.currentTime = 0;
    sound_voice02.play();
    await wait(5000);
    hide(speak02Final);
    await wait(2000);


    // Continue aprimorando suas habilidades...
    show(speak03Final);
    sound_voice03.currentTime = 0;
    sound_voice03.play();
    await wait(5000);
    hide(speak03Final);
    await wait(2000);


    // Parabéns, Herói...
    show(speak04Final);
    sound_voice04.currentTime = 0;
    sound_voice04.play();
    await wait(5000);
    hide(speak04Final);
    await wait(2000);


    // Que a deusa sorria para você...
    show(speak05Final);
    sound_voice05.currentTime = 0;
    sound_voice05.play();
    await wait(5000);
    hide(speak05Final);
    await wait(2000);

    
    // Animação missão completa
    show(completeMission);

    sound_start_mission.currentTime = 0;
    sound_start_mission.play();
    
    setTimeout(() => {
        sound_complete_mission.currentTime = 0;
        sound_complete_mission.play();
    }, 1500);

    await wait(3000);

    // Encerra vídeo
    videoFinal.pause();
    hide(videoFinalWrap);
    
    await wait(3000);
    
    setTimeout(() => {
        startFinalCredits();
    }, 2000);
}