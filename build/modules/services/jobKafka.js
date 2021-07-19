"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobKafka = void 0;
const toad_scheduler_1 = require("toad-scheduler");
const kafkaService_1 = require("./kafkaService");
let counter = 0;
class JobKafka {
    constructor(server) {
        this.taskPublishMsg = new toad_scheduler_1.AsyncTask('jobPublishMsg', () => new Promise((resolve, reject) => {
            console.log(`----------------Start Job----------------`);
            try {
                const kafkaService = new kafkaService_1.KafkaService(this.server);
                console.log('JobRunning1');
                counter++;
                const dataPublishMsg = {
                    topic: "songsTopic",
                    messages: {
                        singer: `sch singer ${counter}`,
                        song: `sch song ${counter}`,
                        user: `sch user ${counter}`
                    }
                };
                kafkaService.publishJSONToTopic(dataPublishMsg).then(result => {
                    resolve();
                }).catch(err => {
                    reject(err);
                });
                resolve();
            }
            catch (error) {
                this.server.apm.captureError({
                    error,
                });
                console.error('JobRunning1 - error');
                reject();
            }
            finally {
                console.log(`----------------End of Job----------------`);
            }
        }), err => {
            console.log('JobRunning1 - error', err);
        });
        this.jobPublishMsgToKafka = new toad_scheduler_1.SimpleIntervalJob({ seconds: 15, runImmediately: true }, this.taskPublishMsg, 'jobPublishMsg');
        this.server = server;
    }
}
exports.JobKafka = JobKafka;
//# sourceMappingURL=jobKafka.js.map