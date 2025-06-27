import { Router, Request, Response } from 'express';
import db from '../db';
import { z } from 'zod';
import { Video } from '../models/video';

const router = Router();

// Zod schema for query validation
const sortSchema = z.object({
  sort: z.enum(['asc', 'desc']).optional(),
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
      `SELECT * FROM videos ORDER BY datetime(created_at) ${order}`
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

export default router; 