import { ethers } from 'ethers';
import {LEND_GUARD_CONTRACT_ABI} from "./consts.js";


export class LendGuardContract {
  abi = LEND_GUARD_CONTRACT_ABI

  constructor(contractAddress, provider) {
    this.contractAddress = contractAddress;
    this.contract = new ethers.Contract(contractAddress, this.abi, provider);
  }

  get NOTIFICATION_THRESHOLD() {
    return this.contract.NOTIFICATION_THRESHOLD();
  }

  get POOL_ADDRESS() {
    return this.contract.POOL_ADDRESS();
  }

  get REBALANCE_THRESHOLD() {
    return this.contract.REBALANCE_THRESHOLD();
  }

  get TARGET_HEALTH_FACTOR() {
    return this.contract.TARGET_HEALTH_FACTOR();
  }

  async borrow(asset, amount, interestRateMode, referralCode, onBehalfOf) {
    return this.contract.borrow(asset, amount, interestRateMode, referralCode, onBehalfOf);
  }

  async deposit(asset, amount, referralCode) {
    return this.contract.deposit(asset, amount, referralCode);
  }

  async getUserHealtFactor(user) {
    return this.contract.getUserHealtFactor(user);
  }

  async getVaultAccountData() {
    return this.contract.getVaultAccountData();
  }

  async getVaultHealthFactor() {
    return this.contract.getVaultHealthFactor();
  }

  get owner() {
    return this.contract.owner();
  }

  get pool() {
    return this.contract.pool();
  }

  async rebalance(tokens, amounts) {
    return this.contract.rebalance(tokens, amounts);
  }

  async repay(asset, amount, interestRateMode, onBehalfOf) {
    return this.contract.repay(asset, amount, interestRateMode, onBehalfOf);
  }

  async requireNotification() {
    return this.contract.requireNotification();
  }

  async requireRebalance() {
    return this.contract.requireRebalance();
  }

  async setKeeper(keeper) {
    return this.contract.setKeeper(keeper);
  }

  async withdraw(asset, amount, to) {
    return this.contract.withdraw(asset, amount, to);
  }
}
