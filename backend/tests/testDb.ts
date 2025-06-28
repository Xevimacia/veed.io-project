import path from 'path';
import { createDb, seedDbFromJson } from '../src/db';
import type { Database as DatabaseType } from 'better-sqlite3';

// Path to the original videos.json
const videosJsonPath = path.join(__dirname, '../videos.json');

// Create an in-memory DB for tests
export const testDb: DatabaseType = createDb(':memory:');

// Seed the test DB with the original videos.json
export function seedTestDb() {
  seedDbFromJson(testDb, videosJsonPath);
} 