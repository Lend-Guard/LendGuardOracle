import {NotificationSender} from "../push_network/notifications.js";

export async function performAlerts(userAddress, title, body) {
    const notificationSender = new NotificationSender();

    notificationSender.initialize().then(() => {
        const recipients = [userAddress];
        notificationSender.sendNotification(recipients, title, body)
    });
}
