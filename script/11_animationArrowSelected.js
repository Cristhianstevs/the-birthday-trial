/* ======================================== */
/*         ANIMATION_ARROW_SELECTED         */
/* ======================================== */


const tris = document.querySelectorAll('.tri');

const DIST = 6;
const IN_TIME = 250;
const OUT_TIME = 260;

let diagStart = null;
let diagPhase = 'in';

function easeOutFast(t) {
    return 1 - Math.pow(1 - t, 3);
}

function easeInSlow(t) {
    return t * t;
}

function animateDiagonal(time) {
    if (!diagStart) diagStart = time;

    const duration = diagPhase === 'in' ? IN_TIME : OUT_TIME;
    let t = Math.min((time - diagStart) / duration, 1);

    const eased = diagPhase === 'in'
        ? easeOutFast(t)
        : easeInSlow(t);

    const amount = diagPhase === 'in'
        ? DIST * (1 - eased)
        : DIST * eased;

    tris.forEach(tri => {
        const [dx, dy] = tri.dataset.dir.split(',').map(Number);
        tri.style.setProperty('--tx', `${dx * amount}px`);
        tri.style.setProperty('--ty', `${dy * amount}px`);
    });

    if (t < 1) {
        requestAnimationFrame(animateDiagonal);
    } else {
        diagStart = null;
        diagPhase = diagPhase === 'in' ? 'out' : 'in';
        requestAnimationFrame(animateDiagonal);
    }
}

requestAnimationFrame(animateDiagonal);