"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KafkaService = void 0;
const consumer_1 = require("../../plugins/kafka/consumer");
const producer_1 = require("../../plugins/kafka/producer");
const songsService_1 = require("./songsService");
class KafkaService {
    constructor(serverInstance) {
        this.subscribeTopicSongs = () => __awaiter(this, void 0, void 0, function* () {
            consumer_1.kafkaSubscribe(this.server, 'songsTopic', (messages) => {
                this.server.log.info(messages);
            });
        });
        this.subscribeTopicSaveDb = () => __awaiter(this, void 0, void 0, function* () {
            consumer_1.kafkaSubscribe(this.server, 'songsTopic', (messages) => {
                // this.server.log.info(messages);
                const myobj = JSON.parse(messages.value.toString());
                const songsService = new songsService_1.SongsService(this.server.db);
                songsService.specificSelect(myobj);
            });
        });
        this.publishToTopic = (param) => new Promise((resolve, reject) => {
            const { topic, messages } = param;
            producer_1.publish(this.server, topic, messages)
                .then(data => {
                resolve({ topic, messages });
            }).catch(err => {
                reject(err);
            });
        });
        this.publishJSONToTopic = (param) => new Promise((resolve, reject) => {
            const { topic, messages } = param;
            const strMsg = JSON.stringify(messages);
            producer_1.publish(this.server, topic, strMsg)
                .then(data => {
                resolve({ topic, messages });
            }).catch(err => {
                reject(err);
            });
        });
        this.creatingTopic = (param) => new Promise((resolve, reject) => {
            const { topics } = param;
            producer_1.createTopic(this.server.kafkaClient, topics)
                .then(data => {
                resolve(data);
            }).catch(err => {
                reject(err);
            });
        });
        this.server = serverInstance;
    }
}
exports.KafkaService = KafkaService;
//# sourceMappingURL=kafkaService.js.map