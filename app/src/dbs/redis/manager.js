import Redis from 'ioredis'

const redisSettings = {
    pushAlertBreakIntervalInSec: 5 * 60,
    reallocationBreakIntervalInSec: 60 * 60,
};

export class RedisService {
    WAS_PUSH_ALERT_PREFIX = "WAS_PUSH_ALERT_";
    WAS_REALLOCATION_PREFIX = "WAS_REALLOCATION_";

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

    async setWasPushAlert(walletAddress, wasAlert = 1) {
        const key = `${this.WAS_PUSH_ALERT_PREFIX}${walletAddress}`;
        await this.redis.setex(
            key,
            redisSettings.pushAlertBreakIntervalInSec,
            wasAlert
        )
    }

    async getWasPushAlert(walletAddress) {
        const key = `${this.WAS_PUSH_ALERT_PREFIX}${walletAddress}`;
        const wasAlert = await this.redis.get(key);

        return Boolean(wasAlert && parseInt(wasAlert));
    }

    async setWasReallocation(walletAddress, wasReallocation = 1) {
        const key = `${this.WAS_REALLOCATION_PREFIX}${walletAddress}`;
        await this.redis.setex(
            key,
            redisSettings.reallocationBreakIntervalInSec,
            wasReallocation
        )
    }

    async getWasReallocation(walletAddress) {
        const key = `${this.WAS_REALLOCATION_PREFIX}${walletAddress}`;
        const wasReallocation = await this.redis.get(key);

        return Boolean(wasReallocation && parseInt(wasReallocation));
    }
}
