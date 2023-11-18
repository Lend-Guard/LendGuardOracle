import Web3 from 'web3';


export class Reallocation {
    constructor() {
        this.web3 = new Web3(process.env.PROVIDER_URL);
    }

    async isNotificationRequired() {
        try {
            return Math.random() < 0.5;
        } catch (error) {
            console.error('Error fetching ...:', error);
        }
    }

    async isReallocationRequired() {
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
