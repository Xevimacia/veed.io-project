import Database, { Database as DatabaseType } from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

const createTableSQL = `
CREATE TABLE IF NOT EXISTS videos (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  thumbnail_url TEXT,
  created_at TEXT,
  duration INTEGER,
  views INTEGER,
  tags TEXT
);
`;

/**
 * Create a new SQLite database connection and ensure the videos table exists.
 * @param dbPath Path to the SQLite database file (or ':memory:' for in-memory)
 */
export function createDb(dbPath?: string) {
  let resolvedPath = dbPath;
  if (!dbPath) {
    // Default to production DB file
    const dataDir = path.join(__dirname, '../../data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    resolvedPath = path.join(dataDir, 'videos.db');
  }
  const db = new Database(resolvedPath!);
  db.exec(createTableSQL);
  return db;
}

/**
 * Seed the given DB with videos from a JSON file (videos.json).
 * @param db Database instance
 * @param jsonPath Path to videos.json
 */
export function seedDbFromJson(db: DatabaseType, jsonPath: string) {
  const videosRaw = fs.readFileSync(jsonPath, 'utf-8');
  const videosObj = JSON.parse(videosRaw);
  const videosArr = videosObj.videos;
  const insert = db.prepare(
    'INSERT INTO videos (id, title, thumbnail_url, created_at, duration, views, tags) VALUES (?, ?, ?, ?, ?, ?, ?)'
  );
  const insertMany = db.transaction((videosArr: any[]) => {
    for (const v of videosArr) {
      insert.run(
        v.id,
        v.title,
        v.thumbnail_url,
        v.created_at,
        v.duration,
        v.views,
        JSON.stringify(v.tags || [])
      );
    }
  });
  insertMany(videosArr);
}

// Default export: production DB
const db = createDb();
// Seed production DB if empty
try {
  const row = db.prepare('SELECT COUNT(*) as count FROM videos').get() as { count: number };
  if (row.count === 0) {
    const jsonPath = path.join(__dirname, '../../data/videos.json');
    seedDbFromJson(db, jsonPath);
    console.log('Seeded videos table from videos.json');
  }
} catch (err) {
  console.error('Error checking or seeding videos table:', err);
}
export default db; 