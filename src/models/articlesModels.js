// Import moongoose and schemma
import mongoose, { Schema } from "mongoose";

// Define Model
const articleSchema = new Schema({
  category: { type: Schema.ObjectId, ref: "category" }, //Modelado por referencia
  code: { type: String, maxLength: 64 },
  name: { type: String, maxLength: 64, unique: true, required: true },
  description: { type: String, maxLength: 255 },
  sell_price: { type: Number, required: true },
  stock: { type: Number, required: true },
  status: { type: Boolean, default: true },
  created_at: { type: Date, default: Date.now },
});

const article = mongoose.model("article", articleSchema);

export default article;
