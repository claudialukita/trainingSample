"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SongsService = void 0;
const songs_1 = require("../../plugins/db/models/songs");
class SongsService {
    constructor(db) {
        this.insert = (param) => new Promise((resolve, reject) => {
            const { singer, song, user } = param;
            this.songsModel.create({ singer, song, createdBy: user })
                .then(data => {
                resolve(data.song);
            }).catch(err => {
                reject(err);
            });
        });
        this.update = (param) => new Promise((resolve, reject) => {
            const { singer, song, user } = param;
            this.songsModel.update({ singer, LastUpdatedBy: user }, {
                where: {
                    song: song
                }
            }).then(data => {
                resolve(data.song);
            }).catch(err => {
                reject(err);
            });
        });
        this.destroy = (param) => new Promise((resolve, reject) => {
            const { song } = param;
            this.songsModel.destroy({
                where: {
                    song: song
                }
            }).then(data => {
                resolve(data.song);
            }).catch(err => {
                reject(err);
            });
        });
        this.specificSelect = (param) => new Promise((resolve, reject) => {
            const { singer, song, user } = param;
            this.songsModel.findOne({
                where: {
                    song: song
                }
            }).then(data => {
                if (data !== null) {
                    resolve('Song already in DB');
                }
                else {
                    resolve(true);
                    this.insert({ singer, song, user });
                }
            }).catch(err => {
                reject(err);
            });
        });
        this.db = db;
        this.songsModel = songs_1.SongsFactory(this.db);
    }
}
exports.SongsService = SongsService;
//# sourceMappingURL=songsService.js.map