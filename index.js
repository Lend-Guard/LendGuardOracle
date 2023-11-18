const {Reallocation} = require("./src/contracts/reallocation");

async function checkAndReallocate() {
    let real = new Reallocation();
    if (await real.shouldReallocate()) {
        await real.reallocate();
    }
}

setInterval(checkAndReallocate, 100);
