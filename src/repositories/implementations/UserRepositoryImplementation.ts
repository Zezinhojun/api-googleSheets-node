import { IUser } from '../../entities/user';
import mongooseUserModel from '../../mongooseDatabase/user.model';
import { IUserRepository } from '../UserRepository';

export class UserRepositoryImplementation implements IUserRepository {
  async findByEmail(email: string): Promise<IUser | null> {
    try {
      return mongooseUserModel.findOne({ email });
    } catch (error) {
      throw new Error('Failed to find user');
    }
  }

  async findById(userId: string): Promise<IUser | null> {
    return mongooseUserModel.findById(userId);
  }

  async create(user: IUser): Promise<IUser> {
    return mongooseUserModel.create(user);
  }
}
