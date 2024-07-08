export default class BcryptMock {
  static hash(password: string, saltOrRounds: number): Promise<string> {
    return Promise.resolve('hashed_password_mock');
  }

  static compare(password: string, hashedPassoword: string): Promise<boolean> {
    return Promise.resolve(password === hashedPassoword);
  }
}
