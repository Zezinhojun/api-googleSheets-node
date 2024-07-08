export interface IHashProvider {
  generateHash(payload: string): Promise<string>;
  compareHash(password: string, hashedPassword: string): Promise<boolean>;
}
