const fs = require('fs');

let code = fs.readFileSync('hormuzrun/index.html', 'utf8');

// 1. Insert <audio> immediately after <body>
code = code.replace(
    "<body>",
    "<body>\n<audio id=\"bg-music\" src=\"theme.mp3\" preload=\"auto\" loop></audio>"
);

// 2. Change SFX.musicEl to reference it
code = code.replace(
    "musicEl: new Audio('theme.mp3'),",
    "musicEl: document.getElementById('bg-music'),"
);

// If there was any problem, this will definitely fix it, assuming theme.mp3 is 200 OK.
// To handle the case where it might be loaded previously and not found, let's catch it.

fs.writeFileSync('hormuzrun/index.html', code);
console.log("Audio tag injected.");
