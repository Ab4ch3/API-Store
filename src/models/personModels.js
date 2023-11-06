// Import moongoose and schemma
import mongoose, { Schema } from 'mongoose';

// Define Model
const personSchema = new Schema({
  type_person: { type: String, maxLength: 20, required: true },
  name: { type: String, maxLength: 50, unique: true, required: true },
  document_type: { type: String, maxLength: 20 },
  document_num: { type: String, maxLength: 20 },
  address: { type: String, maxLength: 70 },
  phone: { type: String, maxLength: 20 },
  email: { type: String, maxLength: 50, unique: true },
  status: { type: Boolean, default: true },
  created_at: { type: Date, default: Date.now }
});

const person = mongoose.model('person', personSchema);

export default person;
