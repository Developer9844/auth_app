FROM node:18.20-alpine

WORKDIR /app

RUN adduser -D --home /app appuser 

COPY package*.json .

RUN npm install --no-cache

COPY . .

RUN chown -R appuser:appuser /app

USER appuser

EXPOSE 3000

CMD [ "node", "server.js" ]