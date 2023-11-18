import {CONSTANTS, PushAPI} from "@pushprotocol/restapi";
import {ethers} from "ethers";


export class NotificationSender {
    constructor() {
        this.chainId = process.env.CHANNEL_CHAIN_ID;
        this.privateKey = process.env.CHANNEL_OWNER_PRIVATE_KEY;
        this.providerUrl = process.env.PROVIDER_URL;
        this.channelAddress = process.env.CHANNEL_ADDRESS;

        this.signer = new ethers.Wallet(this.privateKey);
        this.PushSigner = null;
    }

    async initialize() {
        this.PushSigner = await PushAPI.initialize(this.signer, { env: CONSTANTS.ENV.STAGING });

        this.PushSigner.provider = new ethers.providers.JsonRpcProvider(this.providerUrl);

        await this.PushSigner.notification.subscribe(
            `eip155:${this.chainId}:${this.channelAddress}`,
        );
    }

    async sendNotification(listOfRecipients, title, body) {
        try {
            const response = await this.PushSigner.channel.send(
                listOfRecipients, {
                    notification: {
                        title,
                        body,
                    },
                });

            console.log("Notification sent:", response);
        } catch (error) {
            console.error("Error sending notification:", error);
        }
    }
}
