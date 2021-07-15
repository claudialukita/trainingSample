"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
const sequelize_1 = __importDefault(require("sequelize"));
const schema_1 = require("./schema");
const songs_1 = require("../../../plugins/db/models/songs");
exports.default = fastify_plugin_1.default((server, opts, next) => {
    server.post("/song/insert", { schema: schema_1.SongTO }, (request, reply) => {
        try {
            const { singer, song, user } = request.body;
            const query = `INSERT INTO [poc].[dbo].[songs] ([song], [singer], [createdDate], [createdBy], [lastUpdatedDate], [createdAt], [updatedAt])
            VALUES('${song}', '${singer}', GETDATE(), '${user}', GETDATE(), GETDATE(), GETDATE())`;
            server.db.query(query, {
                type: sequelize_1.default.QueryTypes.INSERT
            }).then(data => {
                return reply.code(200).send({
                    success: true,
                    message: 'Insert successful!',
                    data,
                });
            }).catch(err => {
                // server.apm.captureError({
                //     method: request.routerMethod,
                //     path: request.routerPath,
                //     param: request.body,
                //     error: err,
                // })
                return reply.code(400).send({
                    success: false,
                    message: 'Error in insert new record',
                    err: [{ name: err.name, method: request.routerMethod, path: request.routerPath, param: request.body }],
                });
            });
        }
        catch (error) {
            request.log.error(error);
            return reply.send(400);
        }
    });
    server.post("/song/model/insert", { schema: schema_1.SongTO }, (request, reply) => {
        try {
            const { singer, song, user } = request.body;
            const userDb = songs_1.SongsFactory(server.db);
            userDb.create({ singer, song, createdBy: user })
                .then(data => {
                return reply.code(200).send({
                    success: true,
                    message: 'Insert successful!',
                    data: { singer: data.singer, song: data.song, createdBy: data.createdBy }
                });
            }).catch(err => {
                // server.apm.captureError({
                //     method: request.routerMethod,
                //     path: request.routerPath,
                //     param: request.body,
                //     error: err,
                // })
                return reply.code(400).send({
                    success: false,
                    message: 'Error in insert new record',
                    err: [{ name: err.name, method: request.routerMethod, path: request.routerPath, param: request.body }],
                    // data: err,
                });
            });
        }
        catch (error) {
            // server.apm.captureError({
            //     method: request.routerMethod,
            //     path: request.routerPath,
            //     param: request.body,
            //     error,
            // })
            request.log.error(error);
            return reply.send(400);
        }
    });
    server.post("/song/model/update", { schema: schema_1.SongTO }, (request, reply) => {
        try {
            const { song, singer, user } = request.body;
            const songDb = songs_1.SongsFactory(server.db);
            songDb.update({ singer, LastUpdatedBy: user }, {
                where: {
                    song: song
                }
            }).then(data => {
                return reply.code(200).send({
                    success: true,
                    message: 'Update successful!',
                    data
                });
            }).catch(err => {
                // server.apm.captureError({
                //     method: request.routerMethod,
                //     path: request.routerPath,
                //     param: request.body,
                //     error: err,
                // })
                return reply.code(400).send({
                    success: false,
                    message: 'Error updating record',
                    // data: err,
                    err: [{ name: err.name, method: request.routerMethod, path: request.routerPath, param: request.body }],
                });
            });
        }
        catch (error) {
            // server.apm.captureError({
            //     method: request.routerMethod,
            //     path: request.routerPath,
            //     param: request.body,
            //     error,
            // })
            request.log.error(error);
            return reply.send(400);
        }
    });
    server.post("/song/model/delete", { schema: schema_1.DeleteSongTO }, (request, reply) => {
        try {
            const { song } = request.body;
            const songDb = songs_1.SongsFactory(server.db);
            songDb.destroy({
                where: {
                    song: song
                }
            }).then(data => {
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
            // server.apm.captureError({
            //     method: request.routerMethod,
            //     path: request.routerPath,
            //     param: request.body,
            //     error,
            // })
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