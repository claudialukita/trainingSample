"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
const kafkaService_1 = require("./modules/services/kafkaService");
const jobKafka_1 = require("./modules/services/jobKafka");
server_1.createServer()
    .then((server) => {
    server.log.info('Server started.');
    server.redis.set('test', 'Connected', "EX", server.conf.expireToken, (err, val) => {
        if (err) {
            server.log.info('Failed to establish Redis Connection.');
            server.log.error(JSON.stringify(err));
        }
        else {
            server.log.info('Redis Connection has been established successfully.');
        }
    });
    server.kafkaClient.on('ready', () => {
        server.log.info('Kafka Client Connection has been established successfully.');
        // running kafka monitor
        const kafkaService = new kafkaService_1.KafkaService(server);
        kafkaService.subscribeTopicSaveDb();
    });
    server.kafkaClient.on('error', (err) => {
        server.log.info('Server not connected to Kafka');
    });
    const apmServerStatus = server.apm.isStarted();
    if (apmServerStatus) {
        server.log.info('Server connected to APM Server');
    }
    else {
        server.log.info('Server not connected to APM Server');
    }
    //db scheduler
    // const jobDB = new JobUser(server.db);
    // server.scheduler.addSimpleIntervalJob(jobDB.jobInsertSong);
    //kafka scheduler
    const jobKafka = new jobKafka_1.JobKafka(server);
    server.scheduler.addSimpleIntervalJob(jobKafka.jobPublishMsgToKafka);
}).catch(error => {
    // do something
    console.log(error);
});
//# sourceMappingURL=index.js.map