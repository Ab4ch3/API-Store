// Import moongoose and schemma
import mongoose, { Schema } from 'mongoose';

// Define Model
const userSchema = new Schema({
  role: { type: String, maxLength: 30, required: true },
  name: { type: String, maxLength: 50, unique: true, required: true },
  document_type: { type: String, maxLength: 20 },
  document_num: { type: String, maxLength: 20 },
  address: { type: String, maxLength: 70 },
  phone: { type: String, maxLength: 20 },
  email: { type: String, maxLength: 50, unique: true, required: true },
  password: { type: String, maxLength: 64, required: true },
  status: { type: Boolean, default: true },
  created_at: { type: Date, default: Date.now }
});

const user = mongoose.model('user', userSchema);

export default user;
