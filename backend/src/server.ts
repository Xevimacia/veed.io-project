import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import db from './db';
import { createVideosRouter } from './routes/videos';

export function createApp(customDb = db) {
  const app = express();
  app.use(cors());
  app.use(bodyParser.json());

  app.get('/', (req: Request, res: Response) => {
    res.json({ message: 'VEED Video Library API is running.' });
  });

  app.use('/api/videos', createVideosRouter(customDb));
  return app;
}

const PORT = 4000;
const app = createApp();

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
}

export default app;
