import 'dotenv/config';
import { initDatabase } from './database.js';
import { startCollector } from './collector.js';

const main = async () => {
  const apiKey = process.env.TIBBER_API_KEY;

  if (!apiKey) {
    console.error('TIBBER_API_KEY environment variable is required');
    process.exit(1);
  }

  const dbPath = process.env.DB_PATH || './data/tibber.db';

  console.log('Initializing database...');
  const db = initDatabase(dbPath);

  console.log('Starting Tibber collector...');
  await startCollector(apiKey, db);

  console.log('Collector running. Press Ctrl+C to stop.');
};

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
