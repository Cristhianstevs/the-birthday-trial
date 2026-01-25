/* ===================== */
/*        AUDIOS         */
/* ===================== */


const sound_start = document.getElementById("startSound");

const sound_start_mission = document.getElementById("StartMissionSound");
const sound_objective = document.getElementById("objectiveSound");
const sound_complete_mission = document.getElementById("completeMissionSound");

const sound_voice01 = document.getElementById("voiceSound01");
const sound_voice02 = document.getElementById("voiceSound02");
const sound_voice03 = document.getElementById("voiceSound03");
const sound_voice04 = document.getElementById("voiceSound04");
const sound_voice05 = document.getElementById("voiceSound05");
const sound_voice06 = document.getElementById("voiceSound06");
const sound_voice07 = document.getElementById("voiceSound07");

const sound_inventory_open = document.getElementById("inventoryOpenSound");
const sound_inventory_close = document.getElementById("inventoryCloseSound");

const sound_dialog_start = document.getElementById("dialogStartSound");
const sound_dialog_next = document.getElementById("dialogNextSound");
const sound_dialog_end = document.getElementById("dialogEndSound");

const sound_yahaha = document.getElementById("korokSound");
const sound_korok_found01 = document.getElementById("korokFound01Sound");
const sound_korok_found02 = document.getElementById("korokFound02Sound");

const sound_reward = document.getElementById("rewardSound");

const sound_typing = document.getElementById("cursorMove02Sound");
const sound_delete = document.getElementById("cursorMove03Sound");

const sound_input_error = document.getElementById("errorInputSound");

const sound_credits = document.getElementById("creditsSound");


// volume
function setVolume(audio, value) {
    if (audio) audio.volume = value;
}

setVolume(sound_voice01, 1)
setVolume(sound_voice02, 1)
setVolume(sound_voice03, 1)
setVolume(sound_voice04, 1)
setVolume(sound_voice05, 1)
setVolume(sound_voice06, 1)
setVolume(sound_voice07, 1)
setVolume(sound_inventory_open, 0.1)
setVolume(sound_dialog_next, 0.5)
setVolume(sound_reward, 0.5)
setVolume(sound_typing, 0.4)
setVolume(sound_delete, 0.2)
