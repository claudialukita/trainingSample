"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetSongTO = exports.DeleteSongTO = exports.SongTO = void 0;
exports.SongTO = {
    description: 'SongDetail',
    tags: ['Song'],
    summary: 'Song',
    body: {
        type: 'object',
        properties: {
            singer: { type: 'string' },
            song: { type: 'string' },
            user: { type: 'string' },
        }
    },
    response: {
        200: {
            description: 'Successful response',
            type: 'object',
            properties: {
                success: { type: 'string' },
                message: { type: 'string' },
                data: {
                    singer: { type: 'string' },
                    song: { type: 'string' },
                    createdBy: { type: 'string' },
                }
            }
        }
    }
};
exports.DeleteSongTO = {
    description: 'SongDetail',
    tags: ['Song'],
    summary: 'Song',
    body: {
        type: 'object',
        properties: {
            song: { type: 'string' },
        }
    },
    response: {
        200: {
            description: 'Successful deleted',
            type: 'object',
            properties: {
                success: { type: 'string' },
                message: { type: 'string' },
                data: {
                    song: { type: 'string' },
                }
            }
        }
    }
};
exports.GetSongTO = {
    description: 'SongDetail',
    tags: ['Song'],
    summary: 'Song',
    response: {
        200: {
            description: 'Successful response',
            type: 'object',
            properties: {
                success: { type: 'string' },
                message: { type: 'string' },
                data: {
                    song: { type: 'string' },
                    createdBy: { type: 'string' },
                }
            }
        }
    }
};
//# sourceMappingURL=schema.js.map