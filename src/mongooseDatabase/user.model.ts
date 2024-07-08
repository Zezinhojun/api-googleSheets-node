import mongoose from 'mongoose';
import { IUser } from '../entities/user';

const UserSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const mongooseUserModel = mongoose.model<IUser>('User', UserSchema);

export default mongooseUserModel;
