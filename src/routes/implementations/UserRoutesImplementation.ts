import { Request, Response } from 'express';

import UserController from '../../controllers/UserController';
import { IUserRoutes } from '../UserRoutes';

export class UserRoutesImplementation implements IUserRoutes {
  constructor(private userController: UserController) {}
  register = async (request: Request, response: Response): Promise<void> => {
    await this.userController.register(request, response);
  };
  login = async (request: Request, response: Response): Promise<void> => {
    await this.userController.login(request, response);
  };
  me = async (request: Request, response: Response): Promise<void> => {
    await this.userController.me(request, response);
  };
}
