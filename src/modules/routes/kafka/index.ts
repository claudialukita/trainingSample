import fp from 'fastify-plugin';


import { PublishKafkaTO, PublishJSONKafkaTO, SubscribeKafkaTO, TopicKafkaTO } from './schema';
import { kafkaSubscribe } from '../../../plugins/kafka/consumer';
import { KafkaService } from '../../../modules/services/kafkaService';

export default fp((server, opts, next) => {

   server.post("/kafka/subscribe", { schema: SubscribeKafkaTO }, (request, reply) => {
       try {
           const { topic } = request.body;

           let count = 0;
           let data = [];

           kafkaSubscribe(server, topic, (messages) => {
               count++;
               data.push(messages);

               if (count == messages.highWaterOffset) {
                   return reply.code(200).send({
                       success: true,
                       message: 'Inquiry successful!',
                       data
                   });
               }
           });

       } catch (error) {
        //    server.apm.captureError({
        //        method: request.routerMethod,
        //        path: request.routerPath,
        //        param: request.body,
        //        error,
        //    })

           request.log.error(error);
           return reply.send(400);
       }
   });

  server.post("/kafka/publish", { schema: PublishKafkaTO }, (request, reply) => {

    const kafkaService = new KafkaService(server);

    kafkaService.publishToTopic(request.body).then((response) => {
        return reply.code(200).send({
            success: true,
            message: 'Send message successful!',
            data: response
        });
    }).catch((error) => {
      //   server.apm.captureError(JSON.stringify({
      //       method: request.routerMethod,
      //       path: request.routerPath,
      //       param: request.body,
      //       error,
      //   }))

        return reply.code(400).send({
            success: true,
            message: 'Send message failed!',
            data: [error]
        });
    });
  });

  server.post("/kafka/publish/json", { schema: PublishJSONKafkaTO }, (request, reply) => {

    const kafkaService = new KafkaService(server);

    kafkaService.publishJSONToTopic(request.body).then((response) => {
        return reply.code(200).send({
            success: true,
            message: 'Send message successful!',
            data: response
        });
    }).catch((error) => {
      //   server.apm.captureError(JSON.stringify({
      //       method: request.routerMethod,
      //       path: request.routerPath,
      //       param: request.body,
      //       error,
      //   }))

        return reply.code(400).send({
            success: true,
            message: 'Send message failed!',
            data: [error]
        });
    });
  });

  server.post("/kafka/createTopic", { schema: TopicKafkaTO }, (request, reply) => {
    
    const kafkaService = new KafkaService(server);

    kafkaService.creatingTopic(request.body).then((response) => {
        return reply.code(200).send({
            success: true,
            message: 'Create topic successful!',
            data: response
        });
    }).catch((error) => {

      //   server.apm.captureError({
      //       method: request.routerMethod,
      //       path: request.routerPath,
      //       param: request.body,
      //       error,
      //   })

        return reply.code(400).send({
            success: true,
            message: 'Create topic failed!',
            data: error
        });
    });
});
   next();
});