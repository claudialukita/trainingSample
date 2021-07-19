FROM node:16-alpine3.11
    
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install && npm install tsc -g
COPY . .

RUN npm run build
EXPOSE 3000
CMD ["node", "build/index.js"]