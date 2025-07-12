import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server  running on port ${port}`);
});
