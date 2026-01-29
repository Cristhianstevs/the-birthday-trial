/* ============================================== */
/*         ANIMATION_ARROW_JOYSTICK_RIGHT         */
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
