"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServer = void 0;
const fastify_1 = require("fastify");
const fastify_blipp_1 = __importDefault(require("fastify-blipp"));
const fastify_swagger_1 = __importDefault(require("fastify-swagger"));
const fastify_autoload_1 = __importDefault(require("fastify-autoload"));
const fastify_jwt_1 = __importDefault(require("fastify-jwt"));
const elastic_apm_node_1 = __importDefault(require("elastic-apm-node"));
const fastify_schedule_1 = __importDefault(require("fastify-schedule"));
const path = __importStar(require("path"));
const dotenv = __importStar(require("dotenv"));
// import { swagger } from "./config/index";
const db_1 = __importDefault(require("./plugins/db"));
const kafka_1 = __importDefault(require("./plugins/kafka"));
const redis_1 = __importDefault(require("./plugins/redis"));
const auth_1 = __importDefault(require("./plugins/auth"));
dotenv.config({
    path: path.resolve('.env'),
});
const port = process.env.PORT;
const apmUrl = process.env.APM_URL;
const dbDialect = process.env.DB_DIALECT;
const db = process.env.DB;
const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;
const dbUsername = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;
const kafkaHost = process.env.KAFKA_HOST;
const redisPort = process.env.REDIS_PORT;
const redistHost = process.env.REDIS_HOST;
const expireToken = process.env.EXPIRE_TOKEN;
const secretKey = process.env.SECRET;
var apm = elastic_apm_node_1.default.start({
    serviceName: 'apm-server-try',
    serverUrl: apmUrl,
    environment: 'development'
});
const createServer = () => new Promise((resolve, reject) => {
    const server = fastify_1.fastify({
        ignoreTrailingSlash: true,
        logger: {
            prettyPrint: true,
            level: "info",
        },
        bodyLimit: 15000 * 1024,
        pluginTimeout: 12000
    });
    server.register(fastify_blipp_1.default);
    server.register(fastify_swagger_1.default, {
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
    server.register(fastify_jwt_1.default, { secret: secretKey });
    server.register(fastify_schedule_1.default);
    server.register(fastify_autoload_1.default, {
        dir: path.join(__dirname, 'modules/routes')
    });
    server.get('/', (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        return {
            hello: 'world'
        };
    }));
    server.decorate('apm', apm);
    server.decorate('conf', { port, dbDialect, db, dbHost, dbPort, dbUsername, dbPassword, kafkaHost, redisPort, redistHost, expireToken });
    server.register(db_1.default);
    server.register(kafka_1.default);
    server.register(redis_1.default);
    server.register(auth_1.default);
    server.addHook('onRequest', (request, reply, error) => __awaiter(void 0, void 0, void 0, function* () {
        apm.setTransactionName(request.method + ' ' + request.url);
    }));
    // global hook error handling for unhandled error
    server.addHook('onError', (request, reply, error) => __awaiter(void 0, void 0, void 0, function* () {
        const { message, stack } = error;
        let err = {
            method: request.routerMethod,
            path: request.routerPath,
            param: request.body,
            message,
            stack
        };
        apm.captureError(JSON.stringify(err));
    }));
    const start = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield server.listen(port);
            server.blipp();
            server.log.info(`server listening on ${JSON.stringify(server.server.address())}`);
            resolve(server);
        }
        catch (err) {
            server.log.error(err);
            reject(err);
            process.exit(1);
        }
    });
    start();
});
exports.createServer = createServer;
//# sourceMappingURL=server.js.map