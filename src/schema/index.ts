import mongoose, { Model } from 'mongoose';
import bcrypt from 'bcrypt';
import { MONGODB_URI } from '../server/config';
import { IUser, IUserMethods } from '../interfaces';

type UserModel = Model<IUser, {}, IUserMethods>;

export const userSchema = new mongoose.Schema<
  IUser,
  UserModel,
  IUserMethods
>({
  email: String,
  username: String,
  password: String,
});

// hash the password
userSchema.methods.generateHash = function (password: string) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

// checking if password is valid
userSchema.methods.validatePassword = function (
  password: string,
) {
  return bcrypt.compareSync(password, this.password);
};

export const User = mongoose.model('user', userSchema);

export const initiateMongoose = async () => {
  await mongoose.connect(MONGODB_URI, {dbName: 'local'});
  console.log('Mongoose initiated!');
};
