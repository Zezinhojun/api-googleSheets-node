import crypto from 'crypto';

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
}

export class CreateUserDTO implements IUser {
  _id: string;
  name: string;
  email: string;
  password: string;

  constructor(name: string, email: string, password: string) {
    this._id = crypto.randomUUID().toString();
    this.name = name;
    this.email = email;
    this.password = password;
  }
}

export class UserReadDTO {
  readonly _id: string;
  readonly name: string;
  readonly email: string;

  constructor(user: IUser) {
    this._id = user._id.toString();
    this.name = user.name;
    this.email = user.email;
  }
}
