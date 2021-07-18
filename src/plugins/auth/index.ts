import fp from 'fastify-plugin'
import { getLoginRedis } from '../../modules/services/redisService';

const authPlugin = (server, opts, next) => {

  server.decorateRequest('decoded', null);

  server.addHook('preHandler', async (request, reply) => {
    try {
      if (request.routerPath) {
        if (!request.routerPath.includes('api')  && !request.routerPath.includes('login')) {
          const authHeader = request.headers.authorization;
          const token = authHeader.split(' ')[1];
          

          server.jwt.verify(token, (err, decodedJwt) => {
            if (err) {
              server.apm.captureError({
                method: request.routerMethod,
                path: request.routerPath,
                param: request.body,
                error: err,
              })

              server.log.error(err)
            } else {
              getLoginRedis({username: decodedJwt.username, token: authHeader}, server).then(reply => {
                console.log(reply);
              })
              .catch(error => {
                return reply.code(400).send({
                    success: false,
                    message: 'Authentication failed! Wrong token.',
                });
              })
            }
          })
        }
      }
    } catch (err) {
      // server.apm.captureError({
      //   method: request.routerMethod,
      //   path: request.routerPath,
      //   param: request.body,
      //   error: err,
      // })
      throw new Error('Failed to validate token');
    }
  });

  next();
};

export default fp(authPlugin);