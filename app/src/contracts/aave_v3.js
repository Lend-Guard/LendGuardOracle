import { ethers } from 'ethers';
import {AAVE_V3_CONTRACT_ABI, AAVE_V3_CONTRACT_ADDRESS} from "./consts.js";

export class AaveV3Contract {
    contractAddress = AAVE_V3_CONTRACT_ADDRESS

    constructor(provider) {
        this.contract = new ethers.Contract(this.contractAddress, AAVE_V3_CONTRACT_ABI, provider);
    }

    async getReservesList() {
        return await this.contract.getReservesList();
    }
}
