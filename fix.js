const fs = require('fs');

let code = fs.readFileSync('hormuzrun/index.html', 'utf8');

code = code.replace(
    /const panelH = mob \? ch\*0\.94 : Math\.min\(700, ch\*0\.92\);\n        const panelW = mob \? cw\*0\.94 : Math\.min\(720, cw\*0\.9\);\n        const rowH = mob \? Math\.max\(28, panelH\*0\.065\) : Math\.max\(35, panelH\*0\.065\);/g,
    "const rowH = mob ? Math.max(28, panelH*0.065) : Math.max(35, panelH*0.065);"
);

// We should also check updateEncounter for similar redeclarations.
// In patch.js I did:
/*
code = code.replace(
    /const choiceH = mob\?28:34;/g,
    "const panelH = Math.min(Math.max(100,200), ch*0.92);\n            const panelW = mob ? cw*0.94 : Math.min(620, cw*0.82);\n            const choiceH = Math.max(28, panelH*0.07);"
);
*/

code = code.replace(
    /const panelH = Math\.min\(Math\.max\(100,200\), ch\*0\.92\);\n            const panelW = mob \? cw\*0\.94 : Math\.min\(620, cw\*0\.82\);\n            const choiceH = Math\.max\(28, panelH\*0\.07\);/g,
    "const choiceH = Math.max(28, panelH*0.07);"
);

// Wait, let's verify if updateEncounter has panelW/panelH already defined in that scope.
// Original: 
/*
        if(mouseClick && enc._choiceYs){
            const mob = canvas.width<600;
            const pad = mob?12:20;
            const choiceH = mob?28:34;
            const panelW = mob ? canvas.width*0.94 : Math.min(620, canvas.width*0.82);
            const px = (canvas.width-panelW)/2;
*/
// It has panelW, but no panelH!
// The formula for panelH in renderEncounter is:
// const panelH = Math.min(Math.max(needH,200), canvas.height*0.92);
// in updateEncounter, needH is not calculated. It's too complex to compute dynamically on click.
// So choiceH just needs to be an approximation based on ch.
// We can just use ch*0.07.

code = code.replace(
    /const choiceH = Math\.max\(28, panelH\*0\.07\);/g,
    "const choiceH = Math.max(28, ch*0.06);"
);

fs.writeFileSync('hormuzrun/index.html', code);
console.log("Fixed!");
