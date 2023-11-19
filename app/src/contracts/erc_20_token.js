import {ethers} from 'ethers';
import {ERC20_TOKEN_ABI} from "./consts.js";


export class ERC20Token {
    constructor(tokenAddress, provider) {
        this.contract = new ethers.Contract(tokenAddress, ERC20_TOKEN_ABI, provider);
    }

    async allowance(ownerAddress, spenderAddress) {
        try {
            return await this.contract.allowance(ownerAddress, spenderAddress)
        } catch (error) {
            console.error('Error fetching allowance:', error);
            throw error;
        }
    }
}
