const fs = require('fs');
let code = fs.readFileSync('hormuzrun/index.html', 'utf8');

// Remove touchend wrapper
code = code.replace(
    "// Also handle tapping the overlay itself as a fallback\nfsBtn.addEventListener('touchend', function(e) {\n    e.preventDefault();\n    fsBtn.click();\n});\n",
    ""
);

fs.writeFileSync('hormuzrun/index.html', code);
console.log("Removed touchend handler.");
