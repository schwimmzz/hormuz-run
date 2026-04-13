const fs = require('fs');

let code = fs.readFileSync('hormuzrun/index.html', 'utf8');

// 1. Fix D-Pad rendering visibility
code = code.replace(
    "if(mob && dpadR > 0){",
    "if(isMobileDevice() && dpadR > 0){"
);

// 2. Pre-initialize musicEl so it can buffer
code = code.replace(
    "musicEl: null,",
    "musicEl: new Audio('theme.mp3'),"
);

code = code.replace(
    "// Theme music via HTML5 Audio\n        this.musicEl = new Audio('theme.mp3');",
    "// Theme music via HTML5 Audio"
);

// 3. Catch and log play errors
code = code.replace(
    "this.musicEl.play().catch(()=>{});",
    "this.musicEl.play().catch(e => console.log('Music play error:', e));"
);

fs.writeFileSync('hormuzrun/index.html', code);
console.log("Patched.");
