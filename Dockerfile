FROM node:22-alpine

RUN apk add --no-cache python3 make g++

WORKDIR /app

COPY package*.json ./
RUN npm ci --production

COPY tsconfig.json ./
COPY src ./src
RUN npm run build

RUN npm prune --production

VOLUME ["/data"]

ENV DB_PATH=/data/tibber.db

CMD ["node", "dist/index.js"]
