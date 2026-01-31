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
const inventory = document.getElementById("inventory");

let started = false;

/* UTIL */
function show(el) {
    if (!el) return;
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

/* PLAY WRAPPER */
function handleStartInteraction() {
    if (!assetsLoaded) return;
    if (started) return;

    sound_start.currentTime = 0;
    sound_start.play();

    startGameSequence();
}

/* SEQUÊNCIA PRINCIPAL */
async function startGameSequence() {
    if (!assetsLoaded) return;
    if (started) return;
    started = true;


    // Fade-out Continue
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
    

    // Começa o Vídeo
    show(videoWrap);

    video.currentTime = 0;    
    videoWrap.classList.add("fade-in");
    video.muted = false;
    video.volume = 1;
    video.play();

    await wait(5000);


    // Ao herói que deseja...
    show(speak01);
    sound_voice05.currentTime = 0;
    sound_voice05.play();
    await wait(6000);
    hide(speak01);
    await wait(2000);

    
    // Nas terras do Grande Platô...
    show(speak02);
    sound_voice02.currentTime = 0;
    sound_voice02.play();
    await wait(5000);
    hide(speak02);
    await wait(2000);


    // Encontre três termos ocultos...
    show(speak03);
    sound_voice03.currentTime = 0;
    sound_voice03.play();
    await wait(5000);
    hide(speak03);
    await wait(2000);


    // Um: Nas águas que carregam...
    show(speak04);
    sound_voice04.currentTime = 0;
    sound_voice04.play();
    await wait(6000);
    hide(speak04);
    await wait(2000);


    // Dois: Trece o despertar...
    show(speak05);
    sound_voice01.currentTime = 0;
    sound_voice01.play();
    await wait(7000);
    hide(speak05);
    await wait(2000);


    // Três: No ápice da maior ruína...
    show(speak06);
    sound_voice06.currentTime = 0;
    sound_voice06.play();
    await wait(6000);
    hide(speak06);
    await wait(2000);


    // Os filhos da floresta...
    show(speak07);
    sound_voice07.currentTime = 0;
    sound_voice07.play();
    await wait(5000);
    hide(speak07);
    await wait(2000);


    // Animação Missão Principal
    show(mission);

    sound_start_mission.currentTime = 0;
    sound_start_mission.play();

    setTimeout(() => {
        sound_objective.currentTime = 0;
        sound_objective.play();
    }, 1520);

    await wait(6000);


    // Acaba o vídeo, entra o inventário
    startScreen.style.display = "none";
    inventory.style.display = "flex";

    sound_inventory_open.currentTime = 0;
    sound_inventory_open.play();

    iniciarEscrita();
}

/* INPUT */
startScreen.addEventListener("click", handleStartInteraction);
// Tecla do teclado inicia
// document.addEventListener("keydown", handleStartInteraction);
