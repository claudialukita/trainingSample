"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const users_1 = require("../../plugins/db/models/users");
class UserService {
    constructor(db) {
        this.insert = (param) => new Promise((resolve, reject) => {
            // const userDb = UserFactory(this.db);
            const { username, password, email, address } = param;
            this.userModel.create({ username, password, email, address, createdBy: 'test' })
                .then(data => {
                resolve(data.username);
            }).catch(err => {
                reject(err);
            });
        });
        this.db = db;
        this.userModel = users_1.SongUsersFactory(this.db);
    }
}
exports.UserService = UserService;
//# sourceMappingURL=userService.js.map