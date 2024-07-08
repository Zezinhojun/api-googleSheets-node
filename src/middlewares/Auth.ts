import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import config from '../config/config';

export interface AuthRequest extends Request {
  userId: string;
}
const Auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Authorization token is required' });
  }

  try {
    const parsedText = token.split(' ')[1];
    const decoded = verify(parsedText, config.JwtSecret as string);
    const _request = req as AuthRequest;
    _request.userId = decoded.sub as string;
    return next();
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized ' });
  }
};

export default Auth;
