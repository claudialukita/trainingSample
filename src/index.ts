import { FastifyInstance } from "fastify";
import { createServer } from './server';
import { KafkaService} from './modules/services/kafkaService';
import { JobUser } from "./modules/services/jobSong";
import { JobKafka } from "./modules/services/jobKafka";

  
createServer()
.then((server: any) => {
    server.log.info('Server started.');

    server.redis.set('test', 'Connected', "EX", server.conf.expireToken, (err, val) => {
        if (err) {
            server.log.info('Failed to establish Redis Connection.');
            server.log.error(JSON.stringify(err));
        } else {
            server.log.info('Redis Connection has been established successfully.');
        }
    });

    server.kafkaClient.on('ready', () => {
        server.log.info('Kafka Client Connection has been established successfully.');

        // running kafka monitor
        const kafkaService = new KafkaService(server);
        kafkaService.subscribeTopicSaveDb();
    });

    server.kafkaClient.on('error', (err) => {
        server.log.info('Server not connected to Kafka');
    });

    const apmServerStatus = server.apm.isStarted();
    if (apmServerStatus) {
        server.log.info('Server connected to APM Server');
    } else {
        server.log.info('Server not connected to APM Server');
    }

    //db scheduler
    // const jobDB = new JobUser(server.db);
    // server.scheduler.addSimpleIntervalJob(jobDB.jobInsertSong);

    //kafka scheduler
    const jobKafka = new JobKafka(server);
    server.scheduler.addSimpleIntervalJob(jobKafka.jobPublishMsgToKafka);

}).catch(error => {
    // do something
    console.log(error);
});