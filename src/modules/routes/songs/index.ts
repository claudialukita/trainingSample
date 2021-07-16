import fp from 'fastify-plugin';
import Sequelize from 'sequelize';

import { SongTO, GetSongTO, DeleteSongTO } from './schema';
// import { SongUsersFactory, SongUsersAttributes } from '../../../plugins/db/models/users';
import { SongsFactory, SongsAttributes } from '../../../plugins/db/models/songs';
import { SongsService } from '../../../services/songsService';



export default fp((server, opts, next) => {

    

    server.post("/song/insert", { schema: SongTO }, (request, reply) => {
        try {
            const { singer, song, user } = request.body;
            const query = `INSERT INTO [poc].[dbo].[songs] ([song], [singer], [createdDate], [createdBy], [lastUpdatedDate], [createdAt], [updatedAt])
            VALUES('${song}', '${singer}', GETDATE(), '${user}', GETDATE(), GETDATE(), GETDATE())`;

            server.db.query(query, {
                type: Sequelize.QueryTypes.INSERT
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
                    err: [{name: err.name, method: request.routerMethod, path: request.routerPath, param: request.body}],
                });
            });

        } catch (error) {
            request.log.error(error);
            return reply.send(400);
        }
    });

    server.post("/song/model/insert", { schema: SongTO }, (request, reply) => {
        try {
            const songsService = new SongsService(server.db);
            const { singer, song, user } = request.body;
            
            songsService.insert(request.body).then(data => {
                    return reply.code(200).send({
                        success: true,
                        message: 'Insert successful!',
                        data//: { singer: data.singer, song: data.song, createdBy: data.createdBy }
                    });
                }).catch(err => {
                    server.apm.captureError({
                        method: request.routerMethod,
                        path: request.routerPath,
                        param: request.body,
                        error: err,
                    })

                    return reply.code(400).send({
                        success: false,
                        message: 'Error in insert new record',
                        // err//: [{name: err.name, method: request.routerMethod, path: request.routerPath, param: request.body}],
                        data: err,
                    });
                });

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

    server.post("/song/model/update", { schema: SongTO }, (request, reply) => {
        try {

            const songsService = new SongsService(server.db);
            const { singer, song, user } = request.body;
            
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
                })

                return reply.code(400).send({
                    success: false,
                    message: 'Error updating record',
                    data: err,
                    // err: [{name: err.name, method: request.routerMethod, path: request.routerPath, param: request.body}],
                });
            });

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

    server.post("/song/model/delete", { schema: DeleteSongTO }, (request, reply) => {
        try {

            const songsService = new SongsService(server.db);
            const { song } = request.body;
            
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
                })

                return reply.code(400).send({
                    success: false,
                    message: 'Error deleting record',
                    data: err,
                });
            });

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

    server.get("/song/getAll", { schema: GetSongTO }, (request, reply) => {
        try {

            const songDb = SongsFactory(server.db);

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
                    })

                    return reply.code(400).send({
                        success: false,
                        message: 'Error in Inquiry',
                        data: err,
                    });
                });

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