import { SongsFactory } from '../plugins/db/models/songs';

export class SongsService {
   
   db: any;
   songsModel;

   constructor(db) { 
      this.db = db;
      this.songsModel = SongsFactory(this.db);
   }

   
   insert = (param) => new Promise((resolve, reject) => {
      const { singer, song, user } = param;

      this.songsModel.create({ singer, song, createdBy: user })
         .then(data => {
            resolve(data.song);
         }).catch(err => {
            reject(err);
         });
   });

   update = (param) => new Promise((resolve, reject) => {
      const { singer, song, user } = param;

      this.songsModel.update({ singer, LastUpdatedBy: user }, {
         where: {
             song: song
         }
      }).then(data => {
            resolve(data.song);
         }).catch(err => {
            reject(err);
         });
   });

   destroy = (param) => new Promise((resolve, reject) => {
      const { song } = param;

      this.songsModel.destroy({
         where: {
            song: song
         }
      }).then(data => {
         resolve(data.song);
      }).catch(err => {
         reject(err);
      });
   });

}