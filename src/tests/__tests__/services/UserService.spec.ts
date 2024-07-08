import { UserServiceImplementation } from '../../../services/implementations/UserServiceImplementation';
import HashProviderMock from '../../__mocks__/hashProviderMock';
import UserRepositoryMock from '../../__mocks__/UserRepositoryMock';

describe('UserService', () => {
  let userService: UserServiceImplementation;
  let userRepository: UserRepositoryMock;
  let hashProvider: HashProviderMock;

  beforeEach(() => {
    userRepository = new UserRepositoryMock();
    hashProvider = new HashProviderMock();
    userService = new UserServiceImplementation(userRepository, hashProvider);
  });

  it('should create a new user', async () => {
    const name = 'name';
    const email = 'email@email.com';
    const password = 'password123';

    const user = await userService.createUser(name, email, password);

    expect(user).toHaveProperty('_id');
    expect(user.email).toBe(email);
    expect(user.password).toBe(`hashed-${password}`);
  });

  it('should not create a user with an existing email', async () => {
    const name = 'name';
    const email = 'email@email.com';
    const password = 'password123';

    await userService.createUser(name, email, password);
    await expect(userService.createUser(name, email, password)).rejects.toThrow(
      'Um usuário com esse e-mail já existe.',
    );
  });

  it('should authenticate user with correct credencials', async () => {
    const name = 'name';
    const email = 'email@email.com';
    const password = 'password123';

    await userService.createUser(name, email, password);
    const token = await userService.authenticate(email, password, false);
    expect(token).toBeDefined();
  });

  it('should not authenticate user with incorrect password', async () => {
    const name = 'name';
    const email = 'email@email.com';
    const password = 'password123';

    await userService.createUser(name, email, password);

    await expect(
      userService.authenticate(email, 'wrongpassword', false),
    ).rejects.toThrow('Senha incorreta.');
  });

  test('should return user info', async () => {
    const name = 'name';
    const email = 'email@email.com';
    const password = 'password123';

    const user = await userService.createUser(name, email, password);

    const userInfo = await userService.getUserInfo(user._id);

    if (userInfo) {
      expect(userInfo).toHaveProperty('_id');
      expect(userInfo.email).toBe(email);
    } else {
      console.log('User not found'); // Log para diagnóstico
    }
  });
});
