import {CONSTANTS, PushAPI} from "@pushprotocol/restapi";
import {ethers} from "ethers";
import dotenv from "dotenv";

dotenv.config();

class NotificationSender {
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
            const response = await this.PushSigner.channel.send(listOfRecipients, {
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

// Example usage:
// const notificationSender = new NotificationSender();
//
// notificationSender.initialize().then(() => {
//     const recipients = ["0xe5F74aE42cdd911BaD6cDB2b35b857F1E82b313C"];
//     notificationSender.sendNotification(recipients, "Title", "Body").then(
//         r => console.log(r)
//     );
// });
