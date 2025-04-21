FROM node:18.20-alpine

WORKDIR /app

RUN adduser -D --home /app appuser 

COPY . .

RUN chown -R appuser:appuser /app

USER appuser

RUN npm install

CMD [ "node", "server.js" ]