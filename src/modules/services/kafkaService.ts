import { kafkaSubscribe } from '../../plugins/kafka/consumer'
import { createTopic, publish } from '../../plugins/kafka/producer';

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

    publishToTopic = (param) => new Promise((resolve, reject) => {
        const { topic, messages } = param;
  
        publish( this.server, topic, messages )
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