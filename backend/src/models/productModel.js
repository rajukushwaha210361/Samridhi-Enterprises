import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  partNumber: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  brand: { type: String },
  images: [String],
  isActive: { type: Boolean, default: true }
}, { timestamps: true })

export default mongoose.model('Product', productSchema)