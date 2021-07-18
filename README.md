# On-Boarding Project Assignment
This project assignment aims to determine the level of participants understanding of the training that has been given.
## Features
- Restful API using Node JS
- Create topic, publish message, subscribe message and save to DB using Kafka-node
- APM implementation (check transaction, performance, error log using Kibana UI)
- Create Login Service that return a JWT Token
- POJO using Redis implementation (Get & Set)
- Create job service for publish to Kafka topic
- Create unit test on existing services with mock up
- Create pipeline (compile source code, build and push image, deploy image to AKS)

## Tech
Dillinger uses a number of open source projects to work properly:

- [VSCode](https://code.visualstudio.com/) - VSCode text editor or others
- [NodeJS](https://nodejs.org/en/) - JavaScript runtime environment
- [OffsetExplorer](https://www.kafkatool.com/download.html) - Kafka tool
- [DBeaver](https://dbeaver.io/download/) - Database tool
- [RedisInsight](https://redislabs.com/redis-enterprise/redis-insight/#insight-form) - Redis tool

## Installation
Install the library
```sh
npm i -y
npm install fastify ts-node --save
npm install typescript @types/node nodemon --save-D
npx tsc --init
npx gitignore node
npm i fastify-plugin fastify-blipp sequelize fastify-swagger
npm i dotenv
npm i pino-pretty
npm i tedious
npm i elastic-apm-node
npm i kafka-node
```
For build the code
```sh
npm run build
```
For build the code every time there is a code update
```sh
npm run build:dev
```
For run the code
```sh
npm run start
```
For run the code every time there is a code update
```sh
npm run start-dev
```

## Environment variables
1. Create `.env` file
2. Set value of environment variable
```
PORT = 3000
DB_DIALECT=mssql
DB=poc
DB_HOST=20.197.67.11
DB_PORT=1433
DB_USERNAME=sa
DB_PASSWORD=P@ssw0rd45
KAFKA_HOST=20.195.33.95:29092
APM_URL=http://20.195.39.206:8200
```