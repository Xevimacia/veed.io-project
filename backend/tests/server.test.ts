import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import { createApp } from '../src/server';
import { testDb, seedTestDb } from './testDb';

const app = createApp(testDb);

describe('Backend API (server.ts)', () => {
  beforeEach(() => {
    // Reset and reseed the in-memory DB before each test
    testDb.exec('DELETE FROM videos');
    seedTestDb();
  });

  it('GET / should return welcome message', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toMatch(/VEED Video Library API/i);
  });

  it('GET /api/videos should return array of videos', async () => {
    const res = await request(app).get('/api/videos');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0]).toHaveProperty('id');
    expect(res.body[0]).toHaveProperty('title');
  });

  it('GET /api/videos?sort=asc should return sorted videos', async () => {
    const res = await request(app).get('/api/videos?sort=asc');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    for (let i = 1; i < res.body.length; i++) {
      expect(new Date(res.body[i].created_at) >= new Date(res.body[i - 1].created_at)).toBe(true);
    }
  });

  it('GET /api/videos?sort=desc should return sorted videos', async () => {
    const res = await request(app).get('/api/videos?sort=desc');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    // Check that each video's created_at is >= the next
    for (let i = 1; i < res.body.length; i++) {
      expect(new Date(res.body[i - 1].created_at).getTime()).toBeGreaterThanOrEqual(new Date(res.body[i].created_at).getTime());
    }
  });

  it('GET /api/videos?sort=invalid should return 400', async () => {
    const res = await request(app).get('/api/videos?sort=invalid');
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('POST /api/videos should create a new video (normal usage)', async () => {
    const res = await request(app)
      .post('/api/videos')
      .send({ title: 'Test Video', tags: ['test', 'api'] });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.title).toBe('Test Video');
    expect(Array.isArray(res.body.tags)).toBe(true);
    expect(res.body.tags).toContain('test');
    expect(res.body.tags).toContain('api');
    expect(res.body).toHaveProperty('created_at');
    expect(res.body).toHaveProperty('thumbnail_url');
    expect(res.body.duration).toBe(0);
    expect(res.body.views).toBe(0);
  });

  it('POST /api/videos should create a new video with no tags (edge case)', async () => {
    const res = await request(app)
      .post('/api/videos')
      .send({ title: 'No Tags Video' });
    expect(res.status).toBe(201);
    expect(res.body.title).toBe('No Tags Video');
    expect(Array.isArray(res.body.tags)).toBe(true);
    expect(res.body.tags.length).toBe(0);
  });

  it('POST /api/videos should return 400 if title is missing (failure case)', async () => {
    const res = await request(app)
      .post('/api/videos')
      .send({ tags: ['fail'] });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toMatch(/title/i);
  });
}); 