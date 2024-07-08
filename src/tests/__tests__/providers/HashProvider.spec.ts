import { BcryptHashProvider } from '../../../providers/implementations/BcryptHashProvider';
import bcrypt from 'bcrypt';

describe('HashProvider', () => {
  let bcryptHashProvider: BcryptHashProvider;

  beforeAll(() => {
    bcryptHashProvider = new BcryptHashProvider();
  });

  it('should generate a hashed password', async () => {
    const password = 'password123';
    const hashedPassword = await bcryptHashProvider.generateHash(password);

    expect(hashedPassword).toBeTruthy();
    expect(typeof hashedPassword).toBe('string');
  });

  it('should compare hashed and password correctly', async () => {
    const password = 'password123';
    const hashedPassword = await bcrypt.hash(password, 10);

    const isCorrectPassword = await bcryptHashProvider.compareHash(
      password,
      hashedPassword,
    );
    expect(isCorrectPassword).toBe(true);
  });

  it('should return false when compare incorrect passwords', async () => {
    const password = 'password123';
    const incorrectPassword = 'wrongpassword';

    const hashedPassword = await bcrypt.hash(password, 10);

    const isCorrectPassword = await bcryptHashProvider.compareHash(
      incorrectPassword,
      hashedPassword,
    );
    expect(isCorrectPassword).toBe(false);
  });
});
