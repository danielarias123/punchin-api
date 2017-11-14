import mongoose, { Schema } from 'mongoose';

const { ObjectId } = Schema.Types;

const AccountSchema = new Schema({
  user: { type: ObjectId, ref: 'User', required: true },
  active: { type: Boolean, default: true },
  private: { type: Boolean, default: false },
  pay: {
    rate: Number,
    period: Number,
    day: String,
    next_pay: Date,
    end_difference: Number,
  },
  role: { type: ObjectId, ref: 'Role' },
  position: { type: ObjectId, ref: 'Position' },
  company: { type: ObjectId, ref: 'Company' },
  created_date: { type: Date, default: Date.now },
});

export default mongoose.model('Account', AccountSchema);
