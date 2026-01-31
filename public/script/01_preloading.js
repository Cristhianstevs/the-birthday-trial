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
            "./public/credit_img01.jpeg",
            "./public/credit_img02.jpeg",
            "./public/credit_img03.jpeg",
            "./public/credit_img04.jpeg",
            "./public/credit_img05.jpeg",
            "./public/credit_img06.jpeg",
            "./public/credit_img07.jpeg",
            "./public/credit_img08.jpeg",
            "./public/credit_img09.jpeg",
            "./public/credit_img10.jpeg",
            "./public/credit_img11.jpeg",
            "./public/credit_img12.jpeg",
            "./public/credit_img13.jpeg",
            "./public/credit_img14.jpeg",
            "./public/credit_img15.jpeg",
            "./public/credit_img16.jpeg",
            "./public/credit_img17.jpeg",
            "./public/credit_img18.jpeg",
            "./public/credit_img19.jpeg",
            "./public/credit_img20.jpeg",
            "./public/background01_zelda.jpg",
            "./public/background02_zelda.jpg",
            "./public/background03_zelda.jpg",
            "./public/background04_zelda.jpg",
            "./public/background05_zelda.jpg",
            "./public/background06_zelda.jpg",
            "./public/background07_zelda.jpg",
            "./public/background08_zelda.jpg",
            "./public/background09_zelda.jpg",
            "./public/background10_zelda.jpg",
            "./public/background11_zelda.jpg",
            "./public/background12_zelda.jpg",
            "./public/background13_zelda.jpg",
            "./public/background14_zelda.jpg",
            "./public/background15_zelda.jpg",
            "./public/background16_zelda.jpg",
            "./public/background17_zelda.jpg",
            "./public/background18_zelda.jpg",
            "./public/background19_zelda.jpg",
            "./public/background20_zelda.jpg",
            "./public/background21_zelda.jpg",
            "./public/background22_zelda.jpg",
            "./public/background23_zelda.jpg",
            "./public/background24_zelda.jpg",
            "./public/background25_zelda.jpg",
            "./public/background26_zelda.jpg",
            "./public/background27_zelda.jpg",
            "./public/background28_zelda.jpg",
            "./public/reward06.jpg",
            "./public/alert_icon.png",
            "./public/korok01.png",
            "./public/korok02.png",
            "./public/korok03.png",
            "./public/master_sword.png",
            "./public/reward.png",
            "./public/reward03.png",
            "./public/reward04.png",
            "./public/reward07.png",
            "./public/reward08.png",
            "./public/reward09.png",
            "./public/rupee_icon.png",
            "./public/korok02.webp",          
            "./public/reward02.webp",          
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
