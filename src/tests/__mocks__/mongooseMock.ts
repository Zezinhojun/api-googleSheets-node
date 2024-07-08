import { IUser } from '../../entities/user';

const users: IUser[] = [];

export default class MongooseUserModelMock {
  public static readonly findOne = jest
    .fn()
    .mockImplementation(({ email }: { email: string }) => {
      return Promise.resolve(
        users.find((user) => user.email === email) || null,
      );
    });

  public static readonly findById = jest
    .fn()
    .mockImplementation((userId: string) => {
      return Promise.resolve(users.find((user) => user._id === userId) || null);
    });

  public static readonly create = jest
    .fn()
    .mockImplementation((user: IUser) => {
      const newUser: IUser = {
        ...user,
      };
      users.push(newUser);
      return Promise.resolve(newUser);
    });
}
