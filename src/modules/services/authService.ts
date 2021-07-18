import { setLoginRedis } from './redisService'

export const login = (param, server) => new Promise((resolve, reject) => {

    const { username, password } = param;

    const errPass = validatePassword(password);
    if (errPass) {
        reject(errPass);
    }

    server.jwt.sign({ username }, (error, encoded) => {
        if (error) {
            reject(error)
        } else {

            setLoginRedis({ username, token: encoded }, server).then(res => {
                resolve(encoded);
            }).catch(errRedis => {
                reject(errRedis);
            })
        }
    });
});

const validatePassword = (password) => {
    let msg = '';

    if (password == '') {
        msg += 'Password tidak boleh kosong';
    }

    return msg;
}