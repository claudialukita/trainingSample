import { fastify } from 'fastify';
import fastifyBlipp from "fastify-blipp";
import fastifySwagger from "fastify-swagger";
import AutoLoad from "fastify-autoload";
import fastifyJwt from "fastify-jwt";
import apmServer from 'elastic-apm-node';
import fastifyShedule from 'fastify-schedule';

import * as path from "path";
import * as dotenv from 'dotenv';

// import { swagger } from "./config/index";
import dbPlugin from "./plugins/db";
import kafkaPlugin from "./plugins/kafka";
import redisPlugin from "./plugins/redis";
import authPlugin from "./plugins/auth";

dotenv.config({
   path: path.resolve('.env'),
});

const isDocker: any = process.env.IS_DOCKER
const port: any = process.env.PORT;

const apmUrl: string = process.env.APM_URL;
const dbDialect: string = process.env.DB_DIALECT;
const db: string = process.env.DB;
const dbHost: string = process.env.DB_HOST;
const dbPort: any = process.env.DB_PORT;
const dbUsername: string = process.env.DB_USERNAME;
const dbPassword: string = process.env.DB_PASSWORD;
const kafkaHost: string = process.env.KAFKA_HOST;
const redisPort: any = process.env.REDIS_PORT;
const redistHost: string = process.env.REDIS_HOST;
const expireToken: string = process.env.EXPIRE_TOKEN;
const secretKey: string = process.env.SECRET

var apm = apmServer.start({
   serviceName: 'apm-server-try',

   serverUrl: apmUrl,
   environment: 'development'
});
export const createServer = () => new Promise((resolve, reject) => {

   const server = fastify({
      ignoreTrailingSlash: true,
      logger:{
         prettyPrint: true,
         level: "info",
      },
      bodyLimit: 15000 * 1024,
      pluginTimeout: 12000
   });

   server.register(fastifyBlipp);
   server.register(fastifySwagger, {
      routePrefix: '/api',
      swagger: {
         info: {
            title: 'API Documentation',
            description: 'API Documentation',
            version: '0.1.0'
         },
         securityDefinitions: {
            APIKeyHeader: {
               type: 'apiKey',
               name: 'Authorization',
               description: "Value: Bearer <Token>",
               in: "header"
            }
         },
         schemes: ['http', 'https'],
         consumes: ['application/json'],
         produces: ['application/json'],
         security: [
            {
               APIKeyHeader: []
            },
         ]
      },
      hideUntagged: true,
      exposeRoute: true
   });

   server.register(fastifyJwt, { secret: secretKey });

   server.register(fastifyShedule);
   
   server.register(AutoLoad, {
      dir: path.join(__dirname, 'modules/routes')
   });

   server.get('/', async (request, reply) => {
      return {
          hello: 'world'
      };
  });

   server.decorate('apm', apm);

   server.decorate('conf', { port, dbDialect, db, dbHost, dbPort, dbUsername, dbPassword, kafkaHost, redisPort, redistHost, expireToken});

   server.register(dbPlugin);
   server.register(kafkaPlugin);
   server.register(redisPlugin);
   server.register(authPlugin);


   server.addHook('onRequest', async (request, reply, error) => {
      apm.setTransactionName(request.method + ' ' + request.url);
  });

  // global hook error handling for unhandled error
  server.addHook('onError', async (request, reply, error) => {
      const { message, stack } = error;
      let err = {

          method: request.routerMethod,
          path: request.routerPath,
          param: request.body,
          message,
          stack
      };

      apm.captureError(JSON.stringify(err));
  });

   const start = async () => {
      try{
         if(isDocker){
            await server.listen(port, '0.0.0.0');
            server.log.info('server running on docker');
         } else {
            await server.listen(port)
         }
         server.blipp();
         server.log.info(`server listening on ${JSON.stringify(server.server.address())}`);
         resolve(server);
      } catch (err) {
         server.log.error(err);
         reject(err);
         process.exit(1);
      }
   };
   start();
})