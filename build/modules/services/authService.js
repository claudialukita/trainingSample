"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const redisService_1 = require("./redisService");
const login = (param, server) => new Promise((resolve, reject) => {
    const { username, password } = param;
    const errPass = validatePassword(password);
    if (errPass) {
        reject(errPass);
    }
    server.jwt.sign({ username }, (error, encoded) => {
        if (error) {
            reject(error);
        }
        else {
            redisService_1.setLoginRedis({ username, token: encoded }, server).then(res => {
                resolve(encoded);
            }).catch(errRedis => {
                reject(errRedis);
            });
        }
    });
});
exports.login = login;
const validatePassword = (password) => {
    let msg = '';
    if (password == '') {
        msg += 'Password tidak boleh kosong';
    }
    return msg;
};
//# sourceMappingURL=authService.js.map