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
    "Um: A quem pertence.",
    "Dois: O seu tipo.",
    "Três: Me é familiar."
];

const korokDialogsRepeat = [
    "Hi-hi!\nEssas são as dicas:",
    "Um: A quem pertence.",
    "Dois: O seu tipo.",
    "Três: Me é familiar."
];

let activeKorokDialogs = [];
let korokDialogIndex = 0;
let korokFound = false;

/* ANIMAÇÃO ESCRITA */

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