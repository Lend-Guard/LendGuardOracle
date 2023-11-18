import { Reallocation } from '../contracts/reallocation.js';

export async function checkAndReallocate() {
    try {
        let real = new Reallocation();

        if (await real.isReallocationRequired()) {
            await real.reallocate();
        }
    } catch (
        error
    ) {
        console.error('Error fetching ...:', error);
    }
}

export async function checkRequirements(walletsList) {
    let reallocation = new Reallocation();
    if (await reallocation.isReallocationRequired()) {
        await reallocation.reallocate();
    }
}
