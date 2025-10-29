FROM oven/bun:1

WORKDIR /app

COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

COPY src ./src

VOLUME ["/data"]

ENV DB_PATH=/data/tibber.db

CMD ["bun", "src/index.ts"]
