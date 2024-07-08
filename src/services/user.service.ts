import { IUser, UserReadDTO } from '../entities/user';

export interface IUserService {
  createUser(name: string, email: string, password: string): Promise<IUser>;
  authenticate(
    email: string,
    password: string,
    remember: boolean,
  ): Promise<string>;
  getUserInfo(userId: string): Promise<UserReadDTO>;
}
