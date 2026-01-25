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