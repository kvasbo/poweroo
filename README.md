# Poweroo

Time series database for Tibber API realtime data using SQLite.

## Setup

1. Install dependencies:
```bash
pnpm install
```

2. Create `.env` file:
```bash
cp .env.example .env
```

3. Add your Tibber API key to `.env`
4. (Optional) Set `DATA_PATH` in `.env` to customize the data directory location (defaults to `./data`)

## Usage

### Local Development
```bash
pnpm dev
```

### Linting
```bash
pnpm lint
pnpm lint:fix
```

### Production Build
```bash
pnpm build
pnpm start
```

### Docker
```bash
docker-compose up -d
```

Data is persisted to the directory specified by `DATA_PATH` in `.env` (defaults to `./data`).

## Database Schema

The `measurements` table stores all realtime data points with the following fields:
- home_id
- timestamp
- power and power_production
- accumulated consumption/production/cost/reward
- voltage and current (3-phase)
- power_factor and signal_strength
