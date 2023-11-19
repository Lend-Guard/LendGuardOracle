import {ethers} from "ethers";
import {AaveV3Contract} from "../contracts/aave_v3.js";
import {ERC20Token} from "../contracts/erc_20_token.js";


async function getAaveV3TokensList() {

    const provider = new ethers.providers.JsonRpcProvider(
        process.env.PROVIDER_URL
    );
    const aaveContract = new AaveV3Contract(provider);

    return await aaveContract.getReservesList()

}

export async function performReallocation(vaultContract, userAddress, vaultAddress) {
    const aaveV3TokensList = await getAaveV3TokensList()


    if (aaveV3TokensList) {
        const provider = new ethers.providers.JsonRpcProvider(
            process.env.PROVIDER_URL
        );

        let tokenAddresses = [];
        let tokenAmounts = [];

        for (let i = 0; i < aaveV3TokensList.length; i++) {
            const tokenAddress = aaveV3TokensList[i];
            const erc20Token = new ERC20Token(tokenAddress, provider);
            const allowance = await erc20Token.allowance(userAddress, vaultAddress)
            if (allowance > 0) {
                tokenAddresses.push(tokenAddress)
                tokenAmounts.push(allowance)
            }
        }
        if (tokenAddresses && tokenAmounts) {
            await vaultContract.rebalance(tokenAddresses, tokenAmounts);
        }
    }

}
