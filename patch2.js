const fs = require('fs');

let code = fs.readFileSync('hormuzrun/index.html', 'utf8');

// 1. fsBtn click
code = code.replace(
    "fsBtn.addEventListener('click', function() {\n    // Request fullscreen",
    "fsBtn.addEventListener('click', function() {\n    SFX.init();\n    SFX.resume();\n    SFX.playMusic();\n    // Request fullscreen"
);

// Desktop fallback gesture - on first interaction
code = code.replace(
    "function updateTitle(dt){",
    "let desktopAudioInit = false;\nfunction updateTitle(dt){"
);
code = code.replace(
    "game.screen = 'flagSelect';",
    "if (!desktopAudioInit) { SFX.init(); SFX.resume(); SFX.playMusic(); desktopAudioInit = true; }\n        SFX.blip();\n        game.screen = 'flagSelect';"
);

// 2. startTransit
code = code.replace(
    "function startTransit(){",
    "function startTransit(){\n    SFX.engineStart();\n    SFX.blip();"
);

// 3. title screen ping
code = code.replace(
    "game.titlePulse += dt;",
    "game.titlePulse += dt;\n    if (game.screen === 'title' && Math.sin(game.titlePulse*3)>0 && Math.sin((game.titlePulse-dt)*3)<=0) { SFX.ping(); }"
);

// 4. updateFlagSelect interactions
code = code.replace(
    "game.flagIdx = (game.flagIdx-1+FLAGS.length)%FLAGS.length;",
    "SFX.blip();\n        game.flagIdx = (game.flagIdx-1+FLAGS.length)%FLAGS.length;"
);
code = code.replace(
    "game.flagIdx = (game.flagIdx+1)%FLAGS.length;",
    "SFX.blip();\n        game.flagIdx = (game.flagIdx+1)%FLAGS.length;"
);

// 6. Mine hit
code = code.replace(
    /spawnParticles\(o\.x, o\.y, o\.type==='mine'\?25:12, o\.type==='mine'\?'#ff4400':'#aa8855', 100, 3\);/g,
    "spawnParticles(o.x, o.y, o.type==='mine'?25:12, o.type==='mine'?'#ff4400':'#aa8855', 100, 3);\n            if (o.type==='mine') SFX.explosion(); else SFX.scrape();"
);

// 7. Drone hit
code = code.replace(
    /spawnParticles\(dr\.x, dr\.y, 18, '#ff2200', 90, 2\.5\);/g,
    "spawnParticles(dr.x, dr.y, 18, '#ff2200', 90, 2.5);\n                SFX.droneHit();"
);

// 8. Land hit
code = code.replace(
    /spawnParticles\(player\.x, player\.y, 6, '#aa8855', 50, 2\);/g,
    "spawnParticles(player.x, player.y, 6, '#aa8855', 50, 2);\n        SFX.scrape();"
);

// 9. Encounter trigger
code = code.replace(
    "game.encounter.choiceIdx = -1;",
    "game.encounter.choiceIdx = -1;\n            SFX.engineStop();\n            SFX.fadeMusic(SFX.musicVol*0.2, 500);\n            SFX.radioStatic();"
);

// 10. resolveChoice outcomes
code = code.replace(
    /player\.hp = Math\.max\(0, player\.hp-dmg\);\n\s+game\.damageFlash = 1;\n\s+game\.screenShake = 3;\n\s+spawnParticles\(player\.x, player\.y, 15, '#ff4400', 80, 3\);/g,
    "SFX.droneHit();\n        player.hp = Math.max(0, player.hp-dmg);\n        game.damageFlash = 1;\n        game.screenShake = 3;\n        spawnParticles(player.x, player.y, 15, '#ff4400', 80, 3);"
);

// 11. Toll pay sf
code = code.replace(
    "const costStr = cost>0 ? ' (-'+fmtMoney(cost)+')' : '';",
    "if (cost>0) SFX.tollPay();\n    const costStr = cost>0 ? ' (-'+fmtMoney(cost)+')' : '';"
);

// 12. Leaving encounter
code = code.replace(
    "enc.active = false;",
    "enc.active = false;\n            SFX.fadeMusic(SFX.musicVol, 800);\n            if (player.alive) SFX.engineStart();"
);

// 13. Death check inside updateGameplay and encounters
// Handled via updating game over trigger.
code = code.replace(
    "function triggerGameOver(survived){",
    "function triggerGameOver(survived){\n    SFX.engineStop();\n    SFX.warnStop();\n    if (survived) SFX.success(); else SFX.death();"
);

// 14. Engine update & low hull warning in updateGameplay
code = code.replace(
    "updateParticles(dt);",
    "updateParticles(dt);\n    SFX.engineUpdate(player.vx);\n    if (player.hp < 30) SFX.warnStart(); else SFX.warnStop();"
);

// 15. Fix desktop gameStarted
// Desktop doesn't click fsBtn, so Audio gets started on first ENTER press.

fs.writeFileSync('hormuzrun/index.html', code);
console.log("SFX hooked up.");
