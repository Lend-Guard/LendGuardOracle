import Redis from 'ioredis'

const redisSettings = {
    pushAlertBreakIntervalInSec: 5 * 60,
};

export class RedisService {
    WAS_PUSH_ALERT_PREFIX = "WAS_PUSH_ALERT_";

    constructor(host, port, password = null) {
        this.port = port;
        this.host = host;
        this.password = password;
    }

    get redis() {
        return Redis.createClient({
            host: this.host,
            port: this.port,
            password: this.password,
            encoding: 'utf-8',
            enableOfflineQueue: false,
        });
    }

    async setWasPushAlertStatus(walletAddress, wasCallStatus = 1) {
        const key = `${this.WAS_PUSH_ALERT_PREFIX}${walletAddress}`;
        await this.redis.setex(
            key,
            redisSettings.pushAlertBreakIntervalInSec,
            wasCallStatus
        )
    }

    async getWasPushAlertStatus(walletAddress) {
        const key = `${this.WAS_PUSH_ALERT_PREFIX}${walletAddress}`;
        const wasCallStatus = await this.redis.get(key);

        return Boolean(wasCallStatus && parseInt(wasCallStatus));
    }
}