/* ========================= */
/*        PRELOADING         */
/* ========================= */


let assetsLoaded = false;

function preloadImages(urls) {
    return Promise.all(
        urls.map(src => {
            return new Promise(resolve => {
                const img = new Image();
                img.src = src;
                img.onload = resolve;
                img.onerror = () => {
                    console.warn("Falha ao carregar:", src);
                    resolve();
                };
            });
        })
    );
}

function preloadAudios(audios) {
    return Promise.all(
        audios.map(audio => {
            return new Promise(resolve => {
                audio.load();
                audio.addEventListener("canplaythrough", resolve, { once: true });
            });
        })
    );
}

function preloadVideo(video) {
    return new Promise(resolve => {
        video.muted = true;
        video.playsInline = true;

        video.addEventListener("canplaythrough", resolve, { once: true });
        video.load();
    });
}


async function preloadEverything() {
    const loadingScreen = document.getElementById("loadingScreen");

    show(loadingScreen);

    try {
        await preloadImages([
            "../assets/image/credit_img01.jpeg",
            "../assets/image/credit_img02.jpeg",
            "../assets/image/credit_img03.jpeg",
            "../assets/image/credit_img04.jpeg",
            "../assets/image/credit_img05.jpeg",
            "../assets/image/credit_img06.jpeg",
            "../assets/image/credit_img07.jpeg",
            "../assets/image/credit_img08.jpeg",
            "../assets/image/credit_img09.jpeg",
            "../assets/image/credit_img10.jpeg",
            "../assets/image/credit_img11.jpeg",
            "../assets/image/credit_img12.jpeg",
            "../assets/image/credit_img13.jpeg",
            "../assets/image/credit_img14.jpeg",
            "../assets/image/credit_img15.jpeg",
            "../assets/image/credit_img16.jpeg",
            "../assets/image/credit_img17.jpeg",
            "../assets/image/credit_img18.jpeg",
            "../assets/image/credit_img19.jpeg",
            "../assets/image/credit_img20.jpeg",
            "../assets/image/background01_zelda.jpg",
            "../assets/image/background02_zelda.jpg",
            "../assets/image/background03_zelda.jpg",
            "../assets/image/background04_zelda.jpg",
            "../assets/image/background05_zelda.jpg",
            "../assets/image/background06_zelda.jpg",
            "../assets/image/background07_zelda.jpg",
            "../assets/image/background08_zelda.jpg",
            "../assets/image/background09_zelda.jpg",
            "../assets/image/background10_zelda.jpg",
            "../assets/image/background11_zelda.jpg",
            "../assets/image/background12_zelda.jpg",
            "../assets/image/background13_zelda.jpg",
            "../assets/image/background14_zelda.jpg",
            "../assets/image/background15_zelda.jpg",
            "../assets/image/background16_zelda.jpg",
            "../assets/image/background17_zelda.jpg",
            "../assets/image/background18_zelda.jpg",
            "../assets/image/background19_zelda.jpg",
            "../assets/image/background20_zelda.jpg",
            "../assets/image/background21_zelda.jpg",
            "../assets/image/background22_zelda.jpg",
            "../assets/image/background23_zelda.jpg",
            "../assets/image/background24_zelda.jpg",
            "../assets/image/background25_zelda.jpg",
            "../assets/image/background26_zelda.jpg",
            "../assets/image/background27_zelda.jpg",
            "../assets/image/background28_zelda.jpg",
            "../assets/image/reward06.jpg",
            "../assets/image/alert_icon.png",
            "../assets/image/korok01.png",
            "../assets/image/korok02.png",
            "../assets/image/korok03.png",
            "../assets/image/master_sword.png",
            "../assets/image/reward.png",
            "../assets/image/reward03.png",
            "../assets/image/reward04.png",
            "../assets/image/reward07.png",
            "../assets/image/reward08.png",
            "../assets/image/reward09.png",
            "../assets/image/rupee_icon.png",
            "../assets/image/korok02.webp",
            "../assets/image/reward02.webp",
        ]);

        await preloadAudios([
            sound_start,
            sound_start_mission,
            sound_objective,
            sound_complete_mission,
            sound_voice01,
            sound_voice02,
            sound_voice03,
            sound_voice04,
            sound_voice05,
            sound_voice06,
            sound_voice07,
            sound_inventory_open,
            sound_inventory_close,
            sound_dialog_start,
            sound_dialog_next,
            sound_dialog_end,
            sound_yahaha,
            sound_korok_found01,
            sound_korok_found02,
            sound_reward,
            sound_typing,
            sound_delete,
            sound_input_error,
            sound_credits
        ]);

        await preloadVideo(video);
        await preloadVideo(videoFinal);

    } catch (e) {
        console.warn("Erro no preload:", e);
    }

    assetsLoaded = true;

    loadingScreen.classList.add("hidden");

    setTimeout(() => {
        hide(loadingScreen);
        show(startScreen);
        pressStart.classList.add("show");
    }, 1200);
}


window.addEventListener("load", preloadEverything);
