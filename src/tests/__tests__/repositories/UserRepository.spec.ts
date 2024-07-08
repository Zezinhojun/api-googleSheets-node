import { IUser } from '../../../entities/user';
import { UserRepositoryImplementation } from '../../../repositories/implementations/UserRepositoryImplementation';

import UserRepositoryMock from '../../__mocks__/UserRepositoryMock';

describe('UserRepository', () => {
  let userRepository: UserRepositoryImplementation;

  beforeAll(() => {
    userRepository = new UserRepositoryMock();
  });

  it('should find a user by email', async () => {
    const name = 'name';
    const email = 'email@email.com';
    const password = 'password123';
    const mockUser: IUser = {
      _id: '1',
      name,
      email,
      password,
    };
    await userRepository.create(mockUser);
    const foundUser = await userRepository.findByEmail(email);
    expect(foundUser).toBeDefined();
    expect(foundUser?.email).toBe(email);
  });

  it('should return null when user is not found by email', async () => {
    const email = 'undefined@email.com';
    const foundUser = await userRepository.findByEmail(email);
    expect(foundUser).toBeNull();
  });
  it('should find a user by ID', async () => {
    const name = 'name';
    const email = 'email@email.com';
    const password = 'password123';
    const mockUser: IUser = {
      _id: '1',
      name,
      email,
      password,
    };
    await userRepository.create(mockUser);
    const foundUser = await userRepository.findById('1');
    expect(foundUser).toBeDefined();
    expect(foundUser?.name).toBe(name);
  });

  it('should return null when user is not found by ID', async () => {
    const userId = 'undefined';

    const foundUser = await userRepository.findById(userId);
    expect(foundUser).toBeNull();
  });

  it('should create a new user', async () => {
    const name = 'name';
    const email = 'email@email.com';
    const password = 'password123';
    const mockUser: IUser = {
      _id: '1',
      name,
      email,
      password,
    };
    const newUser = await userRepository.create(mockUser);
    expect(newUser._id).toBeDefined();
    expect(newUser).toMatchObject(mockUser);
  });
});
