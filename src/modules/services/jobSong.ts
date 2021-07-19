import fp from 'fastify-plugin';
import { SimpleIntervalJob, AsyncTask, Task } from 'toad-scheduler'

import { SongsService } from './songsService';

// import { JobTO, JobMonitoringTO } from './schema';
// import { getTodayDateAsString } from '../../../utils/DateUtils';

let counter = 0;

export class JobUser {
   db: any;
   constructor(db){
      this.db = db;
   }

    // must use promise
    taskDummy1 = new AsyncTask('jobDummyInsertSong', () => new Promise((resolve, reject) => {
        console.log(`----------------Start Job----------------`);
        try {
           const songsService = new SongsService(this.db);
            console.log('JobRunning1');
            counter++

            const dataInputSong = {
               singer: `${counter} mock singer`,
               song: `${counter} mock song`,
               user: `${counter} mock user`
             };

             songsService.insert(dataInputSong).then(result => {
                resolve( );
             }).catch(err => {
                reject(err);
             })

            resolve();
        } catch (error) {
            console.error('JobRunning1 - error');
            reject();
        } finally {
            console.log(`----------------End of Job----------------`);
        }
    }), err => {
        console.log('JobRunning1 - error', err);
    });
    jobInsertSong = new SimpleIntervalJob({ seconds: 15, runImmediately: true}, this.taskDummy1, 'jobDummyInsertSong')
   //  server.scheduler.addSimpleIntervalJob(job1);

   //  const taskDummy2 = new AsyncTask('jobDummyId2', () => new Promise((resolve, reject) => {
   //      console.log(`----------------Start Job ${getTodayDateAsString()}----------------`);
   //      try {
   //          console.log('JobRunning2');
   //          counter++
   //          resolve();
   //      } catch (error) {
   //          console.log('JobRunning2 - error');
   //          reject();
   //      } finally {
   //          console.log(`----------------End of Job ${getTodayDateAsString()}----------------`);
   //      }
   //  }), err => {
   //      console.log('JobRunning2 - error', err);
   //  });
   //  const job2 = new SimpleIntervalJob({ hours: 5, }, taskDummy2, 'jobDummyId2')
   //  server.scheduler.addSimpleIntervalJob(job2);

   //  const task = new Task('SyncTaskDummy', () => {

   //      console.log(`----------------Start Job SyncTaskDummy ${getTodayDateAsString()}----------------`);
   //      try {
   //          console.log('SyncTaskDummy');
   //          counter++
   //      } catch (error) {
   //          console.log('SyncTaskDummy - error');
   //      } finally {
   //          console.log(`----------------End of Job SyncTaskDummy ${getTodayDateAsString()}----------------`);
   //      }
   //  }, err => {
   //      console.log('SyncTaskDummy - error', err);
   //  })
   //  const job = new SimpleIntervalJob({ minutes: 10, }, task, 'SyncTaskDummy')
   //  server.scheduler.addSimpleIntervalJob(job);



    // job monitoring
    // server.post('/job/getById', { schema: JobTO }, async (request, reply) => {
    //     const payload = request.body;
    //     const result = server.scheduler.getById(payload.jobId);
    //     reply.send(result)
    // });

    // server.post('/job/stopById', { schema: JobTO }, async (request, reply) => {
    //     const payload = request.body;
    //     const result = server.scheduler.stopById(payload.jobId);
    //     reply.send(result)
    // });

    // server.post('/job/startById', { schema: JobTO }, async (request, reply) => {
    //     const payload = request.body;
    //     const result = server.scheduler.startById(payload.jobId);
    //     reply.send(result)
    // });

    // server.post('/job/stopAllJobs', { schema: JobMonitoringTO }, async (request, reply) => {
    //     server.scheduler.stop();
    //     reply.send("Sucessfully stop all jobs.")
    // });

    // server.post('/job/getStatus', { schema: JobMonitoringTO }, async (request, reply) => {
    //     const result = server.scheduler.getStatus();
    //     reply.send(result)
    // });
}