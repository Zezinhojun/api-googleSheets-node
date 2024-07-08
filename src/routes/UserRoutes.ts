import { Request, Response } from 'express';

export interface IUserRoutes {
  register(request: Request, response: Response): Promise<void>;
  login(request: Request, response: Response): Promise<void>;
  me(request: Request, response: Response): Promise<void>;
}
