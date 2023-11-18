const {Reallocation} = require("./src/contracts/reallocation.js");

async function checkAndReallocate() {
    let real = new Reallocation();
    if (await real.isReallocationRequired()) {
        await real.reallocate();
    }
}

setInterval(checkAndReallocate, 100);
