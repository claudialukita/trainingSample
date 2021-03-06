"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
const schema_1 = require("./schema");
// import { SongUsersFactory, SongUsersAttributes } from '../../../plugins/db/models/users';
const songs_1 = require("../../../plugins/db/models/songs");
const songsService_1 = require("../../../modules/services/songsService");
exports.default = fastify_plugin_1.default((server, opts, next) => {
    server.post("/song/model/insert", { schema: schema_1.SongTO }, (request, reply) => {
        try {
            const songsService = new songsService_1.SongsService(server.db);
            // const { singer, song, user } = request.body;
            songsService.insert(request.body).then(data => {
                return reply.code(200).send({
                    success: true,
                    message: 'Insert successful!',
                    data //: { singer: data.singer, song: data.song, createdBy: data.createdBy }
                });
            }).catch(err => {
                server.apm.captureError({
                    method: request.routerMethod,
                    path: request.routerPath,
                    param: request.body,
                    error: err,
                });
                return reply.code(400).send({
                    success: false,
                    message: 'Error in insert new record',
                    // err//: [{name: err.name, method: request.routerMethod, path: request.routerPath, param: request.body}],
                    data: err,
                });
            });
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
    server.post("/song/model/update", { schema: schema_1.SongTO }, (request, reply) => {
        try {
            const songsService = new songsService_1.SongsService(server.db);
            // const { singer, song, user } = request.body;
            songsService.update(request.body).then(data => {
                return reply.code(200).send({
                    success: true,
                    message: 'Update successful!',
                    data
                });
            }).catch(err => {
                server.apm.captureError({
                    method: request.routerMethod,
                    path: request.routerPath,
                    param: request.body,
                    error: err,
                });
                return reply.code(400).send({
                    success: false,
                    message: 'Error updating record',
                    data: err,
                    // err: [{name: err.name, method: request.routerMethod, path: request.routerPath, param: request.body}],
                });
            });
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
    server.post("/song/model/delete", { schema: schema_1.DeleteSongTO }, (request, reply) => {
        try {
            const songsService = new songsService_1.SongsService(server.db);
            // const { song } = request.body;
            songsService.destroy(request.body).then(data => {
                return reply.code(200).send({
                    success: true,
                    message: 'Delete successful!',
                    data
                });
            }).catch(err => {
                server.apm.captureError({
                    method: request.routerMethod,
                    path: request.routerPath,
                    param: request.body,
                    error: err,
                });
                return reply.code(400).send({
                    success: false,
                    message: 'Error deleting record',
                    data: err,
                });
            });
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
    server.get("/song/getAll", { schema: schema_1.GetSongTO }, (request, reply) => {
        try {
            const songDb = songs_1.SongsFactory(server.db);
            songDb.findAll()
                .then(data => {
                return reply.code(200).send({
                    success: true,
                    message: 'Inquiry successful!',
                    data
                });
            }).catch(err => {
                server.apm.captureError({
                    method: request.routerMethod,
                    path: request.routerPath,
                    param: request.body,
                    error: err,
                });
                return reply.code(400).send({
                    success: false,
                    message: 'Error in Inquiry',
                    data: err,
                });
            });
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