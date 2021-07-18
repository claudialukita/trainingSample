import * as instance from '../server';
import SequelizeMock from 'sequelize-mock';

import { UserService } from "../modules/services/userService";
import { SongsService } from '../modules/services/songsService';
import { KafkaService } from '../modules/services/kafkaService';
import { doesNotReject } from 'assert';


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

const dataPublishJSONToKafka = {
  topic: "songsTopic",
  messages: {
    singer: "mock singer",
    song: "mock song",
    user: "mock user"
  }
};

const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3R1c2VybmFtZSJ9.KLDiMFN3QkOAS8mprDbCoYu1t4yPcmvBZaqtQYti38I";

jest.setTimeout(12000);

let server: any;
beforeAll(async () => {
  server = await instance.createServer();
});

afterAll((done) => {
  server.stop;
  done();
});

//----------------------------------------------------------------------------------------------//

describe('server test', () => {
  test("GET returns 200", async () => {
    const response = await server.inject({
      method: 'GET',
      url: '/',
      headers: {
        'Authorization': token
      }
    });
    expect(response.statusCode).toBe(200);
    expect(response.payload).toBe('{"hello":"world"}');
  });
});

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
  const dbMock = new SequelizeMock();

  const songsService = new SongsService(dbMock)

  // Spying on the actual methods of the class
  jest.spyOn(songsService, 'insert');

  it('should insert data', async () => {
    const insertData = await songsService.insert(dataInputSong);
    expect(insertData).toEqual('mock song');
    expect(songsService.insert).toHaveBeenCalledTimes(1);
  });
});


describe('song: DB update', () => {
  const dbMock = new SequelizeMock();

  const songsService = new SongsService(dbMock)

  // Spying on the actual methods of the class
  jest.spyOn(songsService, 'update');

  it('should update data', async () => {
    const updateData = await songsService.update(dataInputSong);
    expect(updateData).toEqual(1);
    expect(songsService.update).toHaveBeenCalledTimes(1);
  });
});

describe('song: DB delete', () => {
  const dbMock = new SequelizeMock();

  const songsService = new SongsService(dbMock)
  const kafkaService = new KafkaService(dbMock)

  // Spying on the actual methods of the class
  jest.spyOn(songsService, 'destroy');
  

  it('should delete data', async () => {
    const deleteData = await songsService.destroy(dataInputSong);
    expect(deleteData).toEqual(1);
    expect(songsService.destroy).toHaveBeenCalledTimes(1);
  });
});

describe('song: DB delete', () => {
  const dbMock = new SequelizeMock();

  const songsService = new SongsService(dbMock)

  // Spying on the actual methods of the class
  jest.spyOn(songsService, 'destroy');
  

  it('should delete data', async () => {
    const deleteData = await songsService.destroy(dataInputSong);
    expect(deleteData).toEqual(1);
    expect(songsService.destroy).toHaveBeenCalledTimes(1);
  });
});
