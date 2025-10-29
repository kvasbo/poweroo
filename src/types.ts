import { z } from 'zod';

export const LiveMeasurementSchema = z.object({
  timestamp: z.string(),
  power: z.number().nullable(),
  powerProduction: z.number().nullable().optional(),
  accumulatedConsumption: z.number().nullable().optional(),
  accumulatedProduction: z.number().nullable().optional(),
  accumulatedCost: z.number().nullable().optional(),
  accumulatedReward: z.number().nullable().optional(),
  currency: z.string().optional(),
  minPower: z.number().nullable().optional(),
  averagePower: z.number().nullable().optional(),
  maxPower: z.number().nullable().optional(),
  voltage1: z.number().nullable().optional(),
  voltage2: z.number().nullable().optional(),
  voltage3: z.number().nullable().optional(),
  current1: z.number().nullable().optional(),
  current2: z.number().nullable().optional(),
  current3: z.number().nullable().optional(),
  powerFactor: z.number().nullable().optional(),
  signalStrength: z.number().nullable().optional(),
});

export type LiveMeasurement = z.infer<typeof LiveMeasurementSchema>;
