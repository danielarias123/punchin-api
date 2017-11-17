import mongoose, { Schema } from 'mongoose';

const { ObjectId, Mixed } = Schema.Types;

const ShiftSchema = new Schema({
  account: { type: ObjectId, ref: 'Account', required: true },
  company: { type: ObjectId, ref: 'Company' },
  location: { type: ObjectId, ref: 'Company' },
  position: { type: ObjectId, ref: 'Position' },
  active: { type: Boolean, default: true },
  require_location: { type: Boolean, default: false },
  notes: String,
  scheduled: {
    start: Date,
    end: Date,
    breaks: [Number],
  },
  actual: {
    start: {
      date: Date,
      location: Mixed,
    },
    end: {
      date: Date,
      location: Mixed,
    },
    breaks: [Mixed],
  },
  created_date: { type: Date, default: Date.now },
});

export default mongoose.model('Shift', ShiftSchema);
