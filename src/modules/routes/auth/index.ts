import fp from 'fastify-plugin'


import { login } from '../../services/authService'
import { LoginTO, VerifyTokenTO } from './schema';

export default fp((server, opts, next) => {

    server.post("/auth/login", { schema: LoginTO }, (request, reply) => {
        try {
            const { username, password } = request.body;

            if (username && password) {

                login(request.body, server)
                    .then(token => {
                        return reply.code(200).send({
                            success: true,
                            message: 'Authentication successful!',
                            token,
                        });
                    })
                    .catch(error => {
                        return reply.code(400).send({
                            success: false,
                            message: 'Authentication failed! Failed to create token.',
                            error
                        });
                    })
            } else {
                server.apm.captureError({
                    method: request.routerMethod,
                    path: request.routerPath,
                    param: request.body,
                    error: 'Authentication failed! Please check the request',
                })

                return reply.code(400).send({
                    success: false,
                    message: 'Authentication failed! Please check the request'
                });
            }

        } catch (error) {
            server.apm.captureError({
                method: request.routerMethod,
                path: request.routerPath,
                param: request.body,
                error,
            })

            request.log.error(error);
            return reply.send(400);
        }
    });

    next();
});