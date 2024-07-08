import { IUser } from '../../entities/user';

export default class UserRepositoryMock {
  private users: IUser[] = [];

  async findByEmail(email: string): Promise<IUser | null> {
    return this.users.find((user) => user.email === email) || null;
  }

  async create(user: IUser): Promise<IUser> {
    this.users.push(user);
    return user;
  }

  async findById(userId: string): Promise<IUser | null> {
    return this.users.find((user) => user._id === userId) || null;
  }
}
