import {LendGuardContract} from '../contracts/lend_guard_contract.js';
import {ethers} from "ethers";
import {performAlerts} from "./notifications.js";
import {getVaultsUsers} from "./vaults.js";
import {RedisService} from "../dbs/redis/manager.js";
import {ALERT_BODY, ALERT_TITLE} from "./consts.js";
import {performReallocation} from "./reallocation.js";


export async function checkThresholdsAndDoAlertsOrAlertsAndReallocation(vaultAddress,
                                                                        userAddress,
                                                                        redisService) {
    try {
        const provider = new ethers.providers.JsonRpcProvider(
            process.env.PROVIDER_URL
        );
        const vaultContract = new LendGuardContract(vaultAddress, provider);

        const shouldTriggerAlertsValue = await vaultContract.requireNotification()
        const shouldTriggerReallocationValue = await vaultContract.requireRebalance()

        if (shouldTriggerAlertsValue) {
            const WasPushAlert = await redisService.getWasPushAlert(userAddress)

            if (!(WasPushAlert && WasPushAlert === true)) {
                await performAlerts(
                    userAddress,
                    ALERT_TITLE,
                    ALERT_BODY
                );
                await redisService.setWasPushAlert(userAddress)
            }
            await performAlerts(
                userAddress,
                ALERT_TITLE,
                ALERT_BODY
            );
        } else {
            console.log('No alerts triggered')
        }

        if (shouldTriggerReallocationValue) {
            const WasReallocation = await redisService.getWasReallocation(userAddress)

            if (!(WasReallocation && WasReallocation === true)) {
                await performReallocation(vaultContract, userAddress, vaultAddress);
                await redisService.setWasReallocation(userAddress)
            }
        } else {
            console.log('No allocation triggered')
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
}

export async function getVaultsUsersAndGuardThem(){
    const vaultsUsers = await getVaultsUsers()
        .catch((error) => {
            console.error('Error:', error.message);
        });

    const redisService = new RedisService(
        process.env.REDIS_HOST,
        process.env.REDIS_PORT,
        process.env.REDIS_PASS
    );

    if (vaultsUsers) {
        for (let i = 0; i < vaultsUsers.length; i++) {
            const vaultAddress = vaultsUsers[i][0];
            const userAddress = vaultsUsers[i][1];
            await checkThresholdsAndDoAlertsOrAlertsAndReallocation(vaultAddress, userAddress, redisService);
        }
    }
}
