import { kafkaSubscribe } from '../../plugins/kafka/consumer'
import { createTopic, publish } from '../../plugins/kafka/producer';
import { SongsService } from './songsService';

export class KafkaService {
    server: any;

    constructor(serverInstance) {
        this.server = serverInstance;
    }

    subscribeTopicSongs = async () => {
        kafkaSubscribe(this.server, 'songsTopic', (messages) => {
            this.server.log.info(messages);
        });
    };

    subscribeTopicSaveDb = async () => {
        kafkaSubscribe(this.server, 'songsTopic', (messages) => {
            // this.server.log.info(messages);
            const myobj = JSON.parse(messages.value.toString());
            const songsService = new SongsService(this.server.db);
            songsService.specificSelect(myobj);
        
        });
    };
    

    publishToTopic = (param) => new Promise((resolve, reject) => {
        const { topic, messages } = param;
  
        publish( this.server, topic, messages )
           .then(data => {
              resolve({topic, messages});
           }).catch(err => {
              reject(err);
           });
     });

     publishJSONToTopic = (param) => new Promise((resolve, reject) => {
        const { topic, messages } = param;
        const strMsg = JSON.stringify(messages);
        publish( this.server, topic, strMsg )
           .then(data => {
              resolve({topic, messages});
           }).catch(err => {
              reject(err);
           });
     });

     creatingTopic = (param) => new Promise((resolve, reject) => {
        const { topics } = param;
  
        createTopic( this.server.kafkaClient, topics)
           .then(data => {
              resolve(data);
           }).catch(err => {
              reject(err);
           });
     });

}