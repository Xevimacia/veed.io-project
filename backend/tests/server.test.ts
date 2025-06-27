import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../src/server';

describe('Backend API (server.ts)', () => {
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
    for (let i = 1; i < res.body.length; i++) {
      expect(new Date(res.body[i].created_at) <= new Date(res.body[i - 1].created_at)).toBe(true);
    }
  });

  it('GET /api/videos?sort=invalid should return 400', async () => {
    const res = await request(app).get('/api/videos?sort=invalid');
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });
}); 