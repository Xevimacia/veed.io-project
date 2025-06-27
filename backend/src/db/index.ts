import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

// Ensure the data directory exists at the project root
const dataDir = path.join(__dirname, '../../data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Use the correct path for the database file
const dbPath = path.join(dataDir, 'videos.db');
const db = new Database(dbPath);

// Create videos table if it doesn't exist
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
db.exec(createTableSQL);
console.log('Table creation attempted at', dbPath);

// Seed from videos.json if table is empty
try {
  const row = db.prepare('SELECT COUNT(*) as count FROM videos').get() as { count: number };
  console.log('Row count:', row.count);
  if (row.count === 0) {
    const jsonPath = path.join(__dirname, '../../videos.json');
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
    console.log('Seeded videos table from videos.json');
  }
} catch (err) {
  console.error('Error checking or seeding videos table:', err);
}

export default db; 