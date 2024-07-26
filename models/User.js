import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  const hashedPassword = await bcrypt.hash(this.password, 12);
  this.password = hashedPassword;
  next();
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;
