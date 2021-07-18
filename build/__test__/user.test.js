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
const instance = __importStar(require("../server"));
const sequelize_mock_1 = __importDefault(require("sequelize-mock"));
const songsService_1 = require("../modules/services/songsService");
//---------------------------------------------------------//
// const dataInputUser = {
//   username: '1mockUsername',
//   password: '1mockPassword',
//   email: '1mockEmail@example.com',
//   createdBy: '1mockLogin',
//   address: '1mockAddressLogin'
// };
const dataInputSong = {
    singer: 'mock singer',
    song: 'mock song',
    user: 'mock user'
};
const mockLoginData = {
    username: "mock username",
    password: "mock password"
};
const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3R1c2VybmFtZSJ9.KLDiMFN3QkOAS8mprDbCoYu1t4yPcmvBZaqtQYti38I";
jest.setTimeout(12000);
let server;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    server = yield instance.createServer();
}));
afterAll((done) => {
    server.stop;
    done();
});
//----------------------------------------------------------------------------------------------//
// describe('server test', () => {
//   test("GET returns 200", async () => {
//     const response = await server.inject({
//       method: 'GET',
//       url: '/',
//       headers: {
//         'Authorization': token
//       }
//     });
//     expect(response.statusCode).toBe(200);
//     expect(response.payload).toBe('{"hello":"world"}');
//   });
// });
//----------------------------------------------------------------------------------------------//
//----------------------------------------------------------------------------------------------//
// describe('song: insert', () => {
//    const dataMockResp = {
//      "success": "true",
//      "message": "Insert successful!",
//      "data": {
//        ...dataInputSong,
//        "createdBy": mockLoginData.username
//      }
//    }
//    test("POST returns 200", async () => {
//      const response = await server.inject({
//        method: 'POST',
//        url: '/song/model/insert',
//        headers: {
//          'Authorization': token
//        },
//        body: dataInputSong
//      });
//      expect(response.statusCode).toBe(200);
//      expect(JSON.parse(response.payload).message).toBe('Insert successful!');
//    });
//  });
//----------------------------------------------------------------------------------------------//
describe('song: DB insert', () => {
    const dbMock = new sequelize_mock_1.default();
    const songsService = new songsService_1.SongsService(dbMock);
    // Spying on the actual methods of the class
    jest.spyOn(songsService, 'insert');
    it('should insert data', () => __awaiter(void 0, void 0, void 0, function* () {
        const insertData = yield songsService.insert(dataInputSong);
        expect(insertData).toEqual('mock song');
        expect(songsService.insert).toHaveBeenCalledTimes(1);
    }));
});
describe('song: DB update', () => {
    const dbMock = new sequelize_mock_1.default();
    const songsService = new songsService_1.SongsService(dbMock);
    // Spying on the actual methods of the class
    jest.spyOn(songsService, 'update');
    it('should update data', () => __awaiter(void 0, void 0, void 0, function* () {
        const updateData = yield songsService.update(dataInputSong);
        expect(updateData).toEqual(1);
        expect(songsService.update).toHaveBeenCalledTimes(1);
    }));
});
describe('song: DB delete', () => {
    const dbMock = new sequelize_mock_1.default();
    const songsService = new songsService_1.SongsService(dbMock);
    // Spying on the actual methods of the class
    jest.spyOn(songsService, 'destroy');
    it('should delete data', () => __awaiter(void 0, void 0, void 0, function* () {
        const deleteData = yield songsService.destroy(dataInputSong);
        expect(deleteData).toEqual(1);
        expect(songsService.destroy).toHaveBeenCalledTimes(1);
    }));
});
//# sourceMappingURL=user.test.js.map