import { SimpleIntervalJob, AsyncTask, Task } from 'toad-scheduler'
import { KafkaService } from './kafkaService';

let counter = 0;

export class JobKafka{
   server: any;
   
   constructor(server){
      this.server = server;
   }

   taskPublishMsg = new AsyncTask('jobPublishMsg', () => new Promise((resolve, reject) => {
      console.log(`----------------Start Job----------------`);
      try {
         const kafkaService = new KafkaService(this.server);
          console.log('JobRunning1');
          counter++

           const dataPublishMsg = {
            topic: "songsTopic",
            messages: {
              singer: `sch singer ${counter}`,
              song: `sch song ${counter}`,
              user: `sch user ${counter}`
            }
          };

           kafkaService.publishJSONToTopic(dataPublishMsg).then(result => {
              resolve( );
           }).catch(err => {
              reject(err);
           })

          resolve();
      } catch (error) {
         this.server.apm.captureError({
            error,
        })
          console.error('JobRunning1 - error');
          reject();
      } finally {
          console.log(`----------------End of Job----------------`);
      }
  }), err => {
      console.log('JobRunning1 - error', err);
  });

   jobPublishMsgToKafka = new SimpleIntervalJob({ seconds: 15, runImmediately: true}, this.taskPublishMsg, 'jobPublishMsg')
   
}