"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscribeKafkaTO = exports.TopicKafkaTO = exports.PublishJSONKafkaTO = exports.PublishKafkaTO = void 0;
exports.PublishKafkaTO = {
    description: 'kafka',
    tags: ['kafka'],
    summary: 'Kafka',
    body: {
        type: 'object',
        properties: {
            topic: { type: 'string' },
            messages: { type: 'string' },
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
                    type: 'object',
                    properties: {
                        topic: {
                            type: 'object',
                            properties: {
                                0: { type: 'string' },
                            }
                        },
                    }
                }
            }
        }
    }
};
exports.PublishJSONKafkaTO = {
    description: 'kafka',
    tags: ['kafka'],
    summary: 'Kafka',
    body: {
        type: 'object',
        properties: {
            topic: { type: 'string' },
            messages: {
                type: 'object',
                properties: {
                    singer: { type: 'string' },
                    song: { type: 'string' },
                    user: { type: 'string' },
                }
            },
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
                    type: 'object',
                    properties: {
                        topic: {
                            type: 'object',
                            properties: {
                                0: { type: 'string' },
                            }
                        },
                    }
                }
            }
        }
    }
};
exports.TopicKafkaTO = {
    description: 'kafka',
    tags: ['kafka'],
    summary: 'Kafka',
    body: {
        type: 'object',
        properties: {
            topics: {
                type: 'array',
                items: {
                    type: 'string'
                }
            },
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
                    type: 'array',
                    items: {
                        type: 'string'
                    }
                }
            }
        }
    }
};
exports.SubscribeKafkaTO = {
    description: 'kafka',
    tags: ['kafka'],
    summary: 'Kafka',
    body: {
        type: 'object',
        properties: {
            topic: { type: 'string' },
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
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            highWaterOffset: { type: 'string' },
                            key: { type: 'string' },
                            partition: { type: 'string' },
                            topic: { type: 'string' },
                            value: { type: 'string' },
                        }
                    }
                }
            }
        }
    }
};
//# sourceMappingURL=schema.js.map