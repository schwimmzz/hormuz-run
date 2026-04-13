const fs = require('fs');
let code = fs.readFileSync('hormuzrun/index.html', 'utf8');

// 1. Safe playMusic
code = code.replace(
    "this.musicEl.play().catch(e => console.log('Music play error:', e));",
    "if (this.musicEl.paused) { this.musicEl.play().catch(e => console.log('Music play error:', e)); }"
);

// 2. Remove desktop audio init from updateTitle loop
code = code.replace(
    "if (!desktopAudioInit) { SFX.init(); SFX.resume(); SFX.playMusic(); desktopAudioInit = true; }",
    ""
);

// 3. Add initDesktopAudio wrapper and bind to OS events
const wrapper = `
function initDesktopAudio() {
    if (!desktopAudioInit) {
        SFX.init();
        SFX.resume();
        SFX.playMusic();
        desktopAudioInit = true;
    }
}
`;
code = code.replace(
    "window.addEventListener('click', e => {",
    "window.addEventListener('click', e => {\n    initDesktopAudio();"
);
code = code.replace(
    "window.addEventListener('keydown', e => {",
    "window.addEventListener('keydown', e => {\n    initDesktopAudio();"
);
code = code.replace(
    "let desktopAudioInit = false;\nfunction updateTitle(dt){",
    "let desktopAudioInit = false;\n" + wrapper + "\nfunction updateTitle(dt){"
);

// To make sure fsBtn sets desktopAudioInit so it doesn't double-trigger:
code = code.replace(
    "SFX.resume();\n    SFX.playMusic();",
    "SFX.resume();\n    SFX.playMusic();\n    desktopAudioInit = true;"
);

fs.writeFileSync('hormuzrun/index.html', code);
console.log("Audio contexts secured.");
