// Import monngoose and schema
import mongoose, { Schema } from 'mongoose';

// Define Model
const categorySchema = new Schema({
  name: { type: String, maxLength: 50, unique: true, required: true },
  description: { type: String, maxLength: 255, required: true },
  status: { type: Boolean, default: true },
  created_at: { type: Date, default: Date.now }
});

const category = mongoose.model('category', categorySchema);

export default category;
