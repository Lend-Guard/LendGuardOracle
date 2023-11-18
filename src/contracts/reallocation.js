const { Web3 } = require('web3');


class Reallocation {
    NODE_URL = '';

    constructor() {
        this.web3 = new Web3(this.NODE_URL);
    }

    async shouldReallocate() {
        try {
            return Math.random() < 0.5;
        } catch (error) {
            console.error('Error fetching ...:', error);
        }
    }

    async reallocate() {
        try {
            console.log("reallocate")
        } catch (error) {
            console.error('Error fetching ...:', error);
        }
    }
}

module.exports = { Reallocation };