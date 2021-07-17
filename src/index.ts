import { FastifyInstance } from "fastify";
import { createServer } from './server';
import { KafkaService} from './modules/services/kafkaService';

  
createServer()
.then((server: any) => {
    server.log.info('Server started.');

    server.kafkaClient.on('ready', () => {
        server.log.info('Kafka Client Connection has been established successfully.');

        // running kafka monitor
      //   const kafkaService = new KafkaService(server);
      //   kafkaService.subscribeTopicSongs();
    });

    server.kafkaClient.on('error', (err) => {
        server.log.info('Server not connected to Kafka');
    });

   //  const apmServerStatus = server.apm.isStarted();
   //  if (apmServerStatus) {
   //      server.log.info('Server connected to APM Server');
   //  } else {
   //      server.log.info('Server not connected to APM Server');
   //  }

   //  const job = new JobUser(server.db);
   //  server.scheduler.addSimpleIntervalJob(job.jobInsertUser);

}).catch(error => {
    // do something
    console.log(error);
});