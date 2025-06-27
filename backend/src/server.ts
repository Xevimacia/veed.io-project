import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import './db';

const app = express();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'VEED Video Library API is running.' });
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
