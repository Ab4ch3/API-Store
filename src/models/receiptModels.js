// Import moongoose and schemma
import mongoose, { Schema } from 'mongoose';
// Define Model
const receiptSchema = new Schema({
  // Ref: se refiere al modelo usuario
  user: { type: Schema.ObjectId, ref: 'user', required: true },
  person: { type: Schema.ObjectId, ref: 'person', required: true },
  voucher_type: { type: String, maxLength: 20, required: true },
  voucher_series: { type: String, maxLength: 7 },
  voucher_num: { type: String, maxLength: 10, required: true },
  tax: { type: Number, required: true },
  total: { type: Number, required: true },
  details: [
    // el esquema de la propiedad detalles.
    // Puedo tener varios articulos
    {
      _id: {
        type: String,
        required: true
      },
      article: {
        type: String,
        required: true
      },
      total_article: {
        type: Number,
        required: true
      },
      price: {
        type: Number,
        required: true
      }
    }
  ],
  status: { type: Boolean, default: true },
  created_at: { type: Date, default: Date.now }
});
// Convertimos la variable en un modelo , basandose en el schema ya creado
const receipt = mongoose.model('receipt', receiptSchema);

// Exportamos el modelo
export default receipt;
