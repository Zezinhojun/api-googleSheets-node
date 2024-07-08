export default class HashProviderMock {
  public async generateHash(password: string): Promise<string> {
    return `hashed-${password}`;
  }
  public async compareHash(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return hashedPassword === `hashed-${password}`;
  }
}
