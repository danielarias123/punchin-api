import mongoose, { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const UserSchema = new Schema({
  name: {
    first_name: String,
    last_name: String,
  },
  email: {
    type: String,
    lowercase: true,
    index: true,
    unique: true,
    required: true,
  },
  password: { type: String, required: true },
  phone: String,
  avatar: String,
  created_date: { type: Date, default: Date.now },
});

UserSchema.plugin(uniqueValidator, { message: '{PATH} already exists' });

export default mongoose.model('User', UserSchema);
