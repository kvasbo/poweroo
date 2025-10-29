FROM node:22-alpine

RUN apk add --no-cache python3 make g++

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY tsconfig.json ./
COPY src ./src
RUN pnpm build

RUN pnpm prune --prod

VOLUME ["/data"]

ENV DB_PATH=/data/tibber.db

CMD ["node", "dist/index.js"]
