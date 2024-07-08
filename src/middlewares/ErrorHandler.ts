import { Response } from 'express';

const errorHandler = (err: Error, res: Response) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
};

export default errorHandler;
