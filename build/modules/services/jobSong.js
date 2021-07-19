"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobUser = void 0;
const toad_scheduler_1 = require("toad-scheduler");
const songsService_1 = require("./songsService");
// import { JobTO, JobMonitoringTO } from './schema';
// import { getTodayDateAsString } from '../../../utils/DateUtils';
let counter = 0;
class JobUser {
    constructor(db) {
        // must use promise
        this.taskDummy1 = new toad_scheduler_1.AsyncTask('jobDummyInsertSong', () => new Promise((resolve, reject) => {
            console.log(`----------------Start Job----------------`);
            try {
                const songsService = new songsService_1.SongsService(this.db);
                console.log('JobRunning1');
                counter++;
                const dataInputSong = {
                    singer: `${counter} mock singer`,
                    song: `${counter} mock song`,
                    user: `${counter} mock user`
                };
                songsService.insert(dataInputSong).then(result => {
                    resolve();
                }).catch(err => {
                    reject(err);
                });
                resolve();
            }
            catch (error) {
                console.error('JobRunning1 - error');
                reject();
            }
            finally {
                console.log(`----------------End of Job----------------`);
            }
        }), err => {
            console.log('JobRunning1 - error', err);
        });
        this.jobInsertSong = new toad_scheduler_1.SimpleIntervalJob({ seconds: 15, runImmediately: true }, this.taskDummy1, 'jobDummyInsertSong');
        this.db = db;
    }
}
exports.JobUser = JobUser;
//# sourceMappingURL=jobSong.js.map