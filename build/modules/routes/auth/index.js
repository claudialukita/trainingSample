"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
const authService_1 = require("../../services/authService");
const schema_1 = require("./schema");
exports.default = fastify_plugin_1.default((server, opts, next) => {
    server.post("/auth/login", { schema: schema_1.LoginTO }, (request, reply) => {
        try {
            const { username, password } = request.body;
            if (username && password) {
                authService_1.login(request.body, server)
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
                });
            }
            else {
                server.apm.captureError({
                    method: request.routerMethod,
                    path: request.routerPath,
                    param: request.body,
                    error: 'Authentication failed! Please check the request',
                });
                return reply.code(400).send({
                    success: false,
                    message: 'Authentication failed! Please check the request'
                });
            }
        }
        catch (error) {
            server.apm.captureError({
                method: request.routerMethod,
                path: request.routerPath,
                param: request.body,
                error,
            });
            request.log.error(error);
            return reply.send(400);
        }
    });
    next();
});
//# sourceMappingURL=index.js.map