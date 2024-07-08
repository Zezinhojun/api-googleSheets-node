import { IHashProvider } from '../HashProvider';
import bcrypt from 'bcrypt';

export class BcryptHashProvider implements IHashProvider {
  public async generateHash(password: string): Promise<string> {
    const salt = 10;
    const hashPassword = await bcrypt.hash(password, salt);

    return hashPassword;
  }
  public async compareHash(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    const isCorrectPassword = await bcrypt.compare(password, hashedPassword);

    return isCorrectPassword;
  }
}
