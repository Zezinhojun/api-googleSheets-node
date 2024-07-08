import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

import { AuthRequest } from '../middlewares/Auth';

import { UserServiceImplementation } from '../services/implementations/UserServiceImplementation';

export default class UserController {
  constructor(readonly userService: UserServiceImplementation) {}

  async register(req: Request, res: Response) {
    await body('name')
      .notEmpty()
      .withMessage('O campo name é obrigatório')
      .run(req);
    await body('email')
      .notEmpty()
      .withMessage('O email fornecido não é válido')
      .run(req);
    await body('password')
      .isLength({ min: 6, max: 15 })
      .withMessage('A senha deve ter entre 6 e 15 caracteres')
      .run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      const newUser = await this.userService.createUser(name, email, password);
      return res.status(201).json({
        message: 'Usuário criado com sucesso',
        data: {
          _id: newUser._id,
          email: newUser.email,
        },
      });
    } catch (error) {
      return UserController.handleRegistrationError(res, error);
    }
  }

  async login(req: Request, res: Response) {
    try {
      await body('email')
        .notEmpty()
        .withMessage('O email fornecido não é válido')
        .run(req);
      await body('password')
        .notEmpty()
        .withMessage('A senha é obrigatória')
        .run(req);

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password, remember } = req.body;
      const token = await this.userService.authenticate(
        email,
        password,
        remember,
      );

      return res.status(200).json({
        status: true,
        message: 'Login bem-sucedido',
        token,
      });
    } catch (error) {
      return UserController.handleRegistrationError(res, error);
    }
  }

  async me(req: Request, res: Response) {
    const _request = req as AuthRequest;

    try {
      const userReadDTO = await this.userService.getUserInfo(_request.userId);
      return res.status(200).json({
        status: true,
        data: userReadDTO,
      });
    } catch (error) {
      return UserController.handleRegistrationError(res, error);
    }
  }

  private static handleRegistrationError(res: Response, error: any) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    } else {
      return res.status(500).json({ message: 'Ocorreu interno' });
    }
  }
}
