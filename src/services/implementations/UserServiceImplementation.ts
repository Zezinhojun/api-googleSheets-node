import { sign } from 'jsonwebtoken';

import config from '../../config/config';
import { CreateUserDTO, IUser, UserReadDTO } from '../../entities/user';
import { BcryptHashProvider } from '../../providers/implementations/BcryptHashProvider';
import { IUserService } from '../user.service';
import { UserRepositoryImplementation } from '../../repositories/implementations/UserRepositoryImplementation';

export class UserServiceImplementation implements IUserService {
  constructor(
    private userRepository: UserRepositoryImplementation,
    private hashProvider: BcryptHashProvider,
  ) {}

  public async createUser(
    name: string,
    email: string,
    password: string,
  ): Promise<IUser> {
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error('Um usuário com esse e-mail já existe.');
    }
    const hashedPassword = await this.hashProvider.generateHash(password);
    const userDto = new CreateUserDTO(name, email, hashedPassword);
    const newUser = await this.userRepository.create(userDto);

    return newUser;
  }

  public async authenticate(
    email: string,
    password: string,
    remember: boolean,
  ): Promise<string> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }
    const isPasswordMatch = await this.hashProvider.compareHash(
      password,
      user.password,
    );
    if (!isPasswordMatch) {
      throw new Error('Senha incorreta.');
    }

    const tokenExpiration = remember ? '7d' : '1d';

    const token = sign({ sub: user._id }, config.JwtSecret as string, {
      expiresIn: tokenExpiration,
    });

    return token;
  }

  public async getUserInfo(userId: string): Promise<UserReadDTO> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }
    const userReadDTO = new UserReadDTO(user);

    return userReadDTO;
  }
}
