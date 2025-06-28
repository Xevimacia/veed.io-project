import { Router, Request, Response } from 'express';
import type { Database as DatabaseType } from 'better-sqlite3';
import { z } from 'zod';
import { Video } from '../models/video';

export function createVideosRouter(db: DatabaseType) {
  const router = Router();

  // Zod schema for query validation
  const sortSchema = z.object({
    sort: z.enum(['asc', 'desc']).optional(),
  });

  // Zod schema for POST body validation
  const postVideoSchema = z.object({
    title: z.string({ required_error: 'Title is required' }).min(1, 'Title is required'),
    tags: z.array(z.string().min(1)).optional(),
  });

  router.get('/', (req: Request, res: Response) => {
    try {
      // Validate query
      const parseResult = sortSchema.safeParse(req.query);
      if (!parseResult.success) {
        return res.status(400).json({ error: 'Invalid sort parameter' });
      }
      const { sort } = parseResult.data;
      const order = sort === 'asc' ? 'ASC' : 'DESC';
      const rows = db.prepare(
        `SELECT * FROM videos ORDER BY datetime(created_at) ${order}, id DESC`
      ).all();
      // Parse tags from JSON string to array
      const videos: Video[] = rows.map((row: any) => ({
        ...row,
        tags: row.tags ? JSON.parse(row.tags) : [],
      }));
      res.status(200).json(videos);
    } catch (err) {
      console.error('Error fetching videos:', err);
      res.status(500).json({ error: 'Failed to fetch videos' });
    }
  });

  router.post('/', (req: Request, res: Response) => {
    // Validate request body
    const parseResult = postVideoSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({ error: parseResult.error.errors.map(e => e.message).join(', ') });
    }
    try {
      // Get next ID (e.g., v-051)
      const row = db.prepare('SELECT id FROM videos ORDER BY id DESC LIMIT 1').get() as { id?: string };
      let nextId = 'v-001';
      if (row && row.id) {
        const num = parseInt(row.id.replace('v-', ''), 10) + 1;
        nextId = `v-${num.toString().padStart(3, '0')}`;
      }
      const now = new Date().toISOString(); // ISO 8601 format
      const { title, tags } = parseResult.data;
      const video = {
        id: nextId,
        title,
        thumbnail_url: `https://picsum.photos/seed/${nextId}/300/200`,
        created_at: now,
        duration: 0,
        views: 0,
        tags: tags || [],
      };
      db.prepare(
        'INSERT INTO videos (id, title, thumbnail_url, created_at, duration, views, tags) VALUES (?, ?, ?, ?, ?, ?, ?)'
      ).run(
        video.id,
        video.title,
        video.thumbnail_url,
        video.created_at,
        video.duration,
        video.views,
        JSON.stringify(video.tags)
      );
      res.status(201).json(video);
    } catch (err) {
      console.error('Error inserting video:', err);
      res.status(500).json({ error: 'Failed to create video' });
    }
  });

  return router;
} 