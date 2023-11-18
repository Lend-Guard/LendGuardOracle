const { createClient } = require('ioredis');

class RedisService {
    WAS_PUSH_ALERT_PREFIX = "WAS_PUSH_ALERT_";

    constructor(host, port, password = null) {
        this.port = port;
        this.host = host;
        this.password = password;
    }

    get redis() {
        return createClient({
            host: this.host,
            port: this.port,
            password: this.password,
            encoding: 'utf-8',
            enableOfflineQueue: false,
        });
    }

    setWasPushAlertStatus(walletAddress, wasCallStatus = 1) {
        const key = `${this.WAS_PUSH_ALERT_PREFIX}${walletAddress}`;
        this.redis.setex(key, appSettings.pushAlertBreakIntervalInSec, wasCallStatus);
    }

    async getWasPushAlertStatus(walletAddress) {
        const key = `${this.WAS_PUSH_ALERT_PREFIX}${walletAddress}`;
        const wasCallStatus = await this.redis.get(key);

        return Boolean(wasCallStatus && parseInt(wasCallStatus));
    }
}

// Example usage
// const appSettings = {
//     pushAlertBreakIntervalInSec: 5 * 60,
// };
//
// const redisService = new RedisService(
//     'your_redis_host',
//     1234,
//     'your_redis_password'
// );
//
// redisService.setWasPushAlertStatus(1);
// redisService.getWasPushAlertStatus().then(result => console.log('Was call status:', result));
