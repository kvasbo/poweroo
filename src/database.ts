import { Database } from 'bun:sqlite';
import { mkdirSync } from 'fs';
import { dirname } from 'path';
import type { LiveMeasurement } from './types.js';

export const initDatabase = (dbPath: string) => {
  const dir = dirname(dbPath);
  mkdirSync(dir, { recursive: true });

  const db = new Database(dbPath);

  db.exec(`
    CREATE TABLE IF NOT EXISTS measurements (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      home_id TEXT NOT NULL,
      timestamp TEXT NOT NULL,
      power REAL,
      power_production REAL,
      accumulated_consumption REAL,
      accumulated_production REAL,
      accumulated_cost REAL,
      accumulated_reward REAL,
      currency TEXT,
      min_power REAL,
      average_power REAL,
      max_power REAL,
      voltage1 REAL,
      voltage2 REAL,
      voltage3 REAL,
      current1 REAL,
      current2 REAL,
      current3 REAL,
      power_factor REAL,
      signal_strength REAL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.exec(`
    CREATE INDEX IF NOT EXISTS idx_home_timestamp
    ON measurements(home_id, timestamp)
  `);

  return db;
};

export const insertMeasurement = (
  db: Database,
  homeId: string,
  measurement: LiveMeasurement
) => {
  const stmt = db.prepare(`
    INSERT INTO measurements (
      home_id, timestamp, power, power_production,
      accumulated_consumption, accumulated_production,
      accumulated_cost, accumulated_reward, currency,
      min_power, average_power, max_power,
      voltage1, voltage2, voltage3,
      current1, current2, current3,
      power_factor, signal_strength
    ) VALUES (
      ?, ?, ?, ?,
      ?, ?,
      ?, ?, ?,
      ?, ?, ?,
      ?, ?, ?,
      ?, ?, ?,
      ?, ?
    )
  `);

  stmt.run(
    homeId,
    measurement.timestamp,
    measurement.power,
    measurement.powerProduction ?? null,
    measurement.accumulatedConsumption ?? null,
    measurement.accumulatedProduction ?? null,
    measurement.accumulatedCost ?? null,
    measurement.accumulatedReward ?? null,
    measurement.currency ?? null,
    measurement.minPower ?? null,
    measurement.averagePower ?? null,
    measurement.maxPower ?? null,
    measurement.voltage1 ?? null,
    measurement.voltage2 ?? null,
    measurement.voltage3 ?? null,
    measurement.current1 ?? null,
    measurement.current2 ?? null,
    measurement.current3 ?? null,
    measurement.powerFactor ?? null,
    measurement.signalStrength ?? null
  );
};
