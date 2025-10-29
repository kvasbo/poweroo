import { TibberFeed, TibberQuery, type IConfig } from 'tibber-api';
import type Database from 'better-sqlite3';
import { LiveMeasurementSchema } from './types.js';
import { insertMeasurement } from './database.js';

export const startCollector = async (apiKey: string, db: Database.Database) => {
  const config: IConfig = {
    active: true,
    apiEndpoint: {
      apiKey,
      queryUrl: 'https://api.tibber.com/v1-beta/gql',
    },
    timestamp: true,
    power: true,
    powerProduction: true,
    accumulatedConsumption: true,
    accumulatedProduction: true,
    accumulatedCost: true,
    accumulatedReward: true,
    currency: true,
    minPower: true,
    averagePower: true,
    maxPower: true,
    powerFactor: true,
    signalStrength: true,
  };

  const query = new TibberQuery(config);
  const homes = await query.getHomes();

  console.log(`Found ${homes.length} home(s)`);

  for (const home of homes) {
    if (!home.id) {
      console.log(`Skipping home without ID: ${home.appNickname}`);
      continue;
    }

    const homeId = home.id;
    const homeName = home.appNickname || homeId;

    console.log(`Starting collector for home: ${homeName} (${homeId})`);

    const feedQuery = new TibberQuery({ ...config, homeId });
    const feed = new TibberFeed(feedQuery);

    feed.on('data', (data: any) => {
      try {
        const validated = LiveMeasurementSchema.parse(data);
        insertMeasurement(db, homeId, validated);
        console.log(`[${homeName}] ${validated.power}W at ${validated.timestamp}`);
      } catch (error) {
        console.error(`Validation error for home ${homeId}:`, error);
      }
    });

    feed.on('error', (error: Error) => {
      console.error(`Feed error for home ${homeId}:`, error);
    });

    feed.on('connected', () => {
      console.log(`✓ Feed connected for home ${homeId}`);
    });

    feed.on('disconnected', () => {
      console.log(`✗ Feed disconnected for home ${homeId}, reconnecting...`);
      setTimeout(() => feed.connect(), 5000);
    });

    console.log(`Connecting feed for home ${homeId}...`);
    feed.connect();
  }
};
