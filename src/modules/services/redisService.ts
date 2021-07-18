export const setLoginRedis = (param, server) => new Promise((resolve, reject) => {
   const { username, token } = param;
   const bearerToken = "Bearer " + token;

   // key login token
   server.redis.set(username, bearerToken, "EX", server.conf.expireToken, (err, val) => {
       if (err) {
           reject(err);
       } else {
           resolve(token);
       }
   })
});

export const getLoginRedis = (param, server) => new Promise((resolve, reject) => {
    const { username, token } = param;
    //get string
     server.redis.get(username, function(err, reply) {
        if(reply === token){
            resolve(reply);
        } else{
            reject(err);
        }
     });
 
 });

 export const getListLoginRedis = (param, server) => new Promise((resolve, reject) => {
    const { username, token } = param;
 
    //get list
    server.redis.lrange(username, 0, -1, function(err, reply) {
        console.log(reply);
    });
 
 });

export class RedisOperation {
   // server: any;
   redis: any;
   conf: any;

   constructor(serverInstance) {
       this.redis = serverInstance.redis;
       this.conf = serverInstance.conf;
   }

   setValueToList = (key, value) => new Promise((resolve, reject) => {

       // key login token
       this.redis.sadd(key, value, (err, val) => {
           if (err) {
               reject(err);
           } else {
               resolve(val);
           }
       })
   });
}