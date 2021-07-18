"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisOperation = exports.getListLoginRedis = exports.getLoginRedis = exports.setLoginRedis = void 0;
const setLoginRedis = (param, server) => new Promise((resolve, reject) => {
    const { username, token } = param;
    const bearerToken = "Bearer " + token;
    // key login token
    server.redis.set(username, bearerToken, "EX", server.conf.expireToken, (err, val) => {
        if (err) {
            reject(err);
        }
        else {
            resolve(token);
        }
    });
});
exports.setLoginRedis = setLoginRedis;
const getLoginRedis = (param, server) => new Promise((resolve, reject) => {
    const { username, token } = param;
    //get string
    server.redis.get(username, function (err, reply) {
        if (reply === token) {
            resolve(reply);
        }
        else {
            reject(err);
        }
    });
});
exports.getLoginRedis = getLoginRedis;
const getListLoginRedis = (param, server) => new Promise((resolve, reject) => {
    const { username, token } = param;
    //get list
    server.redis.lrange(username, 0, -1, function (err, reply) {
        console.log(reply);
    });
});
exports.getListLoginRedis = getListLoginRedis;
class RedisOperation {
    constructor(serverInstance) {
        this.setValueToList = (key, value) => new Promise((resolve, reject) => {
            // key login token
            this.redis.sadd(key, value, (err, val) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(val);
                }
            });
        });
        this.redis = serverInstance.redis;
        this.conf = serverInstance.conf;
    }
}
exports.RedisOperation = RedisOperation;
//# sourceMappingURL=redisService.js.map