FROM node:14.17.3-alpine3.14

WORKDIR /app

COPY ./app/package*.json ./

RUN npm install

COPY ./app/ .

EXPOSE 8000

ENTRYPOINT ["node","app.js"]
